/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { Typography } from "@/shared/components/ui/typography";
import type { FoodLocation } from "@/features/chat/_interface";
import {
  LeafletPlaceMapProps,
  MapViewportControllerProps,
  styles,
} from ".";

const DA_NANG_CENTER = {
  lat: 16.0609,
  lng: 108.221,
};

function hasValidCoordinates(location: Pick<FoodLocation, "lat" | "lng">) {
  return Number.isFinite(location.lat) && Number.isFinite(location.lng);
}

function createUserIcon() {
  return L.divIcon({
    className: "foodie-user-marker-root",
    html: '<span class="foodie-user-marker">•</span>',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  });
}

function createPlaceIcon(index: number, isActive: boolean) {
  const size = isActive ? 42 : 34;

  return L.divIcon({
    className: "foodie-place-marker-root",
    html: `<span class="foodie-place-marker ${isActive ? "foodie-place-marker--active" : ""}"><span>${index + 1}</span></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

function MapViewportController({
  locations,
  selectedLocationId,
  userLocation,
}: MapViewportControllerProps) {
  const map = useMap();
  const mapPoints = useMemo(
    () => [
      ...(hasValidCoordinates(userLocation)
        ? [L.latLng(userLocation.lat, userLocation.lng)]
        : []),
      ...locations
        .filter(hasValidCoordinates)
        .map((location) => L.latLng(location.lat, location.lng)),
    ],
    [locations, userLocation],
  );

  useEffect(() => {
    if (mapPoints.length > 1) {
      map.fitBounds(L.latLngBounds(mapPoints), {
        animate: true,
        maxZoom: 15,
        padding: [34, 34],
      });
      return;
    }

    const fallbackPoint =
      mapPoints[0] ?? L.latLng(DA_NANG_CENTER.lat, DA_NANG_CENTER.lng);
    map.setView(fallbackPoint, mapPoints.length ? 14 : 12, { animate: true });
  }, [map, mapPoints]);

  useEffect(() => {
    if (!selectedLocationId) return;
    const selectedLocation = locations.find(
      (location) => location.id === selectedLocationId,
    );
    if (!selectedLocation || !hasValidCoordinates(selectedLocation)) return;

    map.flyTo([selectedLocation.lat, selectedLocation.lng], Math.max(map.getZoom(), 15), {
      duration: 0.55,
    });
  }, [locations, map, selectedLocationId]);

  return null;
}

export default function LeafletPlaceMap({
  locations,
  selectedLocationId,
  userLocation,
  onSelectLocation,
}: LeafletPlaceMapProps) {
  const markerLocations = useMemo(
    () => locations.filter(hasValidCoordinates),
    [locations],
  );
  const userIcon = useMemo(() => createUserIcon(), []);
  const center = hasValidCoordinates(userLocation)
    ? [userLocation.lat, userLocation.lng]
    : [DA_NANG_CENTER.lat, DA_NANG_CENTER.lng];

  if (markerLocations.length === 0) {
    return (
      <Box sx={styles.emptyMapStateStyles}>
        <Typography as="p">
          Chưa có tọa độ để hiển thị bản đồ. Bạn vẫn có thể xem danh sách quán
          và mở chỉ đường bên ngoài.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.leafletMapShellStyles}>
      <MapContainer
        center={center as [number, number]}
        zoom={14}
        scrollWheelZoom
        zoomControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapViewportController
          locations={markerLocations}
          selectedLocationId={selectedLocationId}
          userLocation={userLocation}
        />
        {hasValidCoordinates(userLocation) && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userIcon}
          >
            <Popup>{userLocation.label}</Popup>
          </Marker>
        )}
        {markerLocations.map((location, index) => {
          const isActive = location.id === selectedLocationId;

          return (
            <Marker
              key={`${location.id}-${isActive ? "active" : "idle"}`}
              position={[location.lat, location.lng]}
              icon={createPlaceIcon(index, isActive)}
              eventHandlers={{
                click: (event) => {
                  event.originalEvent.stopPropagation();
                  onSelectLocation(location.id);
                },
              }}
            >
              <Popup>
                <Typography
                  as="span"
                  sx={{ display: "block", fontWeight: 800, mb: 0.4 }}
                >
                  {location.name}
                </Typography>
                <Typography as="span" sx={{ display: "block", fontSize: 12 }}>
                  {location.address}
                </Typography>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Box>
  );
}
