'use client';
import { setUserLocale } from '@/services/locale';
import { useLocale, useTranslations } from 'next-intl';
import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';

export default function LocaleSwitcher() {
  const t = useTranslations('localeSwitcher');
  const locale = useLocale();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    if (newLocale === locale) return;

    setUserLocale(newLocale);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {t('language')}
        </InputLabel>
        <NativeSelect
          defaultValue={locale}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value="en">{t('en')}</option>
          <option value="ru">{t('ru')}</option>
        </NativeSelect>
      </FormControl>
    </Box>

    // <select
    //   className={styles.localeSwitcher}
    //   defaultValue={locale}
    //   onChange={handleChange}
    // >
    //   <option value="en">{t('en')}</option>
    //   <option value="ru">{t('ru')}</option>
    // </select>
  );
}
