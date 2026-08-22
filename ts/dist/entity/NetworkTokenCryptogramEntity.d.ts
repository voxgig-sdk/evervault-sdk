import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { NetworkTokenCryptogram, NetworkTokenCryptogramCreateData } from '../EvervaultTypes';
declare class NetworkTokenCryptogramEntity extends EvervaultEntityBase<NetworkTokenCryptogram> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: NetworkTokenCryptogramEntity): NetworkTokenCryptogramEntity;
    create(this: any, reqdata?: NetworkTokenCryptogramCreateData, ctrl?: Control): Promise<NetworkTokenCryptogramEntity>;
}
export { NetworkTokenCryptogramEntity };
