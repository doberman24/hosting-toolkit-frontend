import styles from './InputMain.module.scss';

const InputMain = ({onChange}: {onChange: React.ChangeEventHandler<HTMLInputElement>}) => {
  return (
    <input 
      className={styles.input} 
      type="text"
      onChange={onChange} 
      placeholder="Введите домен..." 
    />
  )
}

export default InputMain;
