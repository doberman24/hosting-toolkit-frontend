import { configStatusSummary } from '@/pages/AnalysisPage/analysis.config';
import styles from './Card.module.scss';
import type { Status } from '@/types/status.types';

const ResultCard = ({data}: {data: {status: Status, score: number, message: string} | undefined}) => {
  return (
    <div className={`${styles.cardBlock} ${styles.summaryBlock}`}>
      <div className={styles.summaryStatus}> 
        <div className={styles.showStatus}>
          <h4>Общий статус:</h4>
          {data && <div className={`${styles.iconStatus} ${styles[data.status]}`}></div>}
          <p>{data ? configStatusSummary.getStatus(data.status) : '—'}</p>
        </div>
        <p><b>Краткий вывод: </b>{data ? data.message : 'для вывода результатов укажите домен и нажмите "Проверить'}</p>
      </div>
    </div>
  )
}

export default ResultCard;
