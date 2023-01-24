import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { number } from 'yup';
import styles from './ticket-details.module.css';

interface TicketDetails {
  id: number;
  description: string;
  assigneeId: number;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
}

export function TicketDetails() {
  const params = useParams();
  const [ticket, setTicket] = useState<TicketDetails>();
  const [assignee, setAssignee] = useState<User>();

  useEffect(() => {
    async function fetchUser(id: number) {
      fetch(`/api/users/${id}`)
        .then(response => response.json())
        .then(data => {
          setAssignee(data);
        })
        .catch(error => console.log(error));
    }

    async function fetchTicket() {
      fetch(`/api/tickets/${params['id']}`)
        .then(response => response.json())
        .then(data => {
          setTicket(data);
          fetchUser(data.assigneeId);
        })
        .catch(error => console.log(error));
    }

    fetchTicket();
    console.log(ticket)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTicketDescription = (prop = '') => {
    if(undefined !== ticket) {
      switch(prop) {
        case 'description':
          return ticket.description;
        case 'assignee':
          return assignee ? assignee.name : 'Loading...';
        case 'completed':
          return ticket.completed ? '✅' : '⭕️';
        default:
          return 'Loading...';
      }
    } else {
      return 'Loading...';
    }
  }

  return (
    <div className={styles['container']}>
      <h2 className="border-b-2 border-black mb-4">{loadTicketDescription('description')}</h2>
      <ul className="list-none">
        <li>Completed: {loadTicketDescription('completed')}</li>
        <li>Asignee: {loadTicketDescription('assignee')}</li>
      </ul>
    </div>
  );
}

export default TicketDetails;
