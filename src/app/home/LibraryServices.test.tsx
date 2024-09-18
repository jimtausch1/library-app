import Navbar from '@/components/navbar/Navbar';
import { renderWithStore } from '@/lib/utils';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import LibraryServices from './LibraryServices';

jest.mock('@auth0/nextjs-auth0/client', () => {
  const originalModule = jest.requireActual('@auth0/nextjs-auth0/client');

  return {
    __esModule: true,
    ...originalModule,
    useUser: jest.fn(),
  };
});

// mock user info
const auth0User = {
  nickname: 'marydoe',
  name: 'marydoe@gmail.com',
  email: 'marydoe@gmail.com',
};

const mockAuth0 = {
  isLoading: false,
  user: undefined,
  error: undefined,
};

describe('LibraryServices', () => {
  it('should have Library Services link when authenticated', async () => {
    const mockParam = { ...mockAuth0, user: auth0User };
    (useUser as jest.Mock).mockImplementation(() => mockParam);
    renderWithStore(
      <UserProvider>
        <Navbar></Navbar>
        <LibraryServices />
      </UserProvider>
    ); // Arrange

    const element = await screen.findByText('Library Services'); // Act
    expect(screen.getAllByRole('link')).toHaveLength(7);
    expect(element).toBeInTheDocument(); // Assert
  });

  it('should have Sign up link when unauthenticated', async () => {
    (useUser as jest.Mock).mockImplementation(() => mockAuth0);
    renderWithStore(
      <UserProvider>
        <Navbar></Navbar>
        <LibraryServices />
      </UserProvider>
    ); // Arrange

    const element = await screen.findByText('Sign up'); // Act
    expect(screen.getAllByRole('link')).toHaveLength(5);
    expect(element).toBeInTheDocument(); // Assert
  });
});
