'use client';
import { useSDLStore } from '@/app/store/useSDLStore';
import { DocExplorer, useSchemaContext } from '@graphiql/react';
import { useEffect } from 'react';

const DocExplorerWithErrorHandling = () => {
  const { fetchError, isFetching, schema, validationErrors } = useSchemaContext({ nonNull: true });
  const isOpenExplorer = useSDLStore((state) => state.isOpenExplorer);

  console.log('DocExplorerWithErrorHandling');

  useEffect(() => {
    if (fetchError) {
      console.log('fetchError');
      isOpenExplorer(false);
    }
    if (schema) {
      console.log('schema');
      isOpenExplorer(true);
    }
  }, [schema, fetchError, isOpenExplorer]);

  return <DocExplorer />;
};

export default DocExplorerWithErrorHandling;
