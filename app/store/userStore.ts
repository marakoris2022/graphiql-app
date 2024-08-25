import { User } from "firebase/auth";
import { create } from "zustand";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
  loadingUser: boolean;
  setLoadingUser: (loading: boolean) => void;
  isFirstAuthCheck: boolean;
  setIsFirstAuthCheck: (isUserFirstAuthCheck: boolean) => void;
}

const useUserStore = create<UserState>()((set) => ({
  user: null,
  loadingUser: true,
  setUser: (user: User) => set(() => ({ user })),
  removeUser: () => set({ user: null }),
  setLoadingUser: (loadingUser: boolean) => set({ loadingUser }),
  isFirstAuthCheck: false,
  setIsFirstAuthCheck: (isFirstAuthCheck: boolean) => set({ isFirstAuthCheck }),
}));

export default useUserStore;
