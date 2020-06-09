import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../_helpers';

const currUserSubject = new BehaviorSubject(/*JSON.parse(sessionStorage.getItem('currUser'))*/);

export const authenticationService = {
    login,
    register,
    logout,
    currUser: currUserSubject.asObservable(),
    get currUserValue () { return currUserSubject.value }
};

function login(username, password) {
    return axios.post(process.env.REACT_APP_API_URL, {
        "user": username,
        "pass": password
    }).then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // sessionStorage.setItem('currUser', JSON.stringify(user));
            currUserSubject.next(user)
            return user;
        });
}

function register(firstName, lastName, username, password) {
    return axios.post(process.env.REACT_APP_API_URL + "register", {
        firstName: firstName,
        lastName: lastName,
        email: username,
        password: password
    })/*.then(handleResponse)*/.then(
        user => {
            currUserSubject.next(user);
            return user;
        }
    )
}

function logout() {
    // remove user from the cache
    // sessionStorage.removeItem('currUser');
    // currUserSubject.next(null);
}