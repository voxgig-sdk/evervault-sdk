import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { Core, CoreListMatch, CoreCreateData, CoreRemoveMatch } from '../EvervaultTypes';
declare class CoreEntity extends EvervaultEntityBase<Core> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: CoreEntity): CoreEntity;
    list(this: any, reqmatch?: CoreListMatch, ctrl?: Control): Promise<CoreEntity[]>;
    create(this: any, reqdata?: CoreCreateData, ctrl?: Control): Promise<CoreEntity>;
    remove(this: any, reqmatch?: CoreRemoveMatch, ctrl?: Control): Promise<CoreEntity>;
}
export { CoreEntity };
