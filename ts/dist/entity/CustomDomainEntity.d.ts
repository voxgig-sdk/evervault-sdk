import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { CustomDomain, CustomDomainLoadMatch, CustomDomainCreateData } from '../EvervaultTypes';
declare class CustomDomainEntity extends EvervaultEntityBase<CustomDomain> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: CustomDomainEntity): CustomDomainEntity;
    load(this: any, reqmatch?: CustomDomainLoadMatch, ctrl?: Control): Promise<CustomDomainEntity>;
    create(this: any, reqdata?: CustomDomainCreateData, ctrl?: Control): Promise<CustomDomainEntity>;
}
export { CustomDomainEntity };
