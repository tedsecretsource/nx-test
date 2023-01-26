import { Ticket, User } from '@acme/shared-models';
import { Link } from 'react-router-dom';
import styles from './tickets.module.css';
import AddTicketForm from '../add-ticket-form/add-ticket-form';

export interface TicketsProps {
  tickets: Ticket[];
  users: User[];
  setTickets: (tickets: Ticket[]) => void;
}

export function Tickets(props: TicketsProps) {

  const toggleTicketStatus = (ticket: Ticket, event: React.MouseEvent<HTMLElement>) => {
    const METHOD = ticket.completed ? 'DELETE' : 'PUT';
    fetch(`/api/tickets/${ticket.id}/complete`, {
      method: METHOD,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: !ticket.completed })
    })
    .then((response) => {
      if ( 204 === response.status ) {
        const newTickets: Ticket[] = props.tickets.map((t) => {
          if (t.id === ticket.id) {
            t.completed = !t.completed
          }
          return t;
        });
        props.setTickets(newTickets);
      } else {
        throw new Error('Something went wrong');
      }
    });
  };

  const getUsernameFromId = (id: number | null) => {
    const user = props.users.find((u) => u.id === id);
    return user ? user.name : 'Unassigned';
  };

  return (
    <div className={styles['tickets']}>
      <AddTicketForm users={props.users} tickets={props.tickets} setTickets={props.setTickets} />
      <h2 className="border-b-2 border-black mb-4">Tickets</h2>
      {props.tickets ? (
        <ul className="list-none">
          {props.tickets.map((t) => (
            <li key={t.id} className="flex justify-between gap-2">
              <span className="justify-self-start" onClick={(e) => toggleTicketStatus(t, e)}>{t.completed ? '✅' : '⭕️'}</span>
              <Link className="grow self-start" to={`/tickets/${t.id}`}>{t.description}</Link>
              <Link className="" to={`/users/${t.assigneeId}`}>{getUsernameFromId(t.assigneeId)}</Link>
              <Link to={`/tickets/${t.id}/assign`} className="">Edit</Link>
            </li>
          ))}
        </ul>
      ) : (
        <span>...</span>
      )}
    </div>
  );
}

export default Tickets;
