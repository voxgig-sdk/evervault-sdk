import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { BinLookup, BinLookupCreateData } from '../EvervaultTypes';
declare class BinLookupEntity extends EvervaultEntityBase<BinLookup> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: BinLookupEntity): BinLookupEntity;
    create(this: any, reqdata?: BinLookupCreateData, ctrl?: Control): Promise<BinLookupEntity>;
}
export { BinLookupEntity };
