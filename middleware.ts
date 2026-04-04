import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRateLimit, getClientIpFromHeaders } from "./lib/security/rateLimit";

const API_RATE_LIMIT = Number(process.env.API_RATE_LIMIT_MAX ?? 120);
const API_RATE_WINDOW_MS = Number(process.env.API_RATE_LIMIT_WINDOW_MS ?? 60_000);

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const ip = getClientIpFromHeaders(request.headers);
  const result = checkRateLimit({
    key: `api:${ip}`,
    limit: API_RATE_LIMIT,
    windowMs: API_RATE_WINDOW_MS,
  });

  if (!result.allowed) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intenta de nuevo en unos segundos." },
      {
        status: 429,
        headers: {
          "Retry-After": String(result.retryAfterSec),
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
