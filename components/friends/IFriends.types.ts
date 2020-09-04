import { IGridListItem } from "../gridItemList/IGridListDataProps.types";

export interface IFriendsDataProps {
    friends: Array<IFriend>;
    onFriendPress: (item: IGridListItem) => void;
    refetch: () => void;
    onAddFriendPress: () => void;
}

export interface IFriend {
    pkUser: number, 
    firstName: string, 
    lastName: string, 
    image_path: string
}