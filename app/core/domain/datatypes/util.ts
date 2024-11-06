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
  logStartDecoding("DECODE", value, index);

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

export function logStartDecoding(
  name: string,
  value: string,
  index: number,
): void {
  console.log(
    `Decoding ${name}, at ${index} (first char: ${value.at(index)}), got:
-----------------------
|${value}|
-----------------------\n`,
  );
}

export function logEndDecoding(
  name: string,
  value: string,
  index: number,
  result: RedisType,
): void {
  console.log(
    `Decoded ${name}, result:
-----------------------
|${result}|
-----------------------
Continue at ${index} (first continue char: ${value.at(index)})`,
  );
}
