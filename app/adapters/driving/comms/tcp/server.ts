import type { CommsPort } from "../../../../ports/driving/comms/comms-port";
import * as net from "net";

export class TCPServer implements CommsPort {
  server: net.Server;

  constructor() {
    this.server = net.createServer((connection: net.Socket) => {
      this.onMessage("Incoming message");
    });
  }

  start(port?: number): void {
    this.server.listen(port || 6379, "127.0.0.1");
  }

  onMessage(message: string): void {
    console.log(message);
  }
}
