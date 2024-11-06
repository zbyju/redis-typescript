import type CommandMediator from "../../command-mediator";
import SimpleString from "../datatypes/simple-string";
import Command from "./command";

export default class SetCommand extends Command {
  name: string = "SET";

  execute(commandMediator: CommandMediator): SimpleString {
    if (this.args.length !== 2) return new SimpleString("WRONG NUMBER OF ARGS");

    const key = this.args[0];
    const value = this.args[1];
    commandMediator.storage.set(key, value);

    return new SimpleString("OK");
  }
}
