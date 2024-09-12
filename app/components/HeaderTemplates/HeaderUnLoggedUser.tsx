import { RoutePath } from '@/utils/utils';
import { CustomLink } from '../CustomLink/CustomLink';
import styles from './headerTemplates.module.css';
import LocaleSwitcher from './LocaleSwitcher';
import { useTranslations } from 'next-intl';
import { Logo } from './Logo';

export const HeaderUnLoggedUser = () => {
  const t = useTranslations('unLoggedUserHeader');
  return (
    <>
      <Logo />
      <LocaleSwitcher />
      <nav className={styles.buttonsContainerNav}>
        <ul className={styles.buttonsContainer}>
          <li>
            <CustomLink href={RoutePath.SIGN_IN} title={t('signIn')} />
          </li>
          <li>
            <CustomLink href={RoutePath.SIGN_UP} title={t('signUp')} />
          </li>
        </ul>
      </nav>
    </>
  );
};
