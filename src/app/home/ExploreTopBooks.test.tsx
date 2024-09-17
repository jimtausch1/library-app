import StoreProvider from '@/app/StoreProvider';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ExploreTopBooks from './ExploreTopBooks';

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

describe('Explore Top Books', () => {
  it('should have Explore top books link when authenticated', async () => {
    const mockParam = { ...mockAuth0, user: auth0User };
    (useUser as jest.Mock).mockImplementation(() => mockParam);
    render(
      <StoreProvider>
        <UserProvider>
          <ExploreTopBooks />
        </UserProvider>
      </StoreProvider>
    ); // Arrange

    const element = await screen.findByText('Explore top books'); // Act
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(element).toBeInTheDocument(); // Assert
  });

  it('should have Explore top books link when unauthenticated', async () => {
    (useUser as jest.Mock).mockImplementation(() => mockAuth0);
    render(
      <StoreProvider>
        <UserProvider>
          <ExploreTopBooks />
        </UserProvider>
      </StoreProvider>
    ); // Arrange

    const element = await screen.findByText('Explore top books'); // Act
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(element).toBeInTheDocument(); // Assert
  });
});
