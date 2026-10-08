import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { Webhook, WebhookRemoveMatch } from '../EvervaultTypes';
declare class WebhookEntity extends EvervaultEntityBase<Webhook> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: WebhookEntity): WebhookEntity;
    remove(this: any, reqmatch?: WebhookRemoveMatch, ctrl?: Control): Promise<WebhookEntity>;
}
export { WebhookEntity };
