export interface ConfigPort {
  dir: string;
  dbfilename: string;

  get(key: string): string | undefined;
  set(key: string, value: string): void;
}
