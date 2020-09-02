import { IGridListItem } from "../gridItemList/IGridListDataProps.types";

export interface IItem {
    pkItem: number,
    name: string,
    url: string,
    imageURL: string
    cost: number,
    size: string
}

export interface IHomeDataProps {
    items: Array<IItem>,
    onItemPress: (item: IGridListItem) => void,
    refetch: () => void,
}