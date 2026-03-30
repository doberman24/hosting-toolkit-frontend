import styles from './DNSCard.module.scss';
import { emptyStatuses, keyMapping, type EmptyValueKeys, type StatusDescription } from '@/pages/AnalysisPage/analysis.config';
import type { DNSResult, FieldResult } from '@/types/analysis.types';

const DNSCard = ({nameData, data, statusCard}: {nameData: string, data: DNSResult | undefined, statusCard: StatusDescription}) => {
  
    const checkExistData = (value: FieldResult<string[] | number | null>, key: EmptyValueKeys) => {
        // const statusKey = value.status as keyof typeof emptyStatuses[EmptyValueKeys];

        if (!value.data || Array.isArray(value.data) && value?.data.length === 0) {
            return '- пусто -';
        }
        return value.data ? value.data : '- пусто -';
    }

    const setClassStatus = (status: string, data: number | string | null) => {
        console.log(data);
        if (!data && data !== 0) return 'empty';
        if (status === 'ok') return 'ok';
        if (status === 'empty' || status === 'warning_status') return 'warning';
        return 'error';
    }

    const setStatusData = (status: string) => {
        if (status !== 'ok') return emptyStatuses.ttl[status as keyof typeof emptyStatuses[EmptyValueKeys]];
        return 'OK';
    }
  
//   console.log(data?.aRecords.data);
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
        {data ? <div className={styles.dataBlock}>
            <ul className={styles.cardDetailsA}>
                {Object.entries(data).map(([key, value]) => {
                    const keys = ['aRecords', 'aaaaRecords'];
                    const typeKey = key as EmptyValueKeys;
                    return (
                    keys.includes(typeKey) && <li key={typeKey} className={styles.checkRowBlock}>
                        <div className={styles.nameProperty}>
                            {keyMapping[typeKey]} :
                        </div>
                        {value.data?.length ? 
                        <ul className={styles.description}> 
                            {(checkExistData(value, typeKey) as string[]).map((record, count) => (
                                <li className={styles.descriptionValue} key={count}>{String(record)}</li>
                            ))}
                        </ul> :
                        <div 
                            key={typeKey} 
                            className={`${styles.description} ${styles.empty}`}
                        >{checkExistData(value, typeKey)}</div>
                        }
                    </li>
                )})}
            </ul>
            <div className={styles.checkRowBlock}>
                <div className={styles.nameProperty}>
                    {keyMapping['ttl']} :
                </div>
                <ul className={styles.dataWithStatusBlock}>
                    <div className={`${styles.dataValueForStatus} ${styles[setClassStatus(data.ttl.status, data.ttl.data)]}`}>{checkExistData(data.ttl, 'ttl')}</div>
                    <div className={`${styles.dataStatus} ${styles[setClassStatus(data.ttl.status, data.ttl.data)]}`}>
                        {setStatusData(data.ttl.status)}
                    </div>
                </ul>
            </div>
        </div> :
        <div className={styles.noData}>
            <h4>Проверка не проиводилась</h4>
            <p>Для вывода результатов укажите домен <br />и нажмите "Проверить"</p>
        </div>
        }        
    </div>
  )
}

export default DNSCard;
