import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tickets from './tickets';
import { BrowserRouter } from 'react-router-dom';
import fetch from 'jest-fetch-mock';

const tickets = [
  { id: 1, description: 'Install a monitor arm', assigneeId: 1, completed: false },
  { id: 2, description: 'Move the desk to the new location', assigneeId: 2, completed: false },
  { id: 3, description: 'Install a new mouse', assigneeId: 3, completed: false },
];

const users = [
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" },
  { "id": 3, "name": "Chris" },
  { "id": 4, "name": "Daisy" },
  { "id": 5, "name": "Ed" }
];

beforeEach(() => {
  fetch.resetMocks();
});


describe('Tickets', () => {
  it('should render successfully', () => {
    fetch
      .once(JSON.stringify(tickets));
    const { baseElement } = render(<BrowserRouter><Tickets tickets={tickets} users={users} setTickets={jest.fn()} /></BrowserRouter>);
    expect(baseElement).toBeTruthy();
  });
});

describe('FilterTickets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BrowserRouter><Tickets tickets={tickets} users={users} setTickets={jest.fn()} /></BrowserRouter>);
    expect(baseElement).toBeTruthy();
  });

  it('should render a form', () => {
    const { getByTestId } = render(<BrowserRouter><Tickets tickets={tickets} users={users} setTickets={jest.fn()} /></BrowserRouter>);
    const form = getByTestId('filter-tickets-form');
    expect(form).toBeTruthy();
  });

  it('should render a description input', () => {
    const { getByLabelText } = render(<BrowserRouter><Tickets tickets={tickets} users={users} setTickets={jest.fn()} /></BrowserRouter>);
    const descriptionInput = getByLabelText('filter');
    expect(descriptionInput).toBeTruthy();
  });

  it('should reduce the number of tickets to those that contain the search query', async () => {
    const { getByLabelText, getByText, queryByText } = render(<BrowserRouter><Tickets tickets={tickets} users={users} setTickets={jest.fn()} /></BrowserRouter>);
    const descriptionInput = getByLabelText('filter');
    userEvent.type(descriptionInput, 'desk');
    await waitFor(() => {
      expect(getByText('Move the desk to the new location')).toBeTruthy();
      expect(queryByText('Install a monitor arm')).toBeNull();
      expect(queryByText('Install a new mouse')).toBeNull();
    });
  });
});
