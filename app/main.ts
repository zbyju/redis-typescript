import { TCPServer } from "./adapters/driving/comms/tcp/server";
import type { CommsPort } from "./ports/driving/comms/comms-port";

const server: CommsPort = new TCPServer();
server.start(6379);
