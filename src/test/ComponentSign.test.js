import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ComponentSign from '../components/sign/ComponentSign';
import { MemoryRouter } from 'react-router-dom';

describe('ComponentSign', () => {
  it('renders the form fields', () => {
    const { getByPlaceholderText, getByLabelText } = render(<MemoryRouter><ComponentSign /></MemoryRouter>);
    
    expect(getByPlaceholderText('Firstname')).toBeInTheDocument();
    expect(getByPlaceholderText('Lastname')).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirm your password')).toBeInTheDocument();
    expect(getByLabelText('Pilote')).toBeInTheDocument();
    expect(getByLabelText('Passenger')).toBeInTheDocument();
  });

  it('validates the form submission', async () => {
    const { getByPlaceholderText, getByText, getByLabelText } = render(<MemoryRouter><ComponentSign /></MemoryRouter>);

    fireEvent.change(getByPlaceholderText('Firstname'), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText('Lastname'), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('Confirm your password'), { target: { value: 'password123' } });
    fireEvent.click(getByLabelText('Passenger'));
    
    fireEvent.submit(getByText('Validate'));

    await waitFor(() => {
      expect(localStorage.getItem('user')).not.toBeNull();
      expect(localStorage.getItem('token')).not.toBeNull();
    });
  });
});
