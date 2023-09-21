declare module 'memory-cache' {
    interface Cache {
        put(key: string, value: any, timeout?: number): void;
        get<T>(key: string): T | null;
        del(key: string): void;
        clear(): void;
    }

    const cache: Cache;
    export = cache;
}
