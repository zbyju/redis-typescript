import type { StoragePort } from "../ports/driving/storage/storage-port";
import type Command from "./domain/commands/command";
import type RedisType from "./domain/datatypes/redis-type";

export default class CommandMediator {
  private dataStore: StoragePort;

  constructor(dataStore: StoragePort) {
    this.dataStore = dataStore;
  }

  get storage(): StoragePort {
    return this.dataStore;
  }

  execute(command: Command): RedisType {
    return command.execute(this);
  }
}
