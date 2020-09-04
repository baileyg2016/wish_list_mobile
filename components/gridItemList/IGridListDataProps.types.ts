export enum IGridContexts {
    Home,
    Friends
}

export interface IGridListItem {
    id: number, 
    pk: number, 
    src: string, 
    name: string,
    cost?: string,
    url?: string
}

export interface IGridListDataProps {
    data: Array<IGridListItem>,
    onPress: (item: IGridListItem) => void,
    refetch: () => void,
}