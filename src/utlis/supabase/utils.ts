//Converts an object to URL query string
export function toQueryString(params: Record<string, any>): string {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        // Handle array values: key=value1&key=value2
        return value
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");

  return query;
}

/**
 * Helper to build a full URL with query params.
 *
 * Example:
 *   buildApiUrl("/api/jobs", { title: "Registrar", state: "WA" })
 *   → "/api/jobs?title=Registrar&state=WA"
 */
export function buildApiUrl(baseUrl: string, params: Record<string, any>): string {
  const query = toQueryString(params);
  return query ? `${baseUrl}?${query}` : baseUrl;
}
