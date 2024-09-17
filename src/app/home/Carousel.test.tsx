import StoreProvider from '@/app/StoreProvider';
import QueryProvider from '@/context/QueryProvider';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Carousel from './Carousel';

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

describe('Carousel', () => {
  it('should have links when authenticated', async () => {
    const mockParam = { ...mockAuth0, user: auth0User };
    (useUser as jest.Mock).mockImplementation(() => mockParam);
    render(
      <StoreProvider>
        <UserProvider>
          <QueryProvider>
            <Carousel />
          </QueryProvider>
        </UserProvider>
      </StoreProvider>
    ); // Arrange

    const links = await screen.findAllByRole('link'); // Act
    expect(links).toHaveLength(11); // Assert
    expect(links[0]).toHaveTextContent('Reserve');
  });
});
