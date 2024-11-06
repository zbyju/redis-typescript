import { TCPServer } from "./adapters/driving/comms/tcp/server";
import { CommandExecutor } from "./core/command-executor";
import type { CommsPort } from "./ports/driving/comms/comms-port";

const server: CommsPort = new TCPServer();
server.start(6379);

const commandExecutor = new CommandExecutor();

server.onMessage(commandExecutor.execute);
