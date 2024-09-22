'use client';
import { setUserLocale } from '@/services/locale';
import { useLocale, useTranslations } from 'next-intl';
import {
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
  Typography,
} from '@mui/material';

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
      <Typography sx={{ fontSize: '12px', color: 'gray' }}>
        {t('language')}
      </Typography>
      <FormControl fullWidth>
        <NativeSelect defaultValue={locale} onChange={handleChange}>
          <option value="en">{t('en')}</option>
          <option value="ru">{t('ru')}</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
