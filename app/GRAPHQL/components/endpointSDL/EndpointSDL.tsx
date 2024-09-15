import { FC, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useTranslations } from 'next-intl';

type EndpointSDLProps = {
  setSDL: (data: string) => void;
  sdlValue: string;
  setOpen: (data: boolean) => void;
};

const EndpointSDL: FC<EndpointSDLProps> = ({ setSDL, sdlValue, setOpen }) => {
  const t = useTranslations('apiClient');

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setOpen(false);
    setSDL(inputValue);
  };

  return (
    <div>
      <TextField
        variant="outlined"
        label={t('sdlPlaceholder')}
        type="text"
        name="endpointSDL"
        id="endpointSDL"
        value={sdlValue}
        onChange={handleChange}
        sx={{ width: '100%' }}
      />
    </div>
  );
};

export default EndpointSDL;
