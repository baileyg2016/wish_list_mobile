import axios from 'axios';
import FetchFromStorage from './FetchFromStorage';
import { REACT_APP_API_URL } from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';

const { getAccessToken } = FetchFromStorage;

const FetchUserData = (() => {
    const _getWishList = async () => {
        let token = await getAccessToken();
        return axios.get(REACT_APP_API_URL + "getItems", {
            headers: {
                Authorization: token
            }
        }).then(res => {
            console.log(res);
            return res.data.items;
        }).catch(err => console.log(err))
    }

    const _getFriends = async () => {
        let token = await getAccessToken();
        return axios.get(REACT_APP_API_URL + "getItems", {
            headers: {
                Authorization: token
            }
        }).then(res => {
            console.log(res);
            return res.data.items;
        }).catch(err => console.log(err))
    }

    return {
        getWishList: _getWishList,
        getFriends: _getFriends
    }
})();

export default FetchUserData;