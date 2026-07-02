import { createClient } from 'redis';
import { REDIS_URL } from '../config/utils.js';

let redis = null;

export async function connectToRedis() {
  try {
    if (!REDIS_URL) {
      console.log('Redis not configured, cache disabled.');
      return;
    }

    redis = createClient({
      url: REDIS_URL,
      disableOfflineQueue: true,
    });

    redis.on('error', (err) => {
      console.error('Redis Error:', err.message);
    });

    redis.on('end', () => {
      console.warn('Redis connection closed.');
    });

    redis.on('reconnecting', () => {
      console.log('Reconnecting to Redis...');
    });

    await redis.connect();

    console.log('Redis Connected:', REDIS_URL);
  } catch (error) {
    console.error('Error connecting to Redis:', error.message);
    redis = null;
  }
}

export function getRedisClient() {
  return redis;
}
