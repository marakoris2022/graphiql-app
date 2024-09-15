import { getTranslations } from 'next-intl/server';
import GQLForm from '../components/GqlForm/GQLForm';
import styles from './page.module.css';

export default async function GraphiQLClient() {
  const t = await getTranslations('apiClient');

  return (
    <>
      <h2 className={styles.title}>{t('graphTitle')}</h2>
      <GQLForm />
    </>
  );
}
