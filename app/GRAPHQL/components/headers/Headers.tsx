import { FC, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import styles from './headers.module.css';
import { IoIosArrowDown, IoIosArrowBack } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import { usePathname, useSearchParams } from 'next/navigation';

type HeadersProps = {};

const Headers: FC<HeadersProps> = ({}) => {
  const search = useSearchParams();

  const [headers, setHeaders] = useState(() => {
    if (!search.toString()) return [{ key: '', value: '' }];
    const arr = [];
    for (const [key, value] of search.entries()) {
      arr.push({ key, value });
    }
    return arr;
  });

  const [showHeaders, setShowHeaders] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams();
    headers.forEach((header) => {
      if (header.key && header.value) {
        params.set(encodeURIComponent(header.key), encodeURIComponent(header.value));
      }
    });
    const pewPath = pathname + '?' + params.toString();
    history.replaceState(null, '', pewPath);
  }, [headers]);

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const deleteHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    const modified = [...headers];
    modified[index][field] = value;
    setHeaders(modified);
  };

  return (
    <div className={styles.headersContainer}>
      <div className={styles.headersTitleBlock}>
        <button type="button" onClick={() => setShowHeaders((prev) => !prev)}>
          {showHeaders ? <IoIosArrowDown /> : <IoIosArrowBack />}
        </button>
        <h3>Request Headers</h3>
      </div>
      {showHeaders && (
        <fieldset>
          {headers.map((header, index) => (
            <div key={index}>
              <label htmlFor={`headerKey${index}`}>
                Key:
                <input
                  type="text"
                  name="headerKey"
                  id={`headerKey${index}`}
                  value={header.key}
                  onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                />
              </label>
              <label htmlFor={`headerValue${index}`}>
                Value:
                <input
                  type="text"
                  name="headerValue"
                  id={`headerValue${index}`}
                  value={header.value}
                  onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                />
              </label>
              <button type="button">
                <IoMdClose onClick={() => deleteHeader(index)} />
              </button>
            </div>
          ))}
          <button type="button" onClick={addHeader}>
            Add Header
          </button>
        </fieldset>
      )}
    </div>
  );
};

export default Headers;
