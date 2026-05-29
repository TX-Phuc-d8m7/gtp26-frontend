/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { FoodLocation } from "@/features/chat/_interface";

export interface LeafletUserLocation {
  lat: number;
  lng: number;
  label: string;
}

export interface LeafletPlaceMapProps {
  locations: FoodLocation[];
  selectedLocationId: string | null;
  userLocation: LeafletUserLocation;
  onSelectLocation: (locationId: string) => void;
}

export interface MapViewportControllerProps {
  locations: FoodLocation[];
  selectedLocationId: string | null;
  userLocation: LeafletUserLocation;
}
