import React from 'react';
import styles from './mainTemplates.module.css';
import { CustomLink } from '../CustomLink/CustomLink';
import { RoutePath } from '@/utils/utils';
import { useTranslations } from 'next-intl';
import { About } from './components/About/About';

type MainLoggedUserProps = {
  userName: string;
};

export const MainLoggedUser = ({ userName }: MainLoggedUserProps) => {
  const t = useTranslations('mainLoggedUser');
  return (
    <div className={styles.main}>
      <h2>
        {t('title')} {userName}
      </h2>
      <nav>
        <ul className={styles.mainLinksContainer}>
          <li>
            <CustomLink
              href={RoutePath.GRAPHIQL_CLIENT}
              title={t('graphiql')}
            />
          </li>
          <li>
            <CustomLink href={RoutePath.REST_CLIENT_GET} title={t('rest')} />
          </li>
          <li>
            <CustomLink href={RoutePath.HISTORY} title={t('history')} />
          </li>
        </ul>
      </nav>
      <About />
    </div>
  );
};
