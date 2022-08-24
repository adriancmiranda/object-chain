export type Apply<Response = unknown> = (...rest: unknown[]) => Response;

export interface Chain {
  (config: Record<string, Chain>)
  [key: string]: Chain;
}

declare global {
    interface String {
    }
}
