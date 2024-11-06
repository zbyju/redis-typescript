import SimpleString from "../datatypes/simple-string";
import Command from "./command";

export default class PingCommand extends Command {
  name: string = "PING";

  execute(): SimpleString {
    return new SimpleString("PONG");
  }
}
