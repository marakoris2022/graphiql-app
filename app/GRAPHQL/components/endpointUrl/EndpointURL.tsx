import { decodeBase64, encodeBase64 } from '@/app/[...rest]/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChangeEvent, FC, useEffect } from 'react';

type EndpointURLProps = {
  setURL: (data: string) => void;
};

const EndpointURL: FC<EndpointURLProps> = ({ setURL }) => {
  const pathname = usePathname();
  const pathArray = pathname.split('/');
  const url = pathArray[2];
  const searchParams = useSearchParams().toString();
  const decodedUrl = url ? decodeURIComponent(decodeBase64(url)) : '';

  useEffect(() => {
    setURL(decodedUrl);
  }, [decodedUrl, setURL]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const arr = [...pathArray];
    arr[2] = encodeBase64(encodeURIComponent(e.target.value));
    let newPath = arr.join('/');
    if (searchParams) {
      newPath = newPath + `?${searchParams}`;
    }
    history.replaceState(null, '', newPath);
  };

  return (
    <label htmlFor="endpointURL">
      Endpoint URL:
      <input
        type="text"
        name="endpointURL"
        id="endpointURL"
        defaultValue={decodedUrl}
        onChange={handleChange}
      />
    </label>
  );
};

export default EndpointURL;
