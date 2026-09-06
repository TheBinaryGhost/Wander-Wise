const rateLimit = ({ windowMs = 15 * 60 * 1000, max = 100 } = {}) => {
  const store = new Map();

  const cleanup = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      if (now > record.resetAt) {
        store.delete(key);
      }
    }
  }, windowMs);

  // Allow the timer to not keep the process alive
  if (cleanup.unref) cleanup.unref();

  return (req, res, next) => {
    if (req.method === "OPTIONS") return next();

    const key = req.ip;
    const now = Date.now();

    if (!store.has(key)) {
      store.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    const record = store.get(key);

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

export default rateLimit;
