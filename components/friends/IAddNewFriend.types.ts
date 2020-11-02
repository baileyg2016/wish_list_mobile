import { IFriend } from "./IFriends.types";

export interface IAddNewFriendsDataProps {
    addNewFriend: (friend: IFriend) => void;
}