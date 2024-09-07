import { decodeBase64, encodeBase64 } from '@/app/[...rest]/utils';
import { endpointURLSchema } from '@/lib/formValidationSchema/validationSchema';
import TextField from '@mui/material/TextField';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

type EndpointURLProps = {
  setURL: (data: string) => void;
};

const EndpointURL: FC<EndpointURLProps> = ({ setURL }) => {
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const pathArray = pathname.split('/');
  const url = pathArray[2];
  const searchParams = useSearchParams().toString();
  const decodedUrl = url ? decodeURIComponent(decodeBase64(url)) : '';

  useEffect(() => {
    setURL(decodedUrl);
  }, [decodedUrl, setURL]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    try {
      await endpointURLSchema.validate(value);
      setError(null);

      const arr = [...pathArray];
      arr[2] = encodeBase64(encodeURIComponent(value));
      let newPath = arr.join('/');
      if (searchParams) {
        newPath = newPath + `?${searchParams}`;
      }
      history.replaceState(null, '', newPath);

      setURL(value);
    } catch (validationError) {
      setError((validationError as Yup.ValidationError).errors[0]);
    }
  };

  return (
    <div>
      <TextField
        required
        variant="outlined"
        label="Endpoint URL:"
        type="text"
        name="endpointURL"
        id="endpointURL"
        defaultValue={decodedUrl}
        onChange={handleChange}
        sx={{ width: '100%' }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EndpointURL;
