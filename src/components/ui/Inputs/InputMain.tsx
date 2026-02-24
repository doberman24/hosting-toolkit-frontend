import styles from './InputMain.module.scss';

const InputMain = () => {
  return (
    <input 
      className={styles.input} 
      type="text" 
      placeholder="Введите домен..." 
    />
  )
}

export default InputMain;
