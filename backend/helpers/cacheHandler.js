// helpers/CacheHandler.js
import Redis from "ioredis";
import { errorHandler, eventHandler } from "./eventHandler.js"; // Ensure correct path

const redisClient = new Redis(process.env.REDIS_URL);

const CacheHandler = (expiration = 60) => {
  return async (req, res, next) => {
    try {
      const cacheKey = req.originalUrl;
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        // Log cache hit
        eventHandler("info", "Cache hit", req, { cacheKey });

        res.send(JSON.parse(cachedData));
      } else {
        res.originalSend = res.send;
        res.send = (data) => {
          // Log cache miss
          eventHandler("info", "Cache miss", req, { cacheKey });

          redisClient.set(cacheKey, data, "EX", expiration);
          res.originalSend(data);
        };
        next();
      }
    } catch (error) {
      errorHandler("error", "Cache error", req, { error });
      next(error);
    }
  };
};

export default CacheHandler;
