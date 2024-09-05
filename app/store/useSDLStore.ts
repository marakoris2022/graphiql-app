import { create } from 'zustand';
/* import { GraphQLSchema } from 'graphql'; */

type SDLStore = {
  documentationSDL: string | null;
  addDocumentationSDL: (data: string) => void;
};

export const useSDLStore = create<SDLStore>()((set) => ({
  documentationSDL: null,
  addDocumentationSDL: (data: string) => {
    set({ documentationSDL: data });
  }
}));
