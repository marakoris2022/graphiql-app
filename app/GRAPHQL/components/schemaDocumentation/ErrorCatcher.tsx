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

/* if (fetchError) {
    
    content = (
      <div className="graphiql-doc-explorer-error">Error fetching schema</div>
    );
  } else if (validationErrors.length > 0) {
    content = (
      <div className="graphiql-doc-explorer-error">
        Schema is invalid: {validationErrors[0].message}
      </div>
    );
  } else if (isFetching) { */
// Schema is undefined when it is being loaded via introspection.
/*  content = <Spinner />;
  } else if (!schema) { */
// Schema is null when it explicitly does not exist, typically due to
// an error during introspection.
/*    content = (
      <div className="graphiql-doc-explorer-error">
        No GraphQL schema available
      </div>
    );  }); */
