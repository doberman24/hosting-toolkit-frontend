import type { cardData } from '@/types/global.types';
import styles from './Card.module.scss';
import CheckRow from '@/components/ui/CheckRow/CheckRow';
import type { FieldName, StatusDescription } from '@/pages/AnalysisPage/analysis.config';

const Card = ({nameData, data, statusCard}: {nameData: string, data: cardData | undefined, statusCard: StatusDescription}) => {
  // console.log(data);
  return (
    <div className={styles.cardBlock}>
      <div className={styles.headerCard}>
        <h2>{nameData}</h2>
        {data && <p>{statusCard.getStatus(data.status)}</p>}
        {data && <div className={styles.showStatus}>
            <div className={`${styles.iconStatus} ${styles[data.status]}`}></div>
            <p>{data.status}</p>
          </div>
        }
      </div>
      {data ? <ul className={styles.cardDetails}>
        {Object.entries(data).map(([key, value]) => (
          key !== 'status' && <CheckRow 
            key={key}
            fieldName={key as FieldName}
            fieldValue={value}
          />
        ))}
      </ul> :
      <div className={styles.noData}>
        <h4>Проверка не проиводилась</h4>
        <p>Для вывода результатов укажите домен <br />и нажмите "Проверить"</p>
      </div>
      }
    </div>
  )
}

export default Card
