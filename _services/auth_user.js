import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../_helpers';
import { REACT_APP_API_URL } from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';

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
        .then(res => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            AsyncStorage.setItem('token', res.jwt);
            console.log(res)
            if (res === undefined) {
                return null;
            }
            
            currUserSubject.next(res.jwt);
            
            return res.jwt;
        });
}

function register(firstName, lastName, username, password) {
    return axios.post(REACT_APP_API_URL + "register", {
        firstName: firstName,
        lastName: lastName,
        email: username,
        password: password
    }).then(handleResponse).then(
        res => {
            console.log(res)
            if (res) {
                currUserSubject.next(res.jwt);
                AsyncStorage.setItem('token', res.jwt);
                return res.jwt;
            }
            return null;
        }
    )
}

function logout() {
    // remove user from the cache
    AsyncStorage.removeItem('token');
    currUserSubject.next(null);
}