import { ITicket } from '../ticket/Ticket.d';

export interface IBoardProps {
  data: {
    _id: string,
    boardName: string,
    columns: Array<IColumn>,
    createdAt: string,
    updatedAt: string
  },
  onChange: Function,
  setLoading: Function
}

export interface IColumn {
  _id: string,
  board: string,
  columnType: string,
  tickets: Array<ITicket>,
  createdAt: string,
  updatedAt: string
}