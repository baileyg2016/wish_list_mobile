export interface IItem {
    pkItem: number,
    name: string,
    url: string,
    imageURL: string
    cost: number,
    size: string
}

export interface IHomeDataProps {
    items: Array<IItem>
}