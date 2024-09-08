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

/* import { GraphiQLProvider } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import '@graphiql/react/dist/style.css';
import DocExplorerWithErrorHandling from './DocExplorerWithErrorHandling';

const SchemaDocumentation = ({ valueSDL }: { valueSDL: string }) => {
  const fetcher = createGraphiQLFetcher({
    url: valueSDL,
  });


  return (
    <GraphiQLProvider fetcher={fetcher}>
      <div className="graphiql-container">
        <DocExplorerWithErrorHandling />
      </div>
    </GraphiQLProvider>
  );
};

export default SchemaDocumentation; */
