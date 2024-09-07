import { FC, useRef, useState } from 'react';
import { endpointSDLSchema } from '@/lib/formValidationSchema/validationSchema';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';

type EndpointSDLProps = {
  setSDL: (data: string) => void;
};

const EndpointSDL: FC<EndpointSDLProps> = ({ setSDL }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    try {
      setValue(inputValue);

      await endpointSDLSchema.validate(inputValue);
      setError(null);
      setSDL(inputValue);
    } catch (validationError) {
      setError((validationError as Yup.ValidationError).errors[0]);
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        label="SDL Endpoint:"
        type="text"
        name="endpointSDL"
        id="endpointSDL"
        value={value}
        onChange={handleChange}
        sx={{ width: '100%' }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EndpointSDL;
