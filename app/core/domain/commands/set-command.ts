import BasicItem from "../../../adapters/driven/storage/inmemory/items/basic-item";
import ExpiryItem from "../../../adapters/driven/storage/inmemory/items/expiry-item";
import type CommandMediator from "../../command-mediator";
import SimpleString from "../datatypes/simple-string";
import Command from "./command";

export default class SetCommand extends Command {
  name: string = "SET";

  execute(commandMediator: CommandMediator): SimpleString {
    if (this.args.length < 2) return new SimpleString("WRONG NUMBER OF ARGS");

    const key = this.args[0];
    const value = this.args[1];

    let expiry = 0;
    if (this.args.length > 2) {
      for (let i = 2; i < this.args.length - 1; i++) {
        if (this.args[i].toLowerCase() === "px") {
          expiry = parseInt(this.args[i + 1]);
          break;
        }
      }
    }

    const item =
      expiry > 0 ? new ExpiryItem(value, expiry) : new BasicItem(value);

    commandMediator.storage.set(key, item);

    return new SimpleString("OK");
  }
}
