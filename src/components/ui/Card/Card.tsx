import type { cardData } from '@/types/global.types';
import styles from './Card.module.scss';
import CheckRow from '@/components/ui/CheckRow/CheckRow';
import type { FieldName, StatusDescription } from '@/pages/AnalysisPage/analysis.config';

const Card = ({nameData, data, statusCard}: {nameData: string, data: cardData, statusCard: StatusDescription}) => {
  // console.log(data);
  return (
    <div className={styles.cardBlock}>
      <div className={styles.headerCard}>
        <h2>{nameData}</h2>
        <p>{statusCard.getStatus(data.status)}</p>
        <div className={`${styles.showStatus} ${styles[data.status]}`}></div>
      </div>
      <ul className={styles.cardDetails}>
        {Object.entries(data).map(([key, value]) => (
          key !== 'status' && <CheckRow 
            key={key}
            fieldName={key as FieldName}
            fieldValue={value}
          />
        ))}
      </ul>
    </div>
  )
}

export default Card
