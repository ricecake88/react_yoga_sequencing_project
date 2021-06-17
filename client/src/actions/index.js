export const AUTHENTICATED = 'AUTHENTICATED'
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED'
/*export const BACKEND_URL_BASE = `http://localhost:3001`
export const BACKEND_USERS_URL = `http://localhost:3001/api/v1/users`
export const BACKEND_URL = `http://localhost:3001/api/v1`*/
export const BACKEND_URL_BASE = `/`
export const BACKEND_USERS_URL = `https://yoga-sequencing-app.herokuapp.com/api/v1/users`
export const BACKEND_URL = `https://yoga-sequencing-app.herokuapp.com/api/v1`
const DEV_URL = 'http://localhost:3000/api/v1';
const PROD_URL = 'https://yoga-sequencing-app.herokuapp.com/api/v1';
export const API_ROOT = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL;