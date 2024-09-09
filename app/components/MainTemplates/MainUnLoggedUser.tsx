import { RoutePath } from '@/utils/utils';
import { CustomLink } from '../CustomLink/CustomLink';
import styles from './mainTemplates.module.css';
import { useTranslations } from 'next-intl';

export const MainUnLoggedUser = () => {
  const t = useTranslations('mainUnLoggedUser');
  return (
    <section className={styles.main}>
      <h2>{t('title')}</h2>
      <div className={styles.buttonsContainer}>
        <CustomLink href={RoutePath.SIGN_IN} title={t('signIn')} />
        <CustomLink href={RoutePath.SIGN_UP} title={t('signUp')} />
      </div>
    </section>
  );
};
