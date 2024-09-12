import { formatTimestamp } from '@/app/[...rest]/utils';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import { HistoryPops } from '@/app/interface/interface';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const styleFlexCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function HistoryItems({
  history,
  removeHistoryItem,
}: {
  history: HistoryPops;
  removeHistoryItem: (date: number) => void;
}) {
  const t = useTranslations('history');
  const { push } = useRouter();

  return (
    <Box
      sx={{
        ...styleFlexCenter,
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      {history.map((historyItem) => {
        return (
          <Box
            key={historyItem.Date}
            sx={{
              ...styleFlexCenter,
              border: 'solid 1px rgba(25, 118, 210, 0.5)',
              borderRadius: 2,
              width: '80%',
              gap: '5px',
              padding: '5px 15px',
              flexDirection: { lg: 'row', md: 'column', xs: 'column' },
            }}
          >
            <Box
              sx={{
                ...styleFlexCenter,
                width: '100%',
                gap: '5px',
              }}
            >
              <Typography>{historyItem.method}</Typography>
              <Divider orientation="vertical" variant="middle" flexItem />
              <TextField
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                id="standard-basic"
                value={historyItem.EndpointURL}
                variant="standard"
                sx={{ width: '100%' }}
              />
            </Box>
            <Box
              sx={{
                ...styleFlexCenter,
                gap: '5px',
              }}
            >
              <Typography>{formatTimestamp(historyItem.Date)}</Typography>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Box
                sx={{
                  ...styleFlexCenter,
                  flexWrap: { lg: 'nowrap', md: 'nowrap', xs: 'wrap' },
                  gap: '5px',
                }}
              >
                <Button
                  onClick={() => {
                    push(historyItem.generatedURL);
                  }}
                  endIcon={<SendIcon />}
                >
                  {t('repeat')}
                </Button>
                <Button
                  sx={{ color: 'darkred' }}
                  endIcon={<AutoDeleteIcon />}
                  onClick={() => removeHistoryItem(historyItem.Date)}
                >
                  {t('remove')}
                </Button>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
