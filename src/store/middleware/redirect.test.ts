import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import browserHistory from '../../browser-history';
import { AnyAction } from '@reduxjs/toolkit';
import { redirectToRoute } from '../action';
import { State } from '../../types/state';
import { AppRoute } from '../../consts';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/" with redirect-to-route action', () => {
    const redirectAction = redirectToRoute(AppRoute.Root);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Root);
  });

  it('should not redirect to "/" with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.Root };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Root);
  });
});
