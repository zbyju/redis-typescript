import { getConfig } from "./adapters/driven/config/config";
import { InMemoryStore } from "./adapters/driven/storage/inmemory/store";
import { TCPServer } from "./adapters/driving/comms/tcp/server";
import CommandMediator from "./core/command-mediator";
import type Command from "./core/domain/commands/command";
import type { ConfigPort } from "./ports/driven/config/config-port";
import type { CommsPort } from "./ports/driving/comms/comms-port";

const server: CommsPort = new TCPServer();
server.start(6379);

// Storage
const storage = new InMemoryStore();

// Config
const config = initConfig();

const commandMediator = new CommandMediator(storage, config);

server.onMessage((cmd: Command) => cmd.execute(commandMediator));

function initConfig(): ConfigPort {
  const args = process.argv.slice(2);
  const config = getConfig();

  const flags: Set<string> = new Set(["--dir", "--dbfilename"]);

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (flags.has(arg) && i + 1 < args.length) {
      const argName = arg.slice(2);
      config[argName as keyof ConfigPort] = args[i + 1];
      i++;
    }
  }

  console.log(config);
  return config;
}
