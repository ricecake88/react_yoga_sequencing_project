import { BACKEND_URL } from '.';
import { getToken } from './auth';

export const addPosesToSeq = (poses) => {
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ poses })
    }
    fetch
}