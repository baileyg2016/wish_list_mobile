import AsyncStorage from '@react-native-community/async-storage';

const FetchFromStorage = (() => {
    var _service;

    const _getService = () => {
        if(!_service) {
            _service = this;
            return _service
        }
        return _service
    }

    const _setToken = async (access_token = "", refresh_token = "") => {
        await AsyncStorage.setItem(`access_token`, access_token);
        await AsyncStorage.setItem(`refresh_token`, refresh_token);
    }

    const  _getAccessToken = async () => {
        const token = await AsyncStorage.getItem(`access_token`);
        return token;
    }

    const _getRefreshToken = async () => {
        return await AsyncStorage.getItem(`refresh_token`);
    }

    const _clearToken = async () => {
        await AsyncStorage.removeItem(`access_token`);
        await AsyncStorage.removeItem(`refresh_token`);
    }

    const _setName = async (first = "", last = "") => {
        await AsyncStorage.setItem(`first_name`, first);
        await AsyncStorage.setItem(`last_name`, last);
    }

    const _getFirstName = async () => {
        return await AsyncStorage.getItem(`firstName`);
    }

    const _getLastName = async () => {
        return await AsyncStorage.getItem(`lastName`);
    }

    const _setProfilePic = async (profilePic) => {
        await AsyncStorage.setItem(`profile_pic`, profilePic)
    }

    // const  _getProfilePic = async () => {
    //     return await require(AsyncStorage.getItem(`profile_pic`));
    // }

    return {
        getService : _getService,
        setToken : _setToken,
        getAccessToken : _getAccessToken,
        getRefreshToken : _getRefreshToken,
        clearToken : _clearToken,
        setName : _setName,
        getFirstName : _getFirstName,
        getLastName : _getLastName,
        setProfilePic : _setProfilePic,
        // getProfilePic : _getProfilePic
    }
})();

export default FetchFromStorage;