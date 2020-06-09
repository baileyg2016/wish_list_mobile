import { authenticationService } from '../_services';

export function handleResponse(res) {
    if (res.status !== 200) {
        if (res.status === 401 || res.status === 404 || res.status === 403) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            authenticationService.logout();
            // location.reload(true);
        }

        const error = (res.data && res.data.message) || res.statusText;
        return Promise.reject(error);
    }
    
    return res.data;
}