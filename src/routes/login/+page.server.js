import { redirect } from '@sveltejs/kit';

export const prerender = true;

export function load({ cookies }) {
    const sessionId = cookies.get("sessionId");
    if (sessionId) {
        throw redirect(303, `/classrooms/${sessionId}`);
    }
}
