import ICacheProvider from '../models/ICacheProvider';

export default class FakeCacheProvider implements ICacheProvider {
  public async save(key: string, value: string): Promise<void> {}

  public async recover(key: string): Promise<string> {}

  public async invalidate(key: string): Promise<void> {}

  public async invalidatePrefix(key: string): Promise<void> {}
}
