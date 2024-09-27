import { MMKV } from 'react-native-mmkv';
import superjson from 'superjson';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PersistStorage } from 'zustand/middleware';
import { SpaceStateType, SpaceStoreType, WithSelectors } from '../type';

const storage = new MMKV({
  id: 'space-store',
  encryptionKey: 'space-store-encryption-key',
});

const zustandStorage: PersistStorage<SpaceStateType> = {
  getItem: (name) => {
    const state = storage.getString(name);
    if (!state) {
      return null;
    }
    return superjson.parse(state);
  },
  setItem: (name, value) => {
    return storage.set(name, superjson.stringify(value));
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

const initialState: SpaceStateType = {
  workspaces: [],
  selectedWorkspace: null,
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const useSpaceStoreBase = create<SpaceStoreType>()(
  persist(
    (set) => ({
      ...initialState,
      setWorkspaces: (workspaces) => set({ workspaces }),
      setSelectedWorkspace: (selectedWorkspace) => set({ selectedWorkspace }),
      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      resetStore: () => set(initialState),
    }),
    {
      name: 'space-store',
      storage: zustandStorage,
    }
  )
);

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

/**
 * A hook to access the Space store.
 * @returns The Space store.
 */
export const useSpaceStore = createSelectors(useSpaceStoreBase);
