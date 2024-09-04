import { create } from 'zustand';
import { GraphQLSchema } from 'graphql';

type SDLStore = {
  documentationSDL: GraphQLSchema | null;
  addDocumentationSDL: (data: GraphQLSchema) => void;
};

export const useSDLStore = create<SDLStore>()((set) => ({
  documentationSDL: null,
  addDocumentationSDL: (data: GraphQLSchema) => {
    set({ documentationSDL: data });
  }
}));
