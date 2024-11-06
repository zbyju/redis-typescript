import { decodeString } from "./from-string";
import RedisType, { type RedisValue } from "./redis-type";

export default class RedisArray extends RedisType {
  private value: RedisType[];

  constructor(value: RedisType[]) {
    super();
    this.value = value;
  }

  rawValue(): RedisValue[] {
    return this.value.map((v) => v.rawValue());
  }

  toString(): string {
    return `$${this.value.length}\r\n${this.value.map((v) => v.toString()).join()}`;
  }

  static override fromString(
    value: string,
    index: number = 0,
  ): [RedisArray, number] | undefined {
    console.log(
      `Decoding array. Got: ${value} at ${index}. First char: ${value.at(index)}, ${value[index] !== "*"}`,
    );

    if (value[index] !== "*") {
      console.log(`Not an array. Got: ${value} at ${index}`);
      return undefined;
    }

    // Parse length
    let lengthStr = "";
    index++;
    while (
      index + 1 < value.length &&
      value[index] !== "\r" &&
      value[index] !== "\n"
    ) {
      lengthStr += value[index];
      index++;
    }
    console.log(`Length: ${lengthStr}`);
    const length = parseInt(lengthStr);

    // Jump to \n and then on the first character of the actual string
    index += 2;

    const result: RedisType[] = [];

    for (let i = 0; i < length; i++) {
      const val = decodeString(value, index);
      if (val === undefined) {
        console.log();
        return undefined;
      }

      const [newValue, newIndex] = val;
      result.push(newValue);
      index = newIndex;
    }

    console.log(
      `Decoded array. Result: ${result}, continue at ${index}. First continue: ${value.at(index)}`,
    );
    return [new RedisArray(result), index];
  }
}
