import type { CommsPort } from "../../../../ports/driving/comms/comms-port";
import * as net from "net";
import { getCommand } from "../command-parser";
import type RedisType from "../../../../core/domain/datatypes/redis-type";
import type Command from "../../../../core/domain/commands/command";

export class TCPServer implements CommsPort {
  server: net.Server;
  onMessageCallback: ((command: Command) => RedisType) | undefined;

  constructor() {
    this.server = net.createServer((connection: net.Socket) => {
      connection.on("data", (message: string) => {
        const command = getCommand(message);
        console.log(command);
        const result = this.onMessageCallback?.(command);
        connection.write(result?.toString() || "");
      });
    });
  }

  start(port?: number): void {
    this.server.listen(port || 6379, "127.0.0.1");
  }

  onMessage(cb: (command: Command) => RedisType): void {
    this.onMessageCallback = cb;
  }
}
