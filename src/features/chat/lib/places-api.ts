import type {
  BackendFoodResult,
  BackendPlaceSearchResult,
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
  /** "google_places_text_search" | "serpapi_google_search" */
  provider: string;
  /** "Khớp đúng món" or "Quán gần liên quan nhất". Always present from backend. */
  resultLabel: string;
  usedFallbackResults: boolean;
}

async function getPositionFromIp(): Promise<UserCoordinates> {
  const response = await fetch("https://ipinfo.io/json");
  if (!response.ok) throw new Error("IP geolocation failed");
  const data = (await response.json()) as { loc?: string };
  if (!data.loc) throw new Error("Không có tọa độ trong IP response");
  const [latStr, lngStr] = data.loc.split(",");
  const latitude = parseFloat(latStr);
  const longitude = parseFloat(lngStr);
  if (!isFinite(latitude) || !isFinite(longitude)) throw new Error("Tọa độ IP không hợp lệ");
  return { latitude, longitude };
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

function isGoogleMapsUrl(value?: string | null) {
  if (!value) return false;

  try {
    const url = new URL(value);
    return (
      url.hostname.includes("google.") ||
      url.hostname === "maps.app.goo.gl" ||
      url.hostname === "goo.gl"
    );
  } catch {
    return false;
  }
}

function buildGoogleMapsUrl(place: BackendPlaceSearchResult) {
  if (place.location) {
    return `https://www.google.com/maps/dir/?api=1&destination=${place.location.latitude},${place.location.longitude}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    [place.name, place.formatted_address].filter(Boolean).join(" "),
  )}`;
}

function toFoodLocations(
  food: BackendFoodResult,
  response: BackendPlaceSearchResponse,
  places: BackendPlaceSearchResult[] = response.results,
): FoodLocation[] {
  return places.map((place) => ({
    id: place.place_id,
    foodId: food.id,
    name: place.name,
    address: place.formatted_address ?? "Chưa có địa chỉ",
    lat: place.location?.latitude ?? Number.NaN,
    lng: place.location?.longitude ?? Number.NaN,
    distanceMeters: place.distance_meters ?? undefined,
    rating: place.rating ?? undefined,
    userRatingCount: place.user_rating_count ?? undefined,
    mapUrl: isGoogleMapsUrl(place.google_maps_uri)
      ? place.google_maps_uri!
      : buildGoogleMapsUrl(place),
    websiteUrl: place.website_uri ?? undefined,
    phoneNumber: place.phone_number ?? undefined,
    businessStatus: place.business_status ?? undefined,
    priceLevel: place.price_level ?? undefined,
    provider: response.provider,
  }));
}

/**
 * The backend pre-selects `results` (strict if available, fallback otherwise).
 * We use it directly instead of re-implementing the selection logic.
 */
function getDisplayPlaces(response: BackendPlaceSearchResponse) {
  return response.results;
}

async function fetchPlaces(params: URLSearchParams) {
  const response = await fetch(`${FOOD_AI_API_URL}/places/search?${params}`, {
    headers: { "ngrok-skip-browser-warning": "true" },
  });
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
  } catch (geoError) {
    console.warn("[Geolocation] GPS thất bại, thử IP geolocation:", geoError);
    try {
      const ipCoords = await getPositionFromIp();
      params.set("lat", String(ipCoords.latitude));
      params.set("lng", String(ipCoords.longitude));
      userCoordinates = ipCoords;
      console.info("[Geolocation] Dùng vị trí từ IP:", ipCoords);
    } catch (ipError) {
      console.warn("[Geolocation] IP geolocation cũng thất bại:", ipError);
    }
    usedGps = false;
  }

  const response = await fetchPlaces(params);
  return {
    locations: toFoodLocations(food, response, getDisplayPlaces(response)),
    usedGps,
    userCoordinates,
    cacheHit: response.cache_hit,
    query: response.query,
    provider: response.provider,
    resultLabel: response.result_label,
    usedFallbackResults: response.used_fallback_results,
  };
}
