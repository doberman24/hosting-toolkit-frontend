import styles from './InputMain.module.scss';

const InputMain = ({onChange, disabled, required = false}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>, 
  disabled: boolean,
  required: boolean
}) => {
  return (
    <input 
      className={styles.input} 
      type="text"
      onChange={onChange} 
      placeholder="Введите домен..." 
      disabled={disabled}
      required={required}
    />
  )
}

export default InputMain;
