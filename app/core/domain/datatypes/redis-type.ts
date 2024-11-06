export type RedisValue = string | null | number | boolean | RedisValue[];

export default abstract class RedisType {
  abstract rawValue(): RedisValue;

  /**
   * Convert a string to a RedisType
   * @param value The string to convert
   * @param index The index to start the conversion from
   * @returns A tuple of the RedisType and index to the start of the rest of the string
   */
  static fromString(
    _value: string,
    _index: number = 0,
  ): [RedisType, number] | undefined {
    return undefined;
  }

  /**
   * Convert a RedisType to a string
   * @returns The string representation of the RedisType
   */
  abstract toString(): string;
}
