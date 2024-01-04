import {create} from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware"
import { scrollDirections } from "./hooks/useScrolled";
import type { scrollDirection } from "./hooks/useScrolled";

export type Tthemes = "Light" | "Dark";

export interface StoreState {
skip_intro: boolean;
  theme: Tthemes;
  scrollDirection: scrollDirection;
  doSkipIntro: () => void;
  switchTheme: (theme: Tthemes) => void;
  setScrollDirection: (direction: scrollDirection) => void;
}

export const useStore = create<StoreState>()(
  persist<StoreState>(
    (set, get) => ({
      skip_intro: false,
      theme: "Light",
      scrollDirection: scrollDirections.NONE,
      doSkipIntro: () => set({ skip_intro: true }),
      switchTheme: (theme) => set({ theme }),
      setScrollDirection: (direction) => set({ scrollDirection: direction }),
    }),
    {
      name: "dimas-storage", // name of item in the storage (must be unique)
      // getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);