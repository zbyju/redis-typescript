import type CommandMediator from "../../command-mediator";
import SimpleString from "../datatypes/simple-string";
import Command from "./command";

export class UnknownCommand extends Command {
  name: string = "UNKNOWN";

  execute(_commandMediator: CommandMediator): SimpleString {
    return new SimpleString("UNKNOWN COMMAND");
  }
}
