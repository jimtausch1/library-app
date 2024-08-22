import { useAppSelector } from '@/lib/hooks';
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

export function useCurrentLoansCount() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
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