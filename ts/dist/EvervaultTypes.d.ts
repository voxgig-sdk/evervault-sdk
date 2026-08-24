export interface Card {
    expiry: Record<string, any>;
    month: string;
    number: string;
    year: string;
}
export interface CardLoadMatch {
    id: string;
}
export interface CardCreateData {
    expiry: Record<string, any>;
    month: string;
    number: string;
    year: string;
}
export interface Payment {
}
export interface PaymentRemoveMatch {
    card_id: string;
}
