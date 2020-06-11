import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../_helpers';
import { REACT_APP_API_URL } from 'react-native-dotenv';

const currUserSubject = new BehaviorSubject();

export const authService = {
    login,
    register,
    logout,
    currUser: currUserSubject.asObservable(),
    get currUserValue () { return currUserSubject.value }
};



function login(username, password) {
    console.log(REACT_APP_API_URL)
    return axios.get(REACT_APP_API_URL, {
        "username": username,
        "password": password
    }).then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // sessionStorage.setItem('currUser', JSON.stringify(user));
            if (user === undefined) {
                return false;
            }
            
            currUserSubject.next(user.jwt);
            return true;
        });
}

function register(firstName, lastName, username, password) {
    return axios.post(REACT_APP_API_URL + "register", {
        firstName: firstName,
        lastName: lastName,
        email: username,
        password: password
    }).then(handleResponse).then(
        user => {
            if (user) {
                currUserSubject.next(user);
                return true;
            }
            return false;
        }
    )
}

function logout() {
    // remove user from the cache
    // sessionStorage.removeItem('currUser');
    // currUserSubject.next(null);
}