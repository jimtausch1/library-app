import Navbar from '@/components/navbar/Navbar';
import { renderWithStore } from '@/lib/utils';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

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

describe('Navbar', () => {
  it('should have Logout link when authenticated', async () => {
    const mockParam = { ...mockAuth0, user: auth0User };
    (useUser as jest.Mock).mockImplementation(() => mockParam);
    renderWithStore(
      <UserProvider>
        <Navbar />
      </UserProvider>
    ); // Arrange

    const element = await screen.findByText('Logout'); // Act
    expect(screen.getAllByRole('link')).toHaveLength(6);
    expect(element).toBeInTheDocument(); // Assert
  });

  it('should have Sign in link when unauthenticated', async () => {
    (useUser as jest.Mock).mockImplementation(() => mockAuth0);
    renderWithStore(
      <UserProvider>
        <Navbar />
      </UserProvider>
    ); // Arrange

    expect(screen.getAllByRole('link')).toHaveLength(4);
    const element = await screen.findByText('Sign in'); // Act
    expect(element).toBeInTheDocument(); // Assert
  });

  it('should have login error when error', async () => {
    const mockParam = {
      ...mockAuth0,
      error: {
        message: 'login error',
      },
    };
    (useUser as jest.Mock).mockImplementation(() => mockParam);
    renderWithStore(
      <UserProvider>
        <Navbar />
      </UserProvider>
    ); // Arrange

    const element = await screen.findByText('login error'); // Act
    expect(element).toBeInTheDocument(); // Assert
  });

  it('should have spinner when loading', async () => {
    const mockParam = { ...mockAuth0, isLoading: true };
    (useUser as jest.Mock).mockImplementation(() => mockParam);
    renderWithStore(
      <UserProvider>
        <Navbar />
      </UserProvider>
    ); // Arrange

    const element = await screen.findByText('Loading...'); // Act
    expect(element).toBeInTheDocument(); // Assert
  });
});
