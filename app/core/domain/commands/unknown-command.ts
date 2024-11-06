import SimpleString from "../datatypes/simple-string";
import Command from "./command";

export class UnknownCommand extends Command {
  name: string = "UNKNOWN";

  execute(): SimpleString {
    return new SimpleString("UNKNOWN COMMAND");
  }
}
