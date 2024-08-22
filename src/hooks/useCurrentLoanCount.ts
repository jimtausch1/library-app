import { useAppSelector } from '@/lib/hooks';
import { useUser } from '@auth0/nextjs-auth0/client';
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

export function useCurrentLoansCount() {
  const { user } = useUser();
  const isAuthenticated = user !== undefined;
  const isCheckedOut = useAppSelector((state) => state.checkedout.ischeckedout);

  return useQuery({
    queryKey: ['currentLoansCount', { isCheckedOut, isAuthenticated }],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<[string, {
      isCheckedOut: boolean,
      isAuthenticated: boolean,
    }]>) => {
      const [_key, { isCheckedOut, isAuthenticated }] = queryKey;

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