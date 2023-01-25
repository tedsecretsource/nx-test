import { render } from '@testing-library/react';
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
    const { baseElement } = render(<BrowserRouter><Tickets tickets={tickets} users={users} /></BrowserRouter>);
    expect(baseElement).toBeTruthy();
  });
});
