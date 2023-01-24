import { Ticket } from '@acme/shared-models';
import { Link } from 'react-router-dom';
import styles from './tickets.module.css';

export interface TicketsProps {
  tickets: Ticket[];
}

export function Tickets(props: TicketsProps) {
  return (
    <div className={styles['tickets']}>
      <h2 className="border-b-2 border-black mb-4">Tickets</h2>
      {props.tickets ? (
        <ul className="list-none">
          {props.tickets.map((t) => (
            <li key={t.id} className="flex justify-between gap-2">
              <span className="justify-self-start">{t.completed ? '✅' : '⭕️'}</span>
              <Link className="grow self-start" to={`/tickets/${t.id}`}>{t.description}</Link>
              <Link className="" to={`/users/${t.assigneeId}`}>{t.assigneeId}</Link>
              <span className="">Edit | Delete</span>
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
