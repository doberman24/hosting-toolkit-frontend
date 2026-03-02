import type { ButtonProps } from '@/types/global.types';
import styles from './ButtonMain.module.scss';

const ButtonMain: React.FC<ButtonProps> = ({onClick = () => {}, children, disabled = false}) => {
  return (
    <button 
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default ButtonMain;
