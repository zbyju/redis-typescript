[![progress-banner](https://backend.codecrafters.io/progress/redis/a86777ba-fac5-4874-abc9-3897b102e42c)](https://app.codecrafters.io/users/codecrafters-bot?r=2qF)

# TypeScript Redis Clone

This project is a Redis clone built in TypeScript, designed to follow the official [Redis protocol specifications](https://redis.io/topics/protocol). It implements many core Redis functionalities and uses **hexagonal architecture** for modularity, making it easier to extend and test.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Commands Implemented](#commands-implemented)
- [Planned Features](#planned-features)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Protocol Compliance**: Adheres to Redis specifications for compatibility with Redis clients.
- **TypeScript with Hexagonal Architecture**: Provides clean, decoupled code that is easy to maintain and scale.
- **Core Commands**: Implements foundational Redis commands like `PING`, `ECHO`, `SET`, `GET`, along with data expiration.
- **Concurrent Client Handling**: Manages multiple client connections efficiently and handles multiple requests simultaneously.

## Project Structure

This project follows a **hexagonal architecture**, also known as ports and adapters. The main components include:

- **Core**: Contains the business logic, command processing, and storage mechanisms.
- **Adapters**: Interface for network connections and persistence.
- **Infrastructure**: Manages Redis protocol handling, client connections, and any external dependencies.

## Getting Started

To get started with this Redis clone, follow these steps:

### Prerequisites

- [Bun](https://bun.sh/) (>= 0.5.0)
- TypeScript

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/redis-clone.git
cd redis-clone
bun install
```

### Running the Server

To start the Redis clone server, use:

```sh
bun dev
```

By default, the server listens on `localhost` at port `6379`, the standard Redis port. You can change the port in the configuration file if needed.
Commands Implemented

This project currently supports the following commands:

- `PING`: Simple health check.
- `ECHO <message>`: Responds with the given message.
- `SET <key> <value>`: Stores a key-value pair.
    - `px <expiry_ms>`: Allows setting expiration times on keys.
- `GET <key>`: Retrieves the value associated with a key.

These commands are implemented following the Redis specification for consistent behavior with Redis clients.
Planned Features

The next stages of development focus on implementing advanced Redis features, including:

- Persistence: Adding RDB persistence to store snapshots of the in-memory database.
- Replication: Replicates data to multiple instances for redundancy and scaling.
- Streams: Supports Redis streams, ideal for message queues and event logging.
- Transactions: Implements atomic transactions using commands like `MULTI`, `EXEC`, and `DISCARD`.

Detailed Planned Features

- Persistence
    - RDB file configuration and support.
    - Loading key-value pairs with optional expiry support.

- Replication
    - Configuration for replica instances and INFO command.
    - Multi-replica command propagation and initial replication handshake.

- Streams and Transactions
    - Stream support with XREAD, blocking reads, and more.
    - Transaction management with MULTI, EXEC, and DISCARD commands.

# Contributing

Contributions are welcome! To contribute:

- Fork the repository.
- Create a new branch with a descriptive name.
- Make your changes and test thoroughly.
- Submit a pull request with a detailed explanation of changes.

# License

This project is licensed under the MIT License. See the LICENSE file for details.
