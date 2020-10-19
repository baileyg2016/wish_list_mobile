import { IGridListItem } from "../gridItemList/IGridListDataProps.types";

export interface IFriendsDataProps {
    friends: Array<IFriend>,
    onFriendPress: (pkFriend: IGridListItem) => void,
    refetch: () => void,
    onAddNewFriend: () => void,
}

export interface IFriend {
    pkUser: number, 
    firstName: string, 
    lastName: string, 
    image_path: string
}

export interface IFriendsWishListDataProps {
    
}