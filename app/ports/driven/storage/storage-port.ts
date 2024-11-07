import type { StorageValue } from "./item-port";
import type Item from "./item-port";

export interface StoragePort {
  get(key: StorageValue): StorageValue | undefined;
  set(key: string, value: Item): void;
}
