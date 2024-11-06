import type { Command } from "./domain/commands/command";
import type { RedisType } from "./domain/datatypes/redis-type";

export class CommandExecutor {
  execute(command: Command): RedisType {
    return command.execute();
  }
}
