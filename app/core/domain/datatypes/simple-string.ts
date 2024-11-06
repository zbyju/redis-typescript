import RedisType from "./redis-type";

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
    console.log(
      `Decoding simple string. Got: ${value} at ${index}. First char: ${value.at(index)}`,
    );

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

    console.log(
      `Decoded simple string. Result: ${result}, continue at ${index + 2}. First continue: ${value[index + 2]}`,
    );
    return [new SimpleString(result), index + 2];
  }
}
