import type CommandMediator from "../../command-mediator";
import SimpleString from "../datatypes/simple-string";
import Command from "./command";

export default class PingCommand extends Command {
  name: string = "PING";

  execute(_commandMediator: CommandMediator): SimpleString {
    return new SimpleString("PONG");
  }
}
