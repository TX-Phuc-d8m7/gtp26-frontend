/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Clock3,
  ExternalLink,
  Globe,
  MapPin,
  Navigation,
  Phone,
  Star,
  X,
} from "lucide-react";

import type {
  FoodLocation,
} from "@/features/chat/_interface";
import { lookupNearbyFoodPlaces } from "@/features/chat/lib/places-api";
import { Button } from "@/shared/components/ui/button/index";
import { Typography } from "@/shared/components/ui/typography/index";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { LocationRowProps, MapInsightPanelProps, styles } from ".";

const LeafletPlaceMap = dynamic(
  () =>
    import("../leaflet-place-map/page").then((module) => module.default),
  {
    ssr: false,
    loading: () => (
      <Box sx={styles.mapLoadingStateStyles}>
        <Typography as="p">Đang mở bản đồ quán gần bạn...</Typography>
      </Box>
    ),
  },
);

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

function LocationRow({
  location,
  isActive,
  onSelect,
}: LocationRowProps) {
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
        <MapPin size={16} />
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
            <Navigation size={14} />
            {formatDistance(location.distanceMeters)}
          </Typography>
          {location.rating && (
            <Typography as="span">
              <Star size={14} />
              {location.rating.toFixed(1)}
              {location.userRatingCount
                ? ` (${location.userRatingCount})`
                : ""}
            </Typography>
          )}
          {location.priceLevel && (
            <Typography as="span">{location.priceLevel}</Typography>
          )}
          {location.businessStatus && (
            <Typography as="span">
              <Clock3 size={14} />
              {location.businessStatus}
            </Typography>
          )}
          {location.phoneNumber && (
            <Typography as="span">
              <Phone size={14} />
              {location.phoneNumber}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, flexShrink: 0 }}>
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
          <ExternalLink size={16} />
        </Button>
        {location.websiteUrl && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            sx={styles.mapExternalButtonStyles}
            onClick={(event) => {
              event.stopPropagation();
              window.open(location.websiteUrl, "_blank", "noopener,noreferrer");
            }}
            aria-label={`Mở website ${location.name}`}
          >
            <Globe size={16} />
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default function MapInsightPanel({
  food,
  onClose,
}: MapInsightPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [locations, setLocations] = useState<FoodLocation[]>([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [placesError, setPlacesError] = useState<string | null>(null);
  const [usedGps, setUsedGps] = useState(false);
  const [placesProvider, setPlacesProvider] = useState<string | null>(null);
  const [placeResultLabel, setPlaceResultLabel] = useState<string | null>(null);
  const [usedFallbackResults, setUsedFallbackResults] = useState(false);
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
    setPlacesProvider(null);
    setPlaceResultLabel(null);
    setUsedFallbackResults(false);
    setUserLocation(DEFAULT_USER_LOCATION);

    if (!food) return;

    setIsLoadingPlaces(true);
    lookupNearbyFoodPlaces(food)
      .then((result) => {
        if (!isMounted) return;
        setLocations(result.locations);
        setSelectedLocationId(result.locations[0]?.id ?? null);
        setUsedGps(result.usedGps);
        setPlacesProvider(result.provider);
        setPlaceResultLabel(result.resultLabel);
        setUsedFallbackResults(result.usedFallbackResults);
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
  const providerLabel =
    placesProvider === "serpapi_google_search"
      ? "SerpAPI"
      : placesProvider === "google_places_text_search"
        ? "Google Places"
        : null;

  return (
    <Drawer
      anchor={isDesktop ? "right" : "bottom"}
      open={Boolean(food)}
      onClose={onClose}
      sx={styles.mapPanelDrawerRootStyles}
      transitionDuration={shouldReduceMotion ? 0 : undefined}
      ModalProps={{
        keepMounted: true,
      }}
      slotProps={{
        backdrop: {
          sx: styles.mapPanelBackdropStyles,
        },
        paper: {
          role: "dialog",
          "aria-modal": true,
          "aria-label": food
            ? `Địa điểm bán ${food.name}`
            : "Địa điểm bán món ăn",
          sx: styles.mapPanelStyles(!isDesktop),
        },
      }}
    >
      {food ? (
        <Box
          data-food-map-drawer="open"
          sx={{
            display: "flex",
            minHeight: 0,
            flex: 1,
            flexDirection: "column",
            gap: 1.5,
          }}
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
                    ? `${locations.length} địa điểm gần vị trí hiện tại${providerLabel ? ` • ${providerLabel}` : ""}.`
                    : `${locations.length} địa điểm theo khu vực Đà Nẵng${providerLabel ? ` • ${providerLabel}` : ""}.`}
              </Typography>
              {placeResultLabel && !isLoadingPlaces && (
                <Typography
                  as="span"
                  sx={styles.mapResultLabelBadgeStyles(usedFallbackResults)}
                >
                  {placeResultLabel}
                </Typography>
              )}
            </Box>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              sx={styles.headerIconButtonStyles}
              onClick={onClose}
              aria-label="Đóng bản đồ địa điểm"
            >
              <X size={20} />
            </Button>
          </Box>

          <LeafletPlaceMap
            locations={locations}
            selectedLocationId={selectedLocation?.id ?? null}
            userLocation={userLocation}
            onSelectLocation={setSelectedLocationId}
          />

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
      ) : null}
    </Drawer>
  );
}
