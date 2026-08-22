import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { FunctionRun, FunctionRunCreateData } from '../EvervaultTypes';
declare class FunctionRunEntity extends EvervaultEntityBase<FunctionRun> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: FunctionRunEntity): FunctionRunEntity;
    create(this: any, reqdata?: FunctionRunCreateData, ctrl?: Control): Promise<FunctionRunEntity>;
}
export { FunctionRunEntity };
