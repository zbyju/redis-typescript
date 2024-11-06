import type Command from "../../../core/domain/commands/command";
import PingCommand from "../../../core/domain/commands/ping-command";
import { UnknownCommand } from "../../../core/domain/commands/unknown-command";
import { decodeString } from "../../../core/domain/datatypes/from-string";
import RedisArray from "../../../core/domain/datatypes/redis-array";
import type { RedisValue } from "../../../core/domain/datatypes/redis-type";

function argsToStrings(args: RedisValue[]): string[] {
  return args.map((arg) =>
    arg === null ? "null" : arg === undefined ? "undefined" : arg?.toString(),
  );
}

export function stringToCommand(name: string, _args?: string[]): Command {
  switch (name) {
    case "PING":
      return new PingCommand();
    default:
      return new UnknownCommand();
  }
}

export function getCommand(message: string): Command {
  const decoded = decodeString(message);

  if (decoded === undefined) return new UnknownCommand();
  if (!(decoded[0] instanceof RedisArray)) return new UnknownCommand();

  const args = decoded[0].rawValue();
  if (args.length === 0 || typeof args[0] !== "string")
    return new UnknownCommand(...argsToStrings(args));

  return stringToCommand(args[0], argsToStrings(args.slice(1)));
}
