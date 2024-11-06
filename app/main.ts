import { InMemoryStore } from "./adapters/driven/storage/inmemory/store";
import { TCPServer } from "./adapters/driving/comms/tcp/server";
import CommandMediator from "./core/command-mediator";
import type Command from "./core/domain/commands/command";
import type { CommsPort } from "./ports/driving/comms/comms-port";

const server: CommsPort = new TCPServer();
server.start(6379);

const storage = new InMemoryStore();
const commandMediator = new CommandMediator(storage);

server.onMessage((cmd: Command) => cmd.execute(commandMediator));
