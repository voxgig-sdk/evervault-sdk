import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { Payment, PaymentListMatch, PaymentRemoveMatch } from '../EvervaultTypes';
declare class PaymentEntity extends EvervaultEntityBase<Payment> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: PaymentEntity): PaymentEntity;
    list(this: any, reqmatch?: PaymentListMatch, ctrl?: Control): Promise<PaymentEntity[]>;
    remove(this: any, reqmatch?: PaymentRemoveMatch, ctrl?: Control): Promise<PaymentEntity>;
}
export { PaymentEntity };
