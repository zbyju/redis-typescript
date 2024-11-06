import RedisType from "./redis-type";

export default class BulkString extends RedisType {
  private value: string | null;

  constructor(value: string | null) {
    super();
    this.value = value;
  }

  rawValue(): string | null {
    return this.value;
  }

  toString(): string {
    if (this.value === null) return "$-1\r\n";
    return `$${this.value.length}\r\n${this.value}\r\n`;
  }

  static override fromString(
    value: string,
    index: number = 0,
  ): [BulkString, number] | undefined {
    console.log(
      `Decoding bulk string. Got: ${value} at ${index}. First char: ${value.at(index)}`,
    );
    if (value[index] !== "$") return undefined;

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
    const length = parseInt(lengthStr);

    // Jump to \n and then on the first character of the actual string
    index += 2;

    // Check if we have enough characters
    if (index + length + 2 < value.length) return undefined;

    // Parse value
    let result = "";
    let i = 0;
    while (i < length) {
      result += value[index + i];
      i++;
    }

    console.log(
      `Decoded bulk string. Result: ${result}, continue at ${index + length + 2}. First continue: ${value.at(index + length + 2)}`,
    );
    return [new BulkString(result), index + length + 2];
  }
}
