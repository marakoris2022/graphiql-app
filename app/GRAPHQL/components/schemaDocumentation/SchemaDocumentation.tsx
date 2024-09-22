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
