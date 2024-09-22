import { encodeBase64 } from '@/app/[...rest]/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { FC, FocusEvent } from 'react';
import styles from './querySection.module.css';
import { useTranslations } from 'next-intl';

type QuerySectionProps = {
  variables: string;
  setQueryArea: (data: string) => void;
  queryArea: string;
};

const QuerySection: FC<QuerySectionProps> = ({
  variables,
  setQueryArea,
  queryArea,
}) => {
  const t = useTranslations('apiClient');

  const pathname = usePathname();
  const searchParams = useSearchParams().toString();

  function handleQueryFocusOut(e: FocusEvent<HTMLTextAreaElement>) {
    const queryStr = e.target.value;
    let pathArray = pathname.split('/');

    if (queryStr) {
      if (!pathArray[2]) {
        pathArray[2] = '';
      }
      pathArray[3] = encodeBase64(
        encodeURIComponent(JSON.stringify({ query: queryStr, variables }))
      );
    } else {
      if (pathArray.length > 3) {
        pathArray = pathArray.slice(0, -1);
      }
    }

    let newPath = pathArray.join('/');

    if (searchParams) {
      newPath = newPath + `?${searchParams}`;
    }

    history.replaceState(null, '', newPath);
  }

  return (
    <fieldset>
      <legend>{t('query')}</legend>
      <textarea
        className={styles.queryArea}
        name="query"
        id="query"
        placeholder={`${t('query')}...`}
        value={queryArea}
        onChange={(e) => {
          setQueryArea(e.target.value);
        }}
        onBlur={handleQueryFocusOut}
      ></textarea>
    </fieldset>
  );
};

export default QuerySection;
