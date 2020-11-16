export interface ITicket {
 _id: string,
  column: string,
  description: string,
  handleOnDragStart: (e) => void,
  ticketName: string,
  updatedAt: string,
  createdAt: string,
  saveTicket: Function,
  deleteTicket: Function
}