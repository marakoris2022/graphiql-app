import { decodeBase64, encodeBase64 } from '@/app/[...rest]/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { FC, FocusEvent, useEffect, useState } from 'react';
import styles from './querySection.module.css';

type QuerySectionProps = {
  variables: string;
};

const QuerySection: FC<QuerySectionProps> = ({ variables }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();

  const [value, setValue] = useState<string>(() => {
    const pathArray = pathname.split('/');
    const query = pathArray[3];
    const decodedQuery = query ? JSON.parse(decodeURIComponent(decodeBase64(query))).query : '';
    return decodedQuery;
  });

  function handleQueryFocusOut(e: FocusEvent<HTMLTextAreaElement>) {
    const queryStr = e.target.value;
    let pathArray = pathname.split('/');
    if (queryStr) {
      if (!pathArray[2]) {
        pathArray[2] = '';
      }
      pathArray[3] = encodeBase64(
        encodeURIComponent(JSON.stringify({ query: queryStr, variables })),
      );
      let newPath = pathArray.join('/');
      if (searchParams) {
        newPath = newPath + `?${searchParams}`;
      }

      history.replaceState(null, '', newPath);
    } else {
      if (pathArray.length > 3) {
        pathArray = pathArray.slice(0, -1);
      }
      let newPath = pathArray.join('/');
      if (searchParams) {
        newPath = newPath + `?${searchParams}`;
      }
      history.replaceState(null, '', newPath);
    }
  }

  return (
    <fieldset>
      <legend>Query</legend>
      <textarea
        className={styles.queryArea}
        name="query"
        id="query"
        placeholder="Query..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleQueryFocusOut}
      ></textarea>
    </fieldset>
  );
};

export default QuerySection;
