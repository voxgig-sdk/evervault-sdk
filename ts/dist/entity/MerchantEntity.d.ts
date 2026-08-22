import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { Merchant, MerchantLoadMatch, MerchantCreateData, MerchantUpdateData } from '../EvervaultTypes';
declare class MerchantEntity extends EvervaultEntityBase<Merchant> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: MerchantEntity): MerchantEntity;
    load(this: any, reqmatch?: MerchantLoadMatch, ctrl?: Control): Promise<MerchantEntity>;
    create(this: any, reqdata?: MerchantCreateData, ctrl?: Control): Promise<MerchantEntity>;
    update(this: any, reqdata?: MerchantUpdateData, ctrl?: Control): Promise<MerchantEntity>;
}
export { MerchantEntity };
