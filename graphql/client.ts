import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import FetchFromStorage from '../_services/FetchFromStorage'
const { getAccessToken } = FetchFromStorage;

export let graphqlClient: ApolloClient<NormalizedCacheObject>;

export const clientPromise = async () => {
    const token = await getAccessToken();
    console.log(token)
    graphqlClient = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        cache: new InMemoryCache()
    });
    return graphqlClient;
}