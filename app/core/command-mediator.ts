import type { ConfigPort } from "../ports/driven/config/config-port";
import type { StoragePort } from "../ports/driven/storage/storage-port";
import type Command from "./domain/commands/command";
import type RedisType from "./domain/datatypes/redis-type";

export default class CommandMediator {
  private dataStore: StoragePort;
  private configHolder: ConfigPort;

  constructor(dataStore: StoragePort, config: ConfigPort) {
    this.dataStore = dataStore;
    this.configHolder = config;
  }

  get storage(): StoragePort {
    return this.dataStore;
  }

  get config(): ConfigPort {
    return this.configHolder;
  }

  execute(command: Command): RedisType {
    return command.execute(this);
  }
}
