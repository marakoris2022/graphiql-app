import { encodeBase64 } from '@/app/[...rest]/utils';
import TextField from '@mui/material/TextField';
import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChangeEvent, FC } from 'react';

type EndpointURLProps = {
  setURL: (data: string) => void;
  urlValue: string;
  setOpen: (data: boolean) => void;
};

const EndpointURL: FC<EndpointURLProps> = ({ setURL, urlValue, setOpen }) => {
  const t = useTranslations('apiClient');

  const pathname = usePathname();
  const pathArray = pathname.split('/');
  const searchParams = useSearchParams().toString();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOpen(false);

    const arr = [...pathArray];
    arr[2] = encodeBase64(encodeURIComponent(value));
    let newPath = arr.join('/');
    if (searchParams) {
      newPath = newPath + `?${searchParams}`;
    }
    history.replaceState(null, '', newPath);

    setURL(value);
  };

  return (
    <TextField
      required
      variant="outlined"
      label={`${t('urlPlaceholder')}:`}
      type="text"
      name="endpointURL"
      id="endpointURL"
      value={urlValue}
      onChange={handleChange}
      sx={{ width: '100%' }}
    />
  );
};

export default EndpointURL;
