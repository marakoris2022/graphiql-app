import { decodeBase64, encodeBase64 } from '@/app/[...rest]/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { FC, useState, ChangeEvent, useCallback } from 'react';
import styles from './variablesSection.module.css';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import * as Yup from 'yup';
import { prettifySchema } from '@/lib/formValidationSchema/validationSchema';

type VariablesSectionProps = {
  setVariables: (data: string) => void;
};

const VariablesSection: FC<VariablesSectionProps> = ({ setVariables }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();
  const [showHeaders, setShowHeaders] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const getQuery = useCallback(() => {
    const pathArray = pathname.split('/');
    const query = pathArray[3];
    const decodedQuery = query
      ? JSON.parse(decodeURIComponent(decodeBase64(query)))
      : { query: '', variables: '' };
    return decodedQuery;
  }, [pathname]);

  function handleVariablesFocusOut(e: ChangeEvent<HTMLTextAreaElement>) {
    const variables = e.target.value;

    const validateVariables = async (variables: string) => {
      try {
        await prettifySchema.validate({ variables });

        setError(null);
        setVariables(variables);

        const query = getQuery().query;
        if (!query) return;

        const pathArray = pathname.split('/');

        if (!pathArray[2]) {
          pathArray[2] = '';
        }
        pathArray[3] = variables
          ? encodeBase64(encodeURIComponent(JSON.stringify({ query, variables })))
          : encodeBase64(encodeURIComponent(JSON.stringify({ query, variables: '' })));
        let newPath = pathArray.join('/');
        if (searchParams) {
          newPath = newPath + `?${searchParams}`;
        }

        history.replaceState(null, '', newPath);
      } catch (validationError) {
        setError((validationError as Yup.ValidationError).errors[0]);
      }
    };

    validateVariables(variables);
  }

  return (
    <div>
      <div className={styles.variablesTitleBlock}>
        <button type="button" onClick={() => setShowHeaders((prev) => !prev)}>
          {showHeaders ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </button>
        <h3>Variables</h3>
      </div>
      {showHeaders && (
        <fieldset>
          <textarea
            className={styles.variablesGraphQL}
            name="variables"
            id="variables"
            placeholder="Variables..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleVariablesFocusOut}
          ></textarea>
          {error && <p className={styles.errorText}>{error}</p>}
        </fieldset>
      )}
    </div>
  );
};

export default VariablesSection;
