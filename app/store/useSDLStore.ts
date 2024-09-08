import { IntrospectionQuery } from 'graphql/utilities/getIntrospectionQuery';
import { create } from 'zustand';

type SDLStore = {
  documentationSDL: string | null;
  introspectionQuery: IntrospectionQuery | null;
  addDocumentationSDL: (data: string) => void;
  addIntrospectionQuery: (data: IntrospectionQuery) => void;
};

export const useSDLStore = create<SDLStore>()((set) => ({
  documentationSDL: null,
  introspectionQuery: null,
  addDocumentationSDL: (data: string) => {
    set({ documentationSDL: data });
  },
  addIntrospectionQuery: (data: IntrospectionQuery) => {
    set({ introspectionQuery: data });
  }
}));
