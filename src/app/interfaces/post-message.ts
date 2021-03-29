export interface PostMessage {
    idpost_message: number;
    fk_post: number;
    fk_user: number;
    text: string;
    date_publish: Date;
}
