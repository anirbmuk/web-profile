import {
  createClient,
  type RedisClientType,
} from 'redis';
import type { RedisConfig } from '../types';
import {
  compress,
  decompress,
} from '../helpers/storage.helper';

export class RedisController {
  private static instance: RedisController | undefined;
  private _client: RedisClientType | undefined;
  private _prefix = '';

  private async _createRedisClient(cfg: RedisConfig) {
    const {
      host,
      port, 
    } = cfg;
    const url = `redis://${host}:${port}`;
    this._client = createClient({
      url,
      database: 0,
    });
    await this._client.connect();
  }

  private constructor(cfg: RedisConfig) {
    if (!cfg.host || !cfg?.port) {
      return;
    }
    this._prefix = cfg?.prefix || '';
    this._createRedisClient(cfg);
  }

  private getKey(key: string) {
    return [this._prefix, key].filter(Boolean).join(':');
  }

  static getInstance(cfg: RedisConfig) {
    if (!RedisController.instance) {
      RedisController.instance = new RedisController(cfg);
    }
    return RedisController.instance;
  }

  async getCache(key: string) {
    if (!key || !this._client) {
      return;
    }
    const fromCache = await this._client.get(this.getKey(key)) as
    | string
    | undefined;
    if (!fromCache) {
      return;
    }
    return await decompress(fromCache);
  }

  async setCache<T>(key: string, data: T) {
    if (key && this._client) {
      const value = await compress(JSON.stringify(data));
      await this._client.set(this.getKey(key), value, {
        EX: 24 * 60 * 60, // 1 day (seconds)
      });
    }
  }
}
