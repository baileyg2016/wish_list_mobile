import { useQuery } from '@apollo/react-hooks';
import { GET_ITEMS, FRIENDS } from '../graphql/queries';

const FetchUserData = (() => {
    const _getWishList = async () => {
        const { data, loading, error } = useQuery(GET_ITEMS);

        if (error) {
            console.error(error);
        } else {
            return { data, loading, error };
        }
    }

    const _getFriends = async () => {
        const { data, loading, error } = useQuery(FRIENDS);

        if (error) {
            console.error(error);
        } else {
            return { data, loading, error };
        }
    }

    return {
        getWishList: _getWishList,
        getFriends: _getFriends
    }
})();

export default FetchUserData;