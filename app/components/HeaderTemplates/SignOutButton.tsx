'use client';
import { app } from '@/firebase';
import { RoutePath, toastifyMessage } from '@/utils/utils';
import { getAuth, signOut } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

export const SignOutButton = () => {
  const router = useRouter();
  const t = useTranslations('loggedUserHeader');
  const [isPending, setTransition] = useTransition();

  async function handleLogout() {
    setTransition(async () => {
      await signOut(getAuth(app));

      await fetch('/api/logout');

      router.push(RoutePath.HOME);
      router.refresh();
      toast.success(t('toastMsg'), toastifyMessage);
    });
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <button className="linkDefault" onClick={handleLogout}>
      {t('signOut')}
    </button>
  );
};
