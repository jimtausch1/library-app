import Navbar from '@/components/navbar/Navbar';
import { renderWithStore } from '@/lib/utils';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import Heros from './Heros';

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

describe('Heros', () => {
  it('should have Explore top books link when authenticated', async () => {
    const mockParam = { ...mockAuth0, user: auth0User };
    (useUser as jest.Mock).mockImplementation(() => mockParam);
    renderWithStore(
      <UserProvider>
        <Navbar></Navbar>
        <Heros />
      </UserProvider>
    ); // Arrange

    const elements = await screen.findAllByText('Explore top books'); // Act
    expect(screen.getAllByRole('link')).toHaveLength(8);
    expect(elements).toHaveLength(2); // Assert
  });

  it('should have Explore top books link when unauthenticated', async () => {
    (useUser as jest.Mock).mockImplementation(() => mockAuth0);
    renderWithStore(
      <UserProvider>
        <Navbar></Navbar>
        <Heros />
      </UserProvider>
    ); // Arrange

    const elements = await screen.findAllByText('Sign up'); // Act
    expect(screen.getAllByRole('link')).toHaveLength(6);
    expect(elements.length).toBe(2); // Assert
  });
});
