import type { StoragePort } from "../../../../ports/driving/storage/storage-port";

export class InMemoryStore implements StoragePort {
  private store: Map<string, string>;

  constructor() {
    this.store = new Map();
  }

  get(key: string): string | undefined {
    return this.store.get(key);
  }

  set(key: string, value: string): void {
    this.store.set(key, value);
  }
}
