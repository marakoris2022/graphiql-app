import { GraphiQLProvider, DocExplorer } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import '@graphiql/react/dist/style.css';

const SchemaDocumentation = ({ valueSDL }: { valueSDL: string }) => {
  const fetcher = createGraphiQLFetcher({
    url: valueSDL,
  });

  return (
    <GraphiQLProvider fetcher={fetcher}>
      <div className="graphiql-container">
        <DocExplorer />
      </div>
    </GraphiQLProvider>
  );
};

export default SchemaDocumentation;
/* const { fetchError, isFetching, schema, validationErrors } = useSchemaContext(
    { nonNull: true },
  );
if (fetchError) {
    content = (
      <div className="graphiql-doc-explorer-error">Error fetching schema</div>
    );
  } else if (validationErrors.length > 0) {
    content = (
      <div className="graphiql-doc-explorer-error">
        Schema is invalid: {validationErrors[0].message}
      </div>
    );
  } else if (isFetching) {
    // Schema is undefined when it is being loaded via introspection.
    content = <Spinner />;
  } else if (!schema) {
    // Schema is null when it explicitly does not exist, typically due to
    // an error during introspection.
    content = (
      <div className="graphiql-doc-explorer-error">
        No GraphQL schema available
      </div>
    );  });  */
