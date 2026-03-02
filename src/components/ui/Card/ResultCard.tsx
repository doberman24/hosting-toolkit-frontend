import styles from './Card.module.scss';
import type { Status } from '@/types/status.types';

const ResultCard = ({data}: {data: {status: Status, score: number, message: string} | undefined}) => {
  // console.log(data);
  return (
    <div className={`${styles.cardBlock} ${styles.summaryBlock}`}>
      <div className={styles.headerCard}>
        <h2>Результат проверки</h2>
      </div>
      {data ? <p>{data?.message}</p>
      : <div className={styles.noData}>
          <h4>Проверка не проиводилась</h4>
          <p>Для вывода результатов укажите домен и нажмите "Проверить"</p>
        </div>}
    </div>
  )
}

export default ResultCard;
