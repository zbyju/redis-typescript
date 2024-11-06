import type CommandMediator from "../../command-mediator";
import BulkString from "../datatypes/bulk-string";
import Command from "./command";

export default class EchoCommand extends Command {
  name: string = "ECHO";

  execute(_commandMediator: CommandMediator): BulkString {
    if (this.args.length === 0) return new BulkString(null);
    return new BulkString(this.args[0]);
  }
}
