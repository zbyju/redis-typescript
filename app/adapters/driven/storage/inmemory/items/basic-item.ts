import type { StorageValue } from "../../../../../ports/driven/storage/item-port";
import type Item from "../../../../../ports/driven/storage/item-port";

export default class BasicItem implements Item {
  private val: StorageValue;
  constructor(value: StorageValue) {
    this.val = value;
  }

  get value(): StorageValue {
    return this.val;
  }

  isExpired(): boolean {
    return false;
  }
}
