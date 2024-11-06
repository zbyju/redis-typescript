import type CommandMediator from "../../command-mediator";
import BulkString from "../datatypes/bulk-string";
import Command from "./command";

export default class GetCommand extends Command {
  name: string = "GET";

  execute(commandMediator: CommandMediator): BulkString {
    if (this.args.length === 0) return new BulkString(null);

    const key = this.args[0];
    const item = commandMediator.storage.get(key);

    // Couldn't find the key
    if (item === undefined) return new BulkString(null);

    return new BulkString(item);
  }
}
