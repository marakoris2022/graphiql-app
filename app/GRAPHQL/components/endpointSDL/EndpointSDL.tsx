import { FC, useState } from 'react';

type EndpointSDLProps = {
  setSDL: (data: string) => void;
};

const EndpointSDL: FC<EndpointSDLProps> = ({ setSDL }) => {
  const [value, setValue] = useState('');
  return (
    <label htmlFor="endpointSDL">
      SDL URL:
      <input
        type="text"
        name="endpointSDL"
        id="endpointSDL"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setSDL(e.target.value);
        }}
      />
    </label>
  );
};

export default EndpointSDL;
