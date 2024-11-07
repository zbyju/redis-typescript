export type StorageValue = string;

export default interface Item {
  value: StorageValue;

  expiresAt?: number;
  isExpired(): boolean;
}
