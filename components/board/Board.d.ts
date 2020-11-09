import { ITicket } from '../ticket/Ticket.d';

export interface IBoardProps {
  data: {
    boardName: string,
    columns: Array<IColumn>,
    createdAt: string,
    updatedAt: string
  }
}

export interface IColumn {
  _id: string,
  board: string,
  columnName: string,
  tickets: Array<ITicket>,
  createdAt: string,
  updatedAt: string
}