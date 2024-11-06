import type Command from "../../../core/domain/commands/command";
import EchoCommand from "../../../core/domain/commands/echo-command";
import PingCommand from "../../../core/domain/commands/ping-command";
import { UnknownCommand } from "../../../core/domain/commands/unknown-command";
import RedisArray from "../../../core/domain/datatypes/redis-array";
import type { RedisValue } from "../../../core/domain/datatypes/redis-type";
import { decodeString } from "../../../core/domain/datatypes/util";

function argsToStrings(args: RedisValue[]): string[] {
  return args.map((arg) =>
    arg === null ? "null" : arg === undefined ? "undefined" : arg?.toString(),
  );
}

export function stringToCommand(name: string, args?: string[]): Command {
  switch (name) {
    case "PING":
      return new PingCommand();
    case "ECHO":
      return new EchoCommand(args || []);
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
