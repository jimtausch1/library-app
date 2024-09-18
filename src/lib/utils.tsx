import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
// As a basic setup, import your same slice reducers
import { makeStore } from './store';

export function renderWithStore(
  ui: any,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = makeStore(),
    // store = configureStore({
    //   reducer: { auth: AuthSlice.reducer, },
    //   preloadedState,
    // }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
