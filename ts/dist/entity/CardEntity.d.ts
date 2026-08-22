import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { Card, CardLoadMatch, CardCreateData } from '../EvervaultTypes';
declare class CardEntity extends EvervaultEntityBase<Card> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: CardEntity): CardEntity;
    load(this: any, reqmatch?: CardLoadMatch, ctrl?: Control): Promise<CardEntity>;
    create(this: any, reqdata?: CardCreateData, ctrl?: Control): Promise<CardEntity>;
}
export { CardEntity };
