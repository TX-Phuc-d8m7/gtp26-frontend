import type {
  BackendFoodResult,
  BackendPlaceSearchResponse,
  FoodLocation,
} from "../_interface";

const FOOD_AI_API_URL =
  process.env.NEXT_PUBLIC_FOOD_AI_API_URL ?? "http://localhost:8000";

const DEFAULT_LOCATION_TEXT = "Đà Nẵng";
const DEFAULT_RADIUS_M = 3000;
const DEFAULT_LIMIT = 5;

export interface UserCoordinates {
  latitude: number;
  longitude: number;
}

export interface PlaceLookupResult {
  locations: FoodLocation[];
  usedGps: boolean;
  userCoordinates?: UserCoordinates;
  cacheHit: boolean;
  query: string;
}

function getCurrentPosition(): Promise<UserCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Trình duyệt không hỗ trợ định vị."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 5 * 60 * 1000,
      },
    );
  });
}

function toFoodLocations(
  food: BackendFoodResult,
  response: BackendPlaceSearchResponse,
): FoodLocation[] {
  return response.results
    .filter((place) => place.location)
    .map((place) => ({
      id: place.place_id,
      foodId: food.id,
      name: place.name,
      address: place.formatted_address ?? "Chưa có địa chỉ",
      lat: place.location!.latitude,
      lng: place.location!.longitude,
      distanceMeters: place.distance_meters ?? undefined,
      rating: place.rating ?? undefined,
      userRatingCount: place.user_rating_count ?? undefined,
      mapUrl:
        place.google_maps_uri ??
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          place.name,
        )}`,
      phoneNumber: place.phone_number ?? undefined,
      businessStatus: place.business_status ?? undefined,
    }));
}

async function fetchPlaces(params: URLSearchParams) {
  const response = await fetch(`${FOOD_AI_API_URL}/places/search?${params}`);
  if (!response.ok) {
    let detail = "";
    try {
      const payload = (await response.json()) as { detail?: unknown };
      detail =
        typeof payload.detail === "string"
          ? payload.detail
          : JSON.stringify(payload.detail);
    } catch {
      detail = await response.text();
    }
    throw new Error(
      detail
        ? `API địa điểm lỗi ${response.status}: ${detail}`
        : `API địa điểm trả về mã lỗi ${response.status}`,
    );
  }
  return (await response.json()) as BackendPlaceSearchResponse;
}

export async function lookupNearbyFoodPlaces(
  food: BackendFoodResult,
): Promise<PlaceLookupResult> {
  const params = new URLSearchParams({
    dish: food.name,
    location: DEFAULT_LOCATION_TEXT,
    radius_m: String(DEFAULT_RADIUS_M),
    limit: String(DEFAULT_LIMIT),
  });

  let usedGps = false;
  let userCoordinates: UserCoordinates | undefined;
  try {
    const coordinates = await getCurrentPosition();
    params.set("lat", String(coordinates.latitude));
    params.set("lng", String(coordinates.longitude));
    usedGps = true;
    userCoordinates = coordinates;
  } catch {
    usedGps = false;
  }

  const response = await fetchPlaces(params);
  return {
    locations: toFoodLocations(food, response),
    usedGps,
    userCoordinates,
    cacheHit: response.cache_hit,
    query: response.query,
  };
}
