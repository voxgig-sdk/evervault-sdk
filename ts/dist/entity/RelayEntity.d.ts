import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { Relay, RelayLoadMatch, RelayListMatch, RelayCreateData, RelayUpdateData } from '../EvervaultTypes';
declare class RelayEntity extends EvervaultEntityBase<Relay> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: RelayEntity): RelayEntity;
    load(this: any, reqmatch?: RelayLoadMatch, ctrl?: Control): Promise<RelayEntity>;
    list(this: any, reqmatch?: RelayListMatch, ctrl?: Control): Promise<RelayEntity[]>;
    create(this: any, reqdata?: RelayCreateData, ctrl?: Control): Promise<RelayEntity>;
    update(this: any, reqdata?: RelayUpdateData, ctrl?: Control): Promise<RelayEntity>;
}
export { RelayEntity };
