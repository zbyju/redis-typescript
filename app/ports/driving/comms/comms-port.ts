import type { Command } from "../../../core/domain/commands/command";
import type { RedisType } from "../../../core/domain/datatypes/redis-type";

export interface CommsPort {
  start(port?: number): void;
  onMessage(cb: (command: Command) => RedisType): void;
}
