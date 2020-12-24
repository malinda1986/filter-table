export type DataBody = {
    bankName: string,
    bankBIC: Array<string>,
    reportScore: number,
    type: string
  }
  
export type Data = {
    uuid: string,
    body: DataBody
    createdAt: string,
    publishedAt: string,
}

export type Filter = {
    bankName: string,
    bankBIC: string,
    minRange: number,
    maxRange: number,
    status: string,
    type: Array<string>,
    page: number,
    size: number,
    sortField: string,
    sortOrder: string
}

export type Report = {
    id: string,
    bankName: string,
    createdAt: string,
    publishedAt: string,
    bankBIC: string,
    reportScore: number,
    type: string
}

export type Paginate = {
    records: Array<Report>,
    pages: number,
    total: number,
    current: number,
    next: number,
}