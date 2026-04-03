import styles from './DNSCard.module.scss';
import { emptyStatuses, keyMapping, type EmptyValueKeys, type StatusDescription } from '@/pages/AnalysisPage/analysis.config';
import type { DNSResult } from '@/types/analysis.types';
import { HiOutlineCheckCircle, HiOutlineExclamation } from 'react-icons/hi';
import { MdOutlineCancel } from 'react-icons/md';
import Card from "@/components/ui/Card/Card";
import { checkEmptyData } from '@/utils/checkEmtyData';
import { setClassStatus, setStatusData } from '@/utils/setStatusData';

const DNSCard = ({nameData, data, statusCard}: {nameData: string, data: DNSResult | undefined, statusCard: StatusDescription}) => {

    const nsWarningsTransform = (warn: string[] | string) => {
        if (typeof warn === 'string') {
            return [emptyStatuses.nameservers.not_correct[warn as keyof typeof emptyStatuses.nameservers.not_correct]];
        }
        return warn.map((value) => emptyStatuses.nameservers.not_correct[value as keyof typeof emptyStatuses.nameservers.not_correct]);
    }

//   console.log(data?.aRecords.data);
    return (
        <Card data={data} nameData={nameData} statusCard={statusCard}> 
            {data && <div className={styles.dataBlock}>
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
                                {(checkEmptyData(value) as string[]).map((record, count) => (
                                    <li className={styles.descriptionValue} key={count}>{String(record)}</li>
                                ))}
                            </ul> :
                            <div 
                                key={typeKey} 
                                className={`${styles.description} ${styles.empty}`}
                            >- пусто -</div>
                            }
                        </li>
                    )})}
                </ul>
                <div className={styles.checkRowBlock}>
                    <div className={styles.nameProperty}>
                        {keyMapping['ttl']} :
                    </div>
                    <div className={styles.dataWithStatusBlock}>
                        <div className={`${styles.description} ${!data.ttl.data ? styles.empty : ''}`}>{checkEmptyData(data.ttl)}</div>
                        <div className={`${styles.dataStatus} ${styles[setClassStatus(data.ttl.status)]}`}>
                            {data.ttl.data && <p>
                                {setClassStatus(data.ttl.status) === 'error' ? <MdOutlineCancel/> : 
                                    setClassStatus(data.ttl.status) === 'warning' ? <HiOutlineExclamation/> : 
                                    <HiOutlineCheckCircle/>}
                            </p>}
                            <p>{setStatusData(data.ttl.status, 'ttl')}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.checkRowBlock}>
                    <div className={styles.nameProperty}>
                        {keyMapping['nameservers']} :
                    </div>
                    {data.nameservers.data.length ? 
                    <ul className={styles.description}> 
                        {data.nameservers.data.map((value, count) => {
                            return ( <li className={styles.descriptionValue} key={count}>
                            {Object.entries(value).map(([record, status], index) => {
                                return ( <div key={index} className={styles.dataWithStatusBlock}>
                                    <div className={styles.descriptionNS}>{record}</div>
                                    <div className={styles.dataStatusList}>
                                    {nsWarningsTransform(status).map((statusParse, i) => (
                                        <div className={`${styles.dataStatus} ${styles[setClassStatus(status)]}`} key={i}>
                                            <p>{setClassStatus(status) === 'error' ? <MdOutlineCancel/> : setClassStatus(status) === 'warning' ? <HiOutlineExclamation /> : <HiOutlineCheckCircle/>}</p>
                                            <p>{statusParse}</p>
                                        </div>)
                                    )}
                                    </div>
                                </div> )
                            })}
                            </li> )
                        })}
                    </ul> : 
                    <div 
                        className={`${styles.description} ${styles.empty}`}
                    >- пусто -</div>}
                </div>
            </div>}
        </Card> 
    )
}

export default DNSCard;
