import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { ClientSideToken, ClientSideTokenCreateData } from '../EvervaultTypes';
declare class ClientSideTokenEntity extends EvervaultEntityBase<ClientSideToken> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: ClientSideTokenEntity): ClientSideTokenEntity;
    create(this: any, reqdata?: ClientSideTokenCreateData, ctrl?: Control): Promise<ClientSideTokenEntity>;
}
export { ClientSideTokenEntity };
