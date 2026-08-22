import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { NetworkToken, NetworkTokenLoadMatch, NetworkTokenCreateData } from '../EvervaultTypes';
declare class NetworkTokenEntity extends EvervaultEntityBase<NetworkToken> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: NetworkTokenEntity): NetworkTokenEntity;
    load(this: any, reqmatch?: NetworkTokenLoadMatch, ctrl?: Control): Promise<NetworkTokenEntity>;
    create(this: any, reqdata?: NetworkTokenCreateData, ctrl?: Control): Promise<NetworkTokenEntity>;
}
export { NetworkTokenEntity };
