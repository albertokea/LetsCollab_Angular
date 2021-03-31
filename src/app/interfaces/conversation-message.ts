export interface ConversationMessage {
    idmessage: number;
    text: string;
    fk_user: number;
    fk_conversation: number;
    date_publish: Date;
    file?: string;
}
