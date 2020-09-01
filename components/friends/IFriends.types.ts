
export interface IFriendsDataProps {
    friends: Array<IFriend>
}

export interface IFriend {
    pkUser: number, 
    firstName: string, 
    lastName: string, 
    image_path: string
}