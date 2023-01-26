import { render, screen, waitFor, act } from '@testing-library/react';
import AssignTicket from './assign-ticket';
import fetch from 'jest-fetch-mock';
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

describe('AssignTicket', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AssignTicket users={users} tickets={tickets} />);
    expect(baseElement).toBeTruthy();
  });

  it('should display an assignee dropdown', async () => {
    fetch
      .once(JSON.stringify(users));
    act(() => {
      render(<AssignTicket users={users} tickets={tickets} />);
    });
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

});
