import { BehaviorSubject } from 'rxjs';
import FetchFromStorage from './FetchFromStorage';
import { useMutation } from '@apollo/react-hooks';
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



async function login(jwt, firstName, lastName) {
    console.log(jwt, firstName, lastName)
    try {
        await setToken(jwt);
        await setName(firstName, lastName);
        currUserSubject.next(jwt);
        console.log(jwt)
        return jwt;
    } catch (error) {
        console.error(error)
        return null;
    }
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