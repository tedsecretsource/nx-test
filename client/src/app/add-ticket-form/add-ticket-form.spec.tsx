import { render, screen, act } from '@testing-library/react';
import fetch from 'jest-fetch-mock';
import AddTicketForm from './add-ticket-form';
import { Ticket, User } from '@acme/shared-models';

const users: User[] = [
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" },
  { "id": 3, "name": "Chris" },
  { "id": 4, "name": "Daisy" },
  { "id": 5, "name": "Ed" }
];

const tickets: Ticket[] = [
  { id: 1, description: 'Install a monitor arm', assigneeId: 1, completed: false },
  { id: 2, description: 'Move the desk to the new location', assigneeId: 2, completed: false },
  { id: 3, description: 'Install a new mouse', assigneeId: 3, completed: false },
];

beforeEach(() => {
  fetch.resetMocks();
});

describe('AddTicketForm', () => {
  it('should render successfully', () => {
    fetch
      .once(JSON.stringify(users));
    act(() => {
      render(<AddTicketForm users={users} tickets={tickets} setTickets={jest.fn()} />);
    });
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should display an issue field', () => {
    fetch
      .once(JSON.stringify(users));
    act(() => {
      render(<AddTicketForm users={users} tickets={tickets} setTickets={jest.fn()} />);
    });
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should display a submit button', () => {
    fetch
      .once(JSON.stringify(users));
    act(() => {
      render(<AddTicketForm users={users} tickets={tickets} setTickets={jest.fn()} />);
    });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
