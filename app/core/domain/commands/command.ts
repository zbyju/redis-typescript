import type RedisType from "../datatypes/redis-type";
import CommandMediator from "../../command-mediator";

export default abstract class Command {
  abstract name: string;
  args: string[];

  constructor(...args: string[]) {
    this.args = args;
  }

  abstract execute(CommandMediator: CommandMediator): RedisType;
}
