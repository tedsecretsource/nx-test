import { Ticket, User } from '@acme/shared-models';
import { Link } from 'react-router-dom';
import styles from './tickets.module.css';
import AddTicketForm from '../add-ticket-form/add-ticket-form';
import { useState } from 'react';

export interface TicketsProps {
  tickets: Ticket[];
  users: User[];
  setTickets: (tickets: Ticket[]) => void;
}

export function Tickets(props: TicketsProps) {
  const [filteredTickets, setFilteredTickets] = useState(props.tickets);
  const [filter, setFilter] = useState('');

  const toggleTicketStatus = (ticket: Ticket, event: React.MouseEvent<HTMLElement>) => {
    const originalIcon = event.currentTarget.innerHTML;
    event.currentTarget.innerHTML = '⏳';
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
        event.currentTarget.innerHTML = originalIcon;
        throw new Error('Something went wrong');
      }
    });
  };

  const getUsernameFromId = (id: number | null) => {
    const user = props.users.find((u) => u.id === id);
    return user ? user.name : 'Unassigned';
  };

  const filterTickets = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredTickets = props.tickets.filter((t) => t.description.toLowerCase().includes(e.target.value));
    setFilteredTickets(filteredTickets);
    setFilter(e.target.value);
  };

  const ticketsRenderer = () => {
    let ticketsArray = []
    if (filteredTickets.length === 0 && filter === '') {
      ticketsArray = props.tickets;
    } else {
      ticketsArray = filteredTickets;
    }
    
    return ticketsArray.map((t) => (
      <li key={t.id} className="flex justify-between gap-2">
        <span className="justify-self-start" onClick={(e) => toggleTicketStatus(t, e)}>{t.completed ? '✅' : '⭕️'}</span>
        <Link className="grow self-start" to={`/tickets/${t.id}`}>{t.description}</Link>
        <Link className="" to={`/users/${t.assigneeId}`}>{getUsernameFromId(t.assigneeId)}</Link>
        <Link to={`/tickets/${t.id}/assign`} className="">Assign</Link>
      </li>
    ));
  };

  return (
    <div className={styles['tickets']}>
      <AddTicketForm users={props.users} tickets={props.tickets} setTickets={props.setTickets} />
      <h2 className="border-b-2 border-black mb-4">Tickets</h2>

      <form className="" data-testid="filter-tickets-form">
        <label htmlFor="filter"><span role="img" aria-label="filter">🔍</span></label>
        <input className="border-2 m-2" id="filter" name="filter" onChange={filterTickets} autoComplete="off" />
      </form>

      {filteredTickets ? (
        <ul className="list-none">
          {ticketsRenderer()}
        </ul>
      ) : (
        <span>...</span>
      )}
    </div>
  );
}

export default Tickets;
