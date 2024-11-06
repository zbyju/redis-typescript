import type { StorageValue } from "../../../../ports/driving/storage/item-port";
import type Item from "../../../../ports/driving/storage/item-port";
import type { StoragePort } from "../../../../ports/driving/storage/storage-port";

export class InMemoryStore implements StoragePort {
  private store: Map<string, Item>;

  constructor() {
    this.store = new Map();
  }

  get(key: StorageValue): StorageValue | undefined {
    const item = this.store.get(key);

    if (item === undefined) return undefined;
    if (item.isExpired()) {
      this.store.delete(key);
      return undefined;
    }

    return item.value;
  }

  set(key: string, value: Item): void {
    this.store.set(key, value);
  }

  reset(key: string): void {
    this.store.delete(key);
  }
}
