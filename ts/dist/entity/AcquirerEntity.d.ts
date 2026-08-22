import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { Acquirer, AcquirerLoadMatch, AcquirerCreateData, AcquirerUpdateData } from '../EvervaultTypes';
declare class AcquirerEntity extends EvervaultEntityBase<Acquirer> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: AcquirerEntity): AcquirerEntity;
    load(this: any, reqmatch?: AcquirerLoadMatch, ctrl?: Control): Promise<AcquirerEntity>;
    create(this: any, reqdata?: AcquirerCreateData, ctrl?: Control): Promise<AcquirerEntity>;
    update(this: any, reqdata?: AcquirerUpdateData, ctrl?: Control): Promise<AcquirerEntity>;
}
export { AcquirerEntity };
