import type CommandMediator from "../../../command-mediator";
import BulkString from "../../datatypes/bulk-string";
import type RedisType from "../../datatypes/redis-type";
import Command from "../command";
import { UnknownCommand } from "../unknown-command";
import ConfigGetCommand from "./config-get-command";

export default class ConfigCommand extends Command {
  name: string = "CONFIG";

  execute(commandMediator: CommandMediator): RedisType {
    if (this.args.length === 0) return new BulkString(null);

    const configCommand = this.args[0];

    let command: Command;
    switch (configCommand) {
      case "GET":
        command = new ConfigGetCommand(...this.args.slice(1));
        break;
      default:
        command = new UnknownCommand();
    }
    return command.execute(commandMediator);
  }
}
