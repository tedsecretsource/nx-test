import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import fetch from 'jest-fetch-mock';
import TicketDetails from './ticket-details';

beforeEach(() => {
  fetch.resetMocks();
});

describe('TicketDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BrowserRouter><TicketDetails /></BrowserRouter>);
    expect(baseElement).toBeTruthy();
  });

  it('should display the name and status', async () => {
    // add a ticket to the store
    const ticketDetails = {
      "id": 1,
      "description": "Install a monitor arm",
      "assigneeId": 1,
      "completed": false
    };

    const userDetails = {
      "id": 1,
      "name": "Alice"
    };

    fetch
      .once(JSON.stringify(ticketDetails))
      .once(JSON.stringify(userDetails));
    
    const { getByText } = render(<BrowserRouter><TicketDetails /></BrowserRouter>);
    await waitFor(() => {
      expect(getByText('Install a monitor arm')).toBeTruthy();
      expect(getByText('Asignee: Alice')).toBeTruthy();
    });
  })
});

