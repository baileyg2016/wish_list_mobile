import axios from 'axios';
import FetchFromStorage from './FetchFromStorage';

const { getAccessToken } = FetchFromStorage;

const FetchUserData = (() => {
    const _getWishList = () => {
        return axios.get(process.env.REACT_APP_API_URL + "getItems", {
            headers: {
                Authorization: getAccessToken
            }
        }).then(res => {
            console.log("here")
            console.log(res);
        }).catch(err => console.log(err))
    }

    const _getFriends = () => {
        
    }

    return {
        getWishList: _getWishList,
        getFriends: _getFriends
    }
})();

export default FetchUserData;