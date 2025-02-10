export type CreateUserOption = {
    created_at: string;
    email: string;
    full_name: string;
    login_name: string;
    must_change_password: boolean;
    password: string;
    restricted: boolean;
    send_notify: boolean;
    source_id: number;
    username: string;
    visibility: string;
};