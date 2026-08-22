import { Context } from './Context';
declare class EvervaultError extends Error {
    isEvervaultError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { EvervaultError };
