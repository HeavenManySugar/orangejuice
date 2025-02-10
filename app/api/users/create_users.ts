import { CreateUserOption } from './types';

export async function CreateUsers(users: CreateUserOption[], authorization: string) {
    const responses = await Promise.all(
        users.map(user =>
            fetch('/api/v1/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorization
                },
                body: JSON.stringify(user)
            })
        )
    );

    const results = await Promise.all(
        responses.map(async response => {
            const data = await response.json();
            return { ok: response.ok, data };
        })
    );

    // Filter out any requests that failed (i.e. response.ok is false)
    const failed = results.filter(result => !result.ok);

    return failed;
}