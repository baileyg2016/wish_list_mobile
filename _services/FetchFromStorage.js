import { AsyncStorage } from '@react-native-community/async-storage';

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
        return await AsyncStorage.getItem(`access_token`);
    }

    const _getRefreshToken = async () => {
        return await AsyncStorage.getItem(`refresh_token`);
    }

    const _clearToken = async () => {
        await AsyncStorage.removeItem(`access_token`);
        await getAsyncStorage.removeItem(`refresh_token`);
    }

    return {
        getService : _getService,
        setToken : _setToken,
        getAccessToken : _getAccessToken,
        getRefreshToken : _getRefreshToken,
        clearToken : _clearToken
    }
})();

export default FetchFromStorage;