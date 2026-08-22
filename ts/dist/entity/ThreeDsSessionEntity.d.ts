import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { ThreeDsSession, ThreeDsSessionLoadMatch, ThreeDsSessionCreateData } from '../EvervaultTypes';
declare class ThreeDsSessionEntity extends EvervaultEntityBase<ThreeDsSession> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: ThreeDsSessionEntity): ThreeDsSessionEntity;
    load(this: any, reqmatch?: ThreeDsSessionLoadMatch, ctrl?: Control): Promise<ThreeDsSessionEntity>;
    create(this: any, reqdata?: ThreeDsSessionCreateData, ctrl?: Control): Promise<ThreeDsSessionEntity>;
}
export { ThreeDsSessionEntity };
