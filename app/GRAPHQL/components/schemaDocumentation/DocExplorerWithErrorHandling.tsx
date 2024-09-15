'use client';
import { useSDLStore } from '@/app/store/useSDLStore';
import { DocExplorer, useSchemaContext } from '@graphiql/react';
import { useEffect } from 'react';

const DocExplorerWithErrorHandling = () => {
  const { fetchError, isFetching, schema, validationErrors } = useSchemaContext(
    { nonNull: true }
  );
  const isOpenExplorer = useSDLStore((state) => state.isOpenExplorer);
  useEffect(() => {
    if (fetchError) {
      isOpenExplorer(false);
    }
    if (schema) {
      isOpenExplorer(true);
    }
  }, [schema, fetchError, isOpenExplorer]);

  return <DocExplorer />;
};

export default DocExplorerWithErrorHandling;
