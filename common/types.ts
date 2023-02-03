export interface IItem {
  id: string
  title: string
  description?: string
  price: number
  image: string
}

export interface IItemsGetRequest {
  query?: string
}

export interface IItemsGetResponse {
  items: IItem[]
}