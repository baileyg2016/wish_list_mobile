export interface IListInfo {
    pk: number,
    firstName: string,
    lastName: string,
    image_path: string,
    email: string,
}

export interface IListItemDataProps {
    item: IListInfo
}