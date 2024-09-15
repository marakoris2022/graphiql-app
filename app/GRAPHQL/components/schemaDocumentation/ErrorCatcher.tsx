'use client';

import { FC } from 'react';
import { useSchemaContext } from '@graphiql/react';
import { useSDLStore } from '@/app/store/useSDLStore';

type ErrorCatcherProps = {};

const ErrorCatcher: FC<ErrorCatcherProps> = ({}) => {
  const { fetchError, isFetching, schema, validationErrors } = useSchemaContext(
    { nonNull: true }
  );

  const isOpenExplorer = useSDLStore((state) => state.isOpenExplorer);
  if (fetchError || !schema) {
    isOpenExplorer(false);
  }
  if (schema) {
    isOpenExplorer(true);
  }
  return null;
};

export default ErrorCatcher;
