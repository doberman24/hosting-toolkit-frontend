import styles from './SSLCard.module.scss';
import { keyMapping, type EmptyValueKeys, type FieldName, type StatusDescription } from '@/pages/AnalysisPage/analysis.config';
import type { SSLResult } from '@/types/analysis.types';
import { HiOutlineCheckCircle, HiOutlineExclamation } from 'react-icons/hi';
import { MdOutlineCancel } from 'react-icons/md';
import Card from '../Card';
import { checkEmptyData } from '@/utils/checkEmtyData';
import { setClassStatus, setStatusData } from '@/utils/setStatusData';

const SSLCard = ({nameData, data, statusCard}: {nameData: string, data: SSLResult | undefined, statusCard: StatusDescription}) => {

      const checkValidDate = (fieldValue: string) => {
        if (typeof fieldValue === 'string') {
          const date = new Date(fieldValue);
          if (!isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(fieldValue)) {
            return date.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'});
          }
        }
        return fieldValue;
      }
    
//   console.log(data);
    return (
        <Card data={data} nameData={nameData} statusCard={statusCard}> 
            {data && <ul className={styles.dataBlock}>
                {Object.entries(data).filter(([key]) => key !== 'status').map(([key, value]) => (
                    <li key={key} className={styles.checkRowBlock}>
                        <div className={styles.nameProperty}>
                            {keyMapping[key as FieldName]} :
                        </div>
                        <div className={styles.dataWithStatusBlock}>
                            <div className={`${styles.description} ${!value.data ? styles.empty : ''}`}>{checkValidDate(checkEmptyData(value) as string)}</div>
                            <div className={`${styles.dataStatus} ${styles[setClassStatus(value.status)]}`}>
                                {value.data && <p>
                                    {setClassStatus(value.status) === 'error' ? <MdOutlineCancel/> : 
                                        setClassStatus(value.status) === 'warning' ? <HiOutlineExclamation/> : 
                                        <HiOutlineCheckCircle/>}
                                </p>}
                                <p>{setStatusData(value.status, key as EmptyValueKeys)}</p>
                            </div>

                        </div>
                    </li>
                ))}
            </ul>}
        </Card>
    )
}

export default SSLCard;
