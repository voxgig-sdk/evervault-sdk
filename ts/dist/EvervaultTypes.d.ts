export interface Acquirer {
    configurations: any[];
    default: boolean;
    description?: string;
    id: string;
    name: string;
}
export interface AcquirerLoadMatch {
    id: string;
}
export interface AcquirerListMatch {
    page?: number;
    page_size?: number;
    $action?: string;
    [action: string]: any;
}
export interface AcquirerCreateData {
    configurations: any[];
    default: boolean;
    description?: string;
    id: string;
    name: string;
    $action?: string;
    [action: string]: any;
}
export interface AcquirerUpdateData {
    id: string;
    configurations?: any[];
    default?: boolean;
    description?: string;
    name?: string;
}
export interface BinLookup {
    number: string;
}
export interface BinLookupCreateData {
    number: string;
}
export interface Card {
    address: Record<string, any>;
    automaticUpdates?: string;
    bin: string;
    brand?: string;
    card: Record<string, any>;
    cardholder?: Record<string, any>;
    country?: string;
    createdAt: number;
    currency?: string;
    expiry: Record<string, any>;
    extensions?: any[];
    funding?: string;
    id?: string;
    issuer?: string;
    lastFour: string;
    number: string;
    replacement?: string | null;
    segment?: string;
    status?: string;
    updatedAt?: number | null;
}
export interface CardLoadMatch {
    id: string;
}
export interface CardCreateData {
    address: Record<string, any>;
    automaticUpdates?: string;
    bin: string;
    brand?: string;
    card: Record<string, any>;
    cardholder?: Record<string, any>;
    country?: string;
    createdAt: number;
    currency?: string;
    expiry: Record<string, any>;
    extensions?: any[];
    funding?: string;
    id?: string;
    issuer?: string;
    lastFour: string;
    number: string;
    replacement?: string | null;
    segment?: string;
    status?: string;
    updatedAt?: number | null;
    $action?: string;
    [action: string]: any;
}
export interface CardArt {
    data: string;
    height: number;
    type: string;
    width: number;
}
export interface CardArtLoadMatch {
    network_token_id: string;
}
export interface ClientSideToken {
    action: string;
    expiry?: number;
    payload?: Record<string, any>;
}
export interface ClientSideTokenCreateData {
    action: string;
    expiry?: number;
    payload?: Record<string, any>;
}
export interface Core {
    category?: string;
    core_list?: Record<string, any> | any[] | string | number | boolean;
    cores?: Record<string, any> | any[] | string;
    createdAt?: number;
    customDomain?: string;
    encryptedAt?: number;
    fingerprint?: string;
    id?: string;
    metadata?: any;
    phoneNumber?: string;
    relay?: string;
    role?: string;
    status?: string;
    token: string;
    type?: string;
    updatedAt?: number;
    validationRecord?: string;
}
export interface CoreListMatch {
    relay_id: string;
}
export interface CoreCreateData {
    category?: string;
    core_list?: Record<string, any> | any[] | string | number | boolean;
    cores?: Record<string, any> | any[] | string;
    createdAt?: number;
    customDomain?: string;
    encryptedAt?: number;
    fingerprint?: string;
    id?: string;
    metadata?: any;
    phoneNumber?: string;
    relay?: string;
    role?: string;
    status?: string;
    token: string;
    type?: string;
    updatedAt?: number;
    validationRecord?: string;
}
export interface CoreRemoveMatch {
    id: string;
    relay_id?: string;
}
export interface CustomDomain {
    createdAt?: number;
    customDomain?: string;
    id?: string;
    relay?: string;
    status?: string;
    updatedAt?: number;
    validationRecord?: string;
}
export interface CustomDomainLoadMatch {
    id: string;
    relay_id: string;
}
export interface CustomDomainCreateData {
    relay_id: string;
    createdAt?: number;
    customDomain?: string;
    id?: string;
    relay?: string;
    status?: string;
    updatedAt?: number;
    validationRecord?: string;
}
export interface FunctionRun {
    async?: boolean;
    createdAt?: number;
    error?: Record<string, any> | null;
    id?: string;
    payload: Record<string, any>;
    result?: Record<string, any>;
    status?: string;
}
export interface FunctionRunCreateData {
    function_name: string;
    async?: boolean;
    createdAt?: number;
    error?: Record<string, any> | null;
    id?: string;
    payload: Record<string, any>;
    result?: Record<string, any>;
    status?: string;
}
export interface Merchant {
    applePay?: Record<string, any>;
    business?: Record<string, any>;
    categoryCode?: string;
    createdAt: number;
    id: string;
    name: string;
    networkTokens?: Record<string, any>;
    shortName?: string;
    updatedAt?: number;
    website: string;
}
export interface MerchantLoadMatch {
    id: string;
}
export interface MerchantListMatch {
    page?: number;
    page_size?: number;
    q?: string;
    $action?: string;
    [action: string]: any;
}
export interface MerchantCreateData {
    applePay?: Record<string, any>;
    business?: Record<string, any>;
    categoryCode?: string;
    createdAt: number;
    id: string;
    name: string;
    networkTokens?: Record<string, any>;
    shortName?: string;
    updatedAt?: number;
    website: string;
    $action?: string;
    [action: string]: any;
}
export interface MerchantUpdateData {
    id: string;
    applePay?: Record<string, any>;
    business?: Record<string, any>;
    categoryCode?: string;
    createdAt?: number;
    name?: string;
    networkTokens?: Record<string, any>;
    shortName?: string;
    updatedAt?: number;
    website?: string;
}
export interface NetworkToken {
    card: Record<string, any>;
    createdAt: number;
    expiry: Record<string, any>;
    id: string;
    merchant: string;
    number: string;
    paymentAccountReference?: string;
    status: string;
    tokenRequestorIdentifier: string;
    tokenServiceProvider: string;
    updatedAt?: number;
}
export interface NetworkTokenLoadMatch {
    id: string;
}
export interface NetworkTokenCreateData {
    card: Record<string, any>;
    createdAt: number;
    expiry: Record<string, any>;
    id: string;
    merchant: string;
    number: string;
    paymentAccountReference?: string;
    status: string;
    tokenRequestorIdentifier: string;
    tokenServiceProvider: string;
    updatedAt?: number;
    $action?: string;
    [action: string]: any;
}
export interface NetworkTokenCryptogram {
    createdAt?: number;
    cryptogram?: string;
    id?: string;
}
export interface NetworkTokenCryptogramCreateData {
    id: string;
    createdAt?: number;
    cryptogram?: string;
}
export interface Payment {
    created_at?: number;
    data?: Record<string, any>;
    type?: string;
}
export interface PaymentListMatch {
    "3ds_session_id": string;
}
export interface PaymentRemoveMatch {
    acquirer_id: string;
}
export interface Relay {
    app?: string;
    authentication?: string | null;
    createdAt?: number;
    destinationDomain?: string;
    encryptEmptyStrings?: boolean;
    evervaultDomain?: string;
    id?: string;
    routes?: any[];
    updatedAt?: number;
}
export interface RelayLoadMatch {
    id: string;
}
export interface RelayListMatch {
    app?: string;
    authentication?: string | null;
    createdAt?: number;
    destinationDomain?: string;
    encryptEmptyStrings?: boolean;
    evervaultDomain?: string;
    id?: string;
    routes?: any[];
    updatedAt?: number;
}
export interface RelayCreateData {
    app?: string;
    authentication?: string | null;
    createdAt?: number;
    destinationDomain?: string;
    encryptEmptyStrings?: boolean;
    evervaultDomain?: string;
    id?: string;
    routes?: any[];
    updatedAt?: number;
}
export interface RelayUpdateData {
    id: string;
    app?: string;
    authentication?: string | null;
    createdAt?: number;
    destinationDomain?: string;
    encryptEmptyStrings?: boolean;
    evervaultDomain?: string;
    routes?: any[];
    updatedAt?: number;
}
export interface ThreeDsSession {
    accessControlServer?: Record<string, any>;
    acquirer: Record<string, any>;
    ares?: Record<string, any>;
    authentication: Record<string, any>;
    card: Record<string, any>;
    challenge: Record<string, any>;
    createdAt: number;
    cres?: null | Record<string, any>;
    cryptogram?: string;
    customer?: Record<string, any>;
    directoryServer?: Record<string, any>;
    eci?: Record<string, any>;
    failureReason?: string;
    id: string;
    initiator?: Record<string, any>;
    merchant: Record<string, any>;
    nextAction: Record<string, any>;
    payment?: Record<string, any>;
    preferredVersions?: any[];
    rreq?: null | Record<string, any>;
    status: string;
    threeDSServer?: Record<string, any>;
    updatedAt?: number;
    version: string;
}
export interface ThreeDsSessionLoadMatch {
    "3ds_session_id": string;
}
export interface ThreeDsSessionCreateData {
    accessControlServer?: Record<string, any>;
    acquirer: Record<string, any>;
    ares?: Record<string, any>;
    authentication: Record<string, any>;
    card: Record<string, any>;
    challenge: Record<string, any>;
    createdAt: number;
    cres?: null | Record<string, any>;
    cryptogram?: string;
    customer?: Record<string, any>;
    directoryServer?: Record<string, any>;
    eci?: Record<string, any>;
    failureReason?: string;
    id: string;
    initiator?: Record<string, any>;
    merchant: Record<string, any>;
    nextAction: Record<string, any>;
    payment?: Record<string, any>;
    preferredVersions?: any[];
    rreq?: null | Record<string, any>;
    status: string;
    threeDSServer?: Record<string, any>;
    updatedAt?: number;
    version: string;
}
export interface Webhook {
}
export interface WebhookRemoveMatch {
    webhook_endpoint_id: string;
}
export interface WebhookEndpoint {
    createdAt?: number;
    events?: any[];
    id?: string;
    updatedAt?: number | null;
    url?: string;
}
export interface WebhookEndpointLoadMatch {
    id: string;
}
export interface WebhookEndpointListMatch {
    limit?: number;
    starting_after?: string;
}
export interface WebhookEndpointCreateData {
    createdAt?: number;
    events?: any[];
    id?: string;
    updatedAt?: number | null;
    url?: string;
}
export interface WebhookEndpointUpdateData {
    id: string;
    createdAt?: number;
    events?: any[];
    updatedAt?: number | null;
    url?: string;
}
