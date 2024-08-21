import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { useUser } from '@auth0/nextjs-auth0/client';

export function useCurrentLoansCount(checkout: boolean) {
  const { user } = useUser();
  const isAuthenticated = user !== undefined;

  return useQuery({
    queryKey: ['currentLoansCount', { checkout, isAuthenticated }],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<[string, {
      checkout: boolean,
      isAuthenticated: boolean,
    }]>) => {
      const [_key, { checkout, isAuthenticated }] = queryKey;

      if (isAuthenticated) {
        const shelfCurrentLoansResponse = await fetch(
          `/api/secure/current-loancount`
        );
        if (!shelfCurrentLoansResponse.ok) {
          throw new Error('Something went wrong!');
        }
        const shelfCurrentLoansResponseJson =
          await shelfCurrentLoansResponse.json();

        return shelfCurrentLoansResponseJson;
      }
    }
  });
}