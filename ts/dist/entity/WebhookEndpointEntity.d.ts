import { EvervaultEntityBase } from '../EvervaultEntityBase';
import type { EvervaultSDK } from '../EvervaultSDK';
import type { Control } from '../types';
import type { WebhookEndpoint, WebhookEndpointLoadMatch, WebhookEndpointUpdateData } from '../EvervaultTypes';
declare class WebhookEndpointEntity extends EvervaultEntityBase<WebhookEndpoint> {
    constructor(client: EvervaultSDK, entopts: any);
    make(this: WebhookEndpointEntity): WebhookEndpointEntity;
    load(this: any, reqmatch?: WebhookEndpointLoadMatch, ctrl?: Control): Promise<WebhookEndpointEntity>;
    update(this: any, reqdata?: WebhookEndpointUpdateData, ctrl?: Control): Promise<WebhookEndpointEntity>;
}
export { WebhookEndpointEntity };
