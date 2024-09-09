import { toastContainerConfig } from '@/utils/utils';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { ToastContainer } from 'react-toastify';
import { createTranslator, useTranslations } from 'next-intl';
import { jest } from '@jest/globals';

jest.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: jest.fn(),
      refresh: jest.fn(),
    }),
    usePathname: () => '/mocked-pathname',
    useSearchParams: () => ({
      keys: () => ['key1', 'key2'].values(),
      get: (key: string) => `mocked-${key}`,
      toString: () => 'mocked-search-params',
    }),
  };
});

async function getLocale() {
  return 'en';
}

async function getMessages() {
  return (await import('../../messages/en.json')).default;
}

export async function renderWithProvider(children: React.ReactNode) {
  const locale = await getLocale();
  const messages = await getMessages();
  const translator = createTranslator({ locale, messages });

  return render(
    <NextIntlClientProvider messages={messages} locale={locale}>
      <main>{children}</main>
      <ToastContainer {...toastContainerConfig} />
    </NextIntlClientProvider>
  );
}
