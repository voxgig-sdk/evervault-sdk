import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { CardArt, CardArtLoadMatch } from '../EvervaultTypes';
declare class CardArtEntity extends EvervaultEntityBase<CardArt> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: CardArtEntity): CardArtEntity;
    load(this: any, reqmatch?: CardArtLoadMatch, ctrl?: Control): Promise<CardArtEntity>;
}
export { CardArtEntity };
