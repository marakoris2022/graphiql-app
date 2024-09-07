import { GraphiQLProvider, DocExplorer, QueryEditor } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import '@graphiql/react/dist/style.css';
import styles from './schema.module.css';

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
