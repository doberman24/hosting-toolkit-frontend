import styles from './Card.module.scss';
import { type StatusDescription } from '@/pages/AnalysisPage/analysis.config';
import type { DNSResult, SSLResult } from '@/types/analysis.types';
import { GoGlobe, GoShieldCheck } from 'react-icons/go';
import { HiOutlineCheckCircle, HiOutlineExclamation } from 'react-icons/hi';
import { MdOutlineCancel } from 'react-icons/md';

const Card = ({children, data, nameData, statusCard}: {
  children?: React.ReactElement,
  data: DNSResult | SSLResult | undefined, 
  nameData: string,
  statusCard: StatusDescription
}) => {
  
  const mainIcon = (type: string) => {
    if (type.toLowerCase().includes('dns')) return <GoGlobe/>;
    if (type.toLowerCase().includes('ssl')) return <GoShieldCheck/>;
    return <></>;
  }

  return (
    <div className={styles.cardBlock}>
      <div className={`${styles.headerCard} ${data && styles[data.status]}`}>
        <h2><span>{mainIcon(nameData)}</span><span>{nameData}</span></h2>
        {data && <p className={styles.statusMain}>{statusCard.getStatus(data.status)}</p>}
        {data && <div className={`${styles.showStatus}`}>
          <span className={styles.iconStatus}>
            <p>{data.status === 'error' ? <MdOutlineCancel/> : data.status === 'warning' ? <HiOutlineExclamation/> : <HiOutlineCheckCircle/>}</p>
            {data.status}
          </span>
        </div>}
      </div>
      {data ? 
        children :
      <div className={styles.noData}>
        <h4>Проверка не проиводилась</h4>
        <p>Для вывода результатов укажите домен <br />и нажмите "Проверить"</p>
      </div>
      }        
    </div>
  )
}

export default Card;