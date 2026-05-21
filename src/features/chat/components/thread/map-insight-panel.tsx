/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Clock3,
  ExternalLink,
  MapPin,
  Navigation,
  Star,
  X,
} from "lucide-react";

import type {
  BackendFoodResult,
  FoodLocation,
} from "@/features/chat/_interface";
import { lookupNearbyFoodPlaces } from "@/features/chat/lib/places-api";
import { styles } from "@/features/chat/_styles";
import { Button } from "@/shared/components/ui/button/index";
import { Typography } from "@/shared/components/ui/typography/index";
import { useMediaQuery } from "@/shared/hooks/use-media-query";

const DEFAULT_USER_LOCATION = {
  lat: 16.0609,
  lng: 108.221,
  label: "Vị trí ước lượng",
};

function formatDistance(distanceMeters?: number) {
  if (!distanceMeters) return "Chưa rõ";
  if (distanceMeters < 1000) return `${distanceMeters} m`;
  return `${(distanceMeters / 1000).toFixed(1)} km`;
}

function getMapPoint(
  location: Pick<FoodLocation, "lat" | "lng">,
  bounds: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  },
) {
  const lngSpan = Math.max(bounds.maxLng - bounds.minLng, 0.001);
  const latSpan = Math.max(bounds.maxLat - bounds.minLat, 0.001);
  const left = 12 + ((location.lng - bounds.minLng) / lngSpan) * 76;
  const top = 12 + (1 - (location.lat - bounds.minLat) / latSpan) * 76;

  return {
    left: `${Math.min(88, Math.max(12, left))}%`,
    top: `${Math.min(88, Math.max(12, top))}%`,
  };
}

function LocationRow({
  location,
  isActive,
  onSelect,
}: {
  location: FoodLocation;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <Box
      role="button"
      tabIndex={0}
      sx={styles.mapLocationRowStyles(isActive)}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        onSelect();
      }}
    >
      <Box sx={styles.mapLocationPinStyles}>
        <MapPin className="size-4" />
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography as="span" sx={styles.mapLocationNameStyles}>
          {location.name}
        </Typography>
        <Typography as="span" sx={styles.mapLocationAddressStyles}>
          {location.address}
        </Typography>
        <Box sx={styles.mapLocationMetaStyles}>
          <Typography as="span">
            <Navigation className="size-3.5" />
            {formatDistance(location.distanceMeters)}
          </Typography>
          {location.rating && (
            <Typography as="span">
              <Star className="size-3.5" />
              {location.rating.toFixed(1)}
            </Typography>
          )}
          {location.openingHours && (
            <Typography as="span">
              <Clock3 className="size-3.5" />
              {location.openingHours}
            </Typography>
          )}
        </Box>
      </Box>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        sx={styles.mapExternalButtonStyles}
        onClick={(event) => {
          event.stopPropagation();
          window.open(
            location.mapUrl ??
              `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`,
            "_blank",
            "noopener,noreferrer",
          );
        }}
        aria-label={`Mở ${location.name} trên Google Maps`}
      >
        <ExternalLink className="size-4" />
      </Button>
    </Box>
  );
}

export function MapInsightPanel({
  food,
  onClose,
}: {
  food: BackendFoodResult | null;
  onClose: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [locations, setLocations] = useState<FoodLocation[]>([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [placesError, setPlacesError] = useState<string | null>(null);
  const [usedGps, setUsedGps] = useState(false);
  const [userLocation, setUserLocation] = useState(DEFAULT_USER_LOCATION);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let isMounted = true;
    setLocations(food?.locations ?? []);
    setSelectedLocationId(food?.locations?.[0]?.id ?? null);
    setPlacesError(null);
    setUsedGps(false);
    setUserLocation(DEFAULT_USER_LOCATION);

    if (!food) return;

    setIsLoadingPlaces(true);
    lookupNearbyFoodPlaces(food)
      .then((result) => {
        if (!isMounted) return;
        setLocations(result.locations);
        setSelectedLocationId(result.locations[0]?.id ?? null);
        setUsedGps(result.usedGps);
        if (result.userCoordinates) {
          setUserLocation({
            lat: result.userCoordinates.latitude,
            lng: result.userCoordinates.longitude,
            label: "Vị trí của bạn",
          });
        }
        setPlacesError(null);
      })
      .catch((error) => {
        if (!isMounted) return;
        setPlacesError(
          error instanceof Error
            ? error.message
            : "Không tải được danh sách quán gần bạn.",
        );
      })
      .finally(() => {
        if (isMounted) setIsLoadingPlaces(false);
      });

    return () => {
      isMounted = false;
    };
  }, [food]);

  const selectedLocation =
    locations.find((location) => location.id === selectedLocationId) ??
    locations[0];

  const bounds = useMemo(() => {
    const points = [...locations, userLocation];
    const lats = points.map((point) => point.lat);
    const lngs = points.map((point) => point.lng);

    return {
      minLat: Math.min(...lats) - 0.004,
      maxLat: Math.max(...lats) + 0.004,
      minLng: Math.min(...lngs) - 0.004,
      maxLng: Math.max(...lngs) + 0.004,
    };
  }, [locations, userLocation]);

  return (
    <AnimatePresence>
      {food && (
        <Box
          component={motion.div}
          sx={styles.mapPanelBackdropStyles}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
          onClick={onClose}
        >
          <Box
            component={motion.aside}
            role="dialog"
            aria-modal="true"
            aria-label={`Địa điểm bán ${food.name}`}
            sx={styles.mapPanelStyles}
            initial={isDesktop ? { x: 48, opacity: 0 } : { y: 48, opacity: 0 }}
            animate={isDesktop ? { x: 0, opacity: 1 } : { y: 0, opacity: 1 }}
            exit={isDesktop ? { x: 48, opacity: 0 } : { y: 48, opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.22,
              ease: "easeOut",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <Box sx={styles.mapPanelHeaderStyles}>
              <Box sx={{ minWidth: 0 }}>
                <Typography as="span" sx={styles.mapPanelEyebrowStyles}>
                  Quán gần bạn
                </Typography>
                <Typography as="h2" sx={styles.mapPanelTitleStyles}>
                  {food.name}
                </Typography>
                <Typography as="p" sx={styles.mapPanelSubtitleStyles}>
                  {isLoadingPlaces
                    ? "Đang tìm quán gần bạn..."
                    : usedGps
                      ? `${locations.length} địa điểm gần vị trí hiện tại.`
                      : `${locations.length} địa điểm theo khu vực Đà Nẵng.`}
                </Typography>
              </Box>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                sx={styles.headerIconButtonStyles}
                onClick={onClose}
                aria-label="Đóng bản đồ địa điểm"
              >
                <X className="size-5" />
              </Button>
            </Box>

            <Box sx={styles.mockMapCanvasStyles}>
              <Box sx={styles.mockMapGridStyles} />
              <Box
                sx={styles.userMapMarkerStyles}
                style={getMapPoint(userLocation, bounds)}
                aria-label={userLocation.label}
              >
                <Navigation className="size-3.5" />
              </Box>
              {locations.map((location, index) => {
                const isActive = location.id === selectedLocation?.id;

                return (
                  <Box
                    key={location.id}
                    component="button"
                    type="button"
                    sx={styles.foodMapMarkerStyles(isActive)}
                    style={getMapPoint(location, bounds)}
                    onClick={() => setSelectedLocationId(location.id)}
                    aria-label={`Chọn ${location.name}`}
                  >
                    <span>{index + 1}</span>
                  </Box>
                );
              })}
              {selectedLocation && (
                <Box sx={styles.mapSelectedPlaceStyles}>
                  <Typography as="span" sx={{ fontWeight: 800 }}>
                    {selectedLocation.name}
                  </Typography>
                  <Typography as="span">
                    {formatDistance(selectedLocation.distanceMeters)} từ vị trí
                    {usedGps ? " của bạn" : " ước lượng"}
                  </Typography>
                </Box>
              )}
            </Box>

            <Box sx={styles.mapLocationListStyles}>
              {isLoadingPlaces && locations.length === 0 && (
                <Typography as="p" sx={styles.mapLocationAddressStyles}>
                  Đang tải danh sách quán gần bạn...
                </Typography>
              )}
              {placesError && (
                <Typography as="p" sx={styles.mapLocationAddressStyles}>
                  {placesError}
                </Typography>
              )}
              {!placesError && !isLoadingPlaces && locations.length === 0 && (
                <Typography as="p" sx={styles.mapLocationAddressStyles}>
                  Chưa tìm thấy quán phù hợp cho món này.
                </Typography>
              )}
              {locations.map((location) => (
                <LocationRow
                  key={location.id}
                  location={location}
                  isActive={location.id === selectedLocation?.id}
                  onSelect={() => setSelectedLocationId(location.id)}
                />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}
