import { CardEntity } from './entity/CardEntity';
import { PaymentEntity } from './entity/PaymentEntity';
export type * from './EvervaultTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { EvervaultEntityBase } from './EvervaultEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class EvervaultSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Card(entopts?: Record<string, any>): CardEntity;
    Payment(entopts?: Record<string, any>): PaymentEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): EvervaultSDK;
    tester(testopts?: any, sdkopts?: any): EvervaultSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof EvervaultSDK;
export { stdutil, config, BaseFeature, EvervaultEntityBase, EvervaultSDK, SDK, };
