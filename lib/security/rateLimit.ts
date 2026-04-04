type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type RateLimitState = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
};

const STORE_KEY = "__portfolio_rate_limit_store__";

const getStore = () => {
  const globalRef = globalThis as typeof globalThis & {
    [STORE_KEY]?: Map<string, RateLimitState>;
  };

  if (!globalRef[STORE_KEY]) {
    globalRef[STORE_KEY] = new Map<string, RateLimitState>();
  }

  return globalRef[STORE_KEY]!;
};

const cleanupExpiredEntries = (store: Map<string, RateLimitState>, now: number) => {
  if (store.size < 5000) return;

  for (const [key, state] of store.entries()) {
    if (state.resetAt <= now) {
      store.delete(key);
    }
  }
};

export const checkRateLimit = ({ key, limit, windowMs }: RateLimitOptions): RateLimitResult => {
  const now = Date.now();
  const store = getStore();

  cleanupExpiredEntries(store, now);

  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      remaining: Math.max(limit - 1, 0),
      retryAfterSec: Math.ceil(windowMs / 1000),
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  store.set(key, current);

  return {
    allowed: true,
    remaining: Math.max(limit - current.count, 0),
    retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
};

export const getClientIpFromHeaders = (headers: Headers): string => {
  const forwardedFor = headers.get("x-forwarded-for");

  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  return "unknown";
};
