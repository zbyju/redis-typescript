import BulkString from "./bulk-string";
import RedisArray from "./redis-array";
import type RedisType from "./redis-type";
import SimpleString from "./simple-string";

export function decodeString(
  value: string,
  index: number = 0,
): [RedisType, number] | undefined {
  value = value.toString();
  const prefix = value[index];
  console.log(`Decoding: ${value} with prefix: ${prefix}`);

  switch (prefix) {
    case "*":
      return RedisArray.fromString(value, index);
    case "$":
      return BulkString.fromString(value, index);
    case "+":
      return SimpleString.fromString(value, index);
    default:
      return [new SimpleString(value.toString()), value.length];
  }
}
