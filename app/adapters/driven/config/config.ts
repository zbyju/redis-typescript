import type { ConfigPort } from "../../../ports/driven/config/config-port";

const defaultConfig: ConfigPort = {
  dir: "/tmp",
  dbfilename: "dump.rdb",

  get(key: string): string | undefined {
    // @ts-expect-error - safe usage
    return this[key];
  },

  set(key: string, value: string): void {
    // @ts-expect-error - safe usage
    this[key] = value;
  },
};

export function getConfig(config?: Partial<ConfigPort>): ConfigPort {
  return {
    ...defaultConfig,
    ...config,
  };
}
