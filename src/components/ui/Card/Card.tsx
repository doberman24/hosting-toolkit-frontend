import styles from './Card.module.scss';

const Card = ({nameData}: {nameData: string}) => {
  return (
    <div className={styles.cardBlock}>
        <h2>{nameData} Status</h2>
    </div>
  )
}

export default Card
