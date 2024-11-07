import type CommandMediator from "../../../command-mediator";
import BulkString from "../../datatypes/bulk-string";
import RedisArray from "../../datatypes/redis-array";
import Command from "../command";

export default class ConfigGetCommand extends Command {
  name: string = "CONFIG GET";

  execute(commandMediator: CommandMediator): RedisArray {
    if (this.args.length === 0) return new RedisArray([]);

    const key = this.args[0];
    const value = commandMediator.config.get(key);

    console.log(key, value);

    // Couldn't find the key
    if (value === undefined) return new RedisArray([]);

    return new RedisArray([new BulkString(key), new BulkString(value)]);
  }
}
