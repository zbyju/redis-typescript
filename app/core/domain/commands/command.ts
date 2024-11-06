import type RedisType from "../datatypes/redis-type";

export default abstract class Command {
  abstract name: string;
  args: string[];

  constructor(...args: string[]) {
    this.args = args;
  }

  abstract execute(): RedisType;
}
