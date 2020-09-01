import { BehaviorSubject } from 'rxjs';
import FetchFromStorage from './FetchFromStorage';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../graphql/queries';
import { REGISTER } from '../graphql/mutations';

const currUserSubject = new BehaviorSubject();
const { setToken, clearToken, setName } = FetchFromStorage;

export const authService = {
    login,
    register,
    logout,
    currUser: currUserSubject.asObservable(),
    get currUserValue () { return currUserSubject.value }
};



function login(error, data) {
    if (error) {
        console.error(`Error: ${error}`);
        return null;
    } else {
        setToken(data.login.jwt);
        setName(data.login.firstName, data.login.lastName);
        currUserSubject.next(data.login.jwt);
    }
    console.log(data.login.jwt)
    return data.login.jwt;
}

function register(firstName, lastName, email, password) {
    const [register, { data, error }] = useMutation(REGISTER);
    register({ variables: {
        firstName,
        lastName,
        email,
        password
    }});

    if (error) {
        console.error(error);
    } else {
        currUserSubject.next(data.jwt);
        setToken(data.jwt);
        setName(firstName, lastName);
    }

    return { jwt: data.jwt }
}

function logout() {
    // remove user from the cache
    clearToken();
    currUserSubject.next(null);
}