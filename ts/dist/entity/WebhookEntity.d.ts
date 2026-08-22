import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { Webhook, WebhookListMatch, WebhookCreateData, WebhookRemoveMatch } from '../EvervaultTypes';
declare class WebhookEntity extends EvervaultEntityBase<Webhook> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: WebhookEntity): WebhookEntity;
    list(this: any, reqmatch?: WebhookListMatch, ctrl?: Control): Promise<WebhookEntity[]>;
    create(this: any, reqdata?: WebhookCreateData, ctrl?: Control): Promise<WebhookEntity>;
    remove(this: any, reqmatch?: WebhookRemoveMatch, ctrl?: Control): Promise<WebhookEntity>;
}
export { WebhookEntity };
