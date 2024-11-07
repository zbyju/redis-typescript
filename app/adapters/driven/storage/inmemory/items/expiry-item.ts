import type { StorageValue } from "../../../../../ports/driven/storage/item-port";
import BasicItem from "./basic-item";

export default class ExpiryItem extends BasicItem {
  expiresAt: Date;

  constructor(value: StorageValue, expiresInMs: number) {
    super(value);
    this.expiresAt = new Date(Date.now() + expiresInMs);
  }

  isExpired(): boolean {
    return this.expiresAt < new Date();
  }
}
