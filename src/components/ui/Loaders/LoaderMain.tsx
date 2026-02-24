import styles from './LoaderMain.module.scss';

const LoaderMain = () => {
  return (
    <div className={styles.loaderBlock}>
      {/* <div className={styles.spinner}></div> */}
      <h4>Загрузка данных...</h4>
    </div>
  )
}

export default LoaderMain;
