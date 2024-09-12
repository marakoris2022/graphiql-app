import { decodeBase64, encodeBase64 } from '@/app/[...rest]/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { FC, useState, ChangeEvent, useCallback } from 'react';
import styles from './variablesSection.module.css';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import Button from '@mui/material/Button';
import { useTranslations } from 'next-intl';

type VariablesSectionProps = {
  setVariables: (data: string) => void;
  variables: string;
};

const VariablesSection: FC<VariablesSectionProps> = ({
  setVariables,
  variables,
}) => {
  const t = useTranslations('apiClient');

  const pathname = usePathname();
  const searchParams = useSearchParams().toString();
  const [showVariablesBox, setShowVariablesBox] = useState<boolean>(false);

  const getQuery = useCallback(() => {
    const pathArray = pathname.split('/');
    const query = pathArray[3];
    const decodedQuery = query
      ? JSON.parse(decodeURIComponent(decodeBase64(query)))
      : { query: '', variables: '' };
    return decodedQuery;
  }, [pathname]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setVariables(val);
    const query = getQuery().query;
    if (!query) return;

    const pathArray = pathname.split('/');

    if (!pathArray[2]) {
      pathArray[2] = '';
    }
    pathArray[3] = val
      ? encodeBase64(
          encodeURIComponent(JSON.stringify({ query, variables: val }))
        )
      : encodeBase64(
          encodeURIComponent(JSON.stringify({ query, variables: '' }))
        );
    let newPath = pathArray.join('/');
    if (searchParams) {
      newPath = newPath + `?${searchParams}`;
    }

    history.replaceState(null, '', newPath);
  };

  return (
    <div>
      <div className={styles.variablesTitleBlock}>
        <Button
          variant="text"
          type="button"
          onClick={() => setShowVariablesBox((prev) => !prev)}
          size="small"
          sx={{
            color: 'grey',
            border: '1px solid grey',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '20px',
            height: '20px',
            minWidth: '20px',
            padding: 0,
            marginRight: '10px',
          }}
        >
          {showVariablesBox ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </Button>
        <h3>{t('variables')}</h3>
      </div>
      {showVariablesBox && (
        <fieldset>
          <textarea
            className={styles.variablesGraphQL}
            name="variables"
            id="variables"
            placeholder={`${t('variables')}...`}
            value={variables}
            onChange={handleChange}
          />
        </fieldset>
      )}
    </div>
  );
};

export default VariablesSection;
