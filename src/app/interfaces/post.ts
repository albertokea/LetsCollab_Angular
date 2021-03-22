export interface Post {
    idpost: number;
    genre: string;
    license: string;
    audio: string;
    date_publish: string;
    key_note: string;
    bpm: number;
    extra_tags: string;
    download: boolean;
    like_active: boolean;
    description_text: string;
    fk_user: number;
    type: string;
}
