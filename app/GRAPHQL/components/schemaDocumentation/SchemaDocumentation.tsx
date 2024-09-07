/* import { useSDLStore } from '@/app/store/useSDLStore';
import { IntrospectionQuery, GraphQLObjectType, GraphQLField } from 'graphql';
import { FC } from 'react';

const SchemaDocumentation: FC = () => {
  const introspectionQuery = useSDLStore((state) => state.introspectionQuery);

  const queryType = introspectionQuery?.__schema.queryType;
  const mutationType = introspectionQuery?.__schema.mutationType;
  const types = introspectionQuery?.__schema.types;

  const renderFields = (fields: GraphQLField<string, string | object>[]) => (
    <ul>
      {fields.map((field) => (
        <li key={field.name}>
          <strong>{field.name}</strong>: {field.type.name || field.type.kind}
          {field.args.length > 0 && (
            <ul>
              {field.args.map((arg) => (
                <li key={arg.name}>
                  <em>{arg.name}</em>: {arg.type.name || arg.type.kind}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );

  const renderType = (type: GraphQLObjectType) => (
    <div key={type.name}>
      <h3>{type.name}</h3>
      {type.description && <p>{type.description}</p>}
      {type.fields && renderFields(type.fields)}
    </div>
  );

  return (
    <div>
      <h3>Schema Documentation</h3>

      {queryType && (
        <div>
          <h3>Query Type: {queryType.name}</h3>
          {types
            .filter((t) => t.name === queryType.name)
            .map((type) => renderType(type as GraphQLObjectType))}
        </div>
      )}

    
      {mutationType && (
        <div>
          <h3>Mutation Type: {mutationType.name}</h3>
          {types
            .filter((t) => t.name === mutationType.name)
            .map((type) => renderType(type as GraphQLObjectType))}
        </div>
      )}

 
      <div>
        <h3>Types</h3>
        {types.map((type) => {
      
          if (
            type.kind === 'OBJECT' &&
            type.name !== queryType?.name &&
            type.name !== mutationType?.name
          ) {
            return renderType(type as GraphQLObjectType);
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default SchemaDocumentation;
 */

import { GraphiQLProvider, DocExplorer, QueryEditor } from '@graphiql/react';
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
