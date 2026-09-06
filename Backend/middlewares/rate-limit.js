const rateLimitStore = new Map();

const rateLimit = ({ windowMs = 15 * 60 * 1000, max = 100 } = {}) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") return next();

    const key = req.ip;
    const now = Date.now();

    if (!rateLimitStore.has(key)) {
      rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    const record = rateLimitStore.get(key);

    if (now > record.resetAt) {
      record.count = 1;
      record.resetAt = now + windowMs;
      return next();
    }

    if (record.count >= max) {
      const retryAfter = Math.ceil((record.resetAt - now) / 1000);
      res.set("Retry-After", String(retryAfter));
      return res.status(429).json({
        message: "Too many requests, please try again later",
        retryAfter,
      });
    }

    res.set("RateLimit-Remaining", String(max - record.count));
    res.set("RateLimit-Reset", String(Math.ceil(record.resetAt / 1000)));

    record.count++;
    next();
  };
};

// Cleanup stale entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

export default rateLimit;
