import GQLForm from '../components/Forms/GqlForm/GQLForm';
import styles from './page.module.css';

export default function GraphiQLClient() {
  return (
    <>
      <h2 className={styles.title}>GraphiQL Client</h2>
      <GQLForm />
    </>
  );
}
