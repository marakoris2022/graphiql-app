import styles from './headerTemplates.module.css';
import { SignOutButton } from './SignOutButton';
import { CustomLink } from '../CustomLink/CustomLink';
import { RoutePath } from '@/utils/utils';
import LocaleSwitcher from './LocaleSwitcher';
import { useTranslations } from 'next-intl';
import { Logo } from './Logo';

export const HeaderLoggedUser = () => {
  const t = useTranslations('loggedUserHeader');
  return (
    <>
      <Logo />
      <LocaleSwitcher />
      <nav className={styles.buttonsContainerNav}>
        <ul className={styles.buttonsContainer}>
          <li>
            <CustomLink href={RoutePath.HOME} title={t('main')} />
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </nav>
    </>
  );
};
