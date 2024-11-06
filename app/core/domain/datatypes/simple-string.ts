import RedisType from "./redis-type";
import { logEndDecoding, logStartDecoding } from "./util";

export default class SimpleString extends RedisType {
  private value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }

  rawValue(): string {
    return this.value;
  }

  toString(): string {
    return `+${this.value}\r\n`;
  }

  static override fromString(
    value: string,
    index: number = 0,
  ): [SimpleString, number] | undefined {
    logStartDecoding("SIMPLE STRING", value, index);

    if (value[index] !== "+") return undefined;

    let result = "";

    index++;
    while (
      index + 1 < value.length &&
      value[index] !== "\r" &&
      value[index + 1] !== "\n"
    ) {
      result += value[index];
      index++;
    }

    logEndDecoding("SIMPLE STRING", value, index + 2, new SimpleString(result));
    return [new SimpleString(result), index + 2];
  }
}
