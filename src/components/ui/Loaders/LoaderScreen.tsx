import ReactDOM from 'react-dom';
import styles from './LoaderMain.module.scss';

const LoadScreen = ({vision}: {vision: boolean}) => {
    return ReactDOM.createPortal(
        <div className={`${styles.loadingScreen} ${vision ? styles.visionLoadScreen : ''}`}></div>,
        document.getElementById('modal-root') as HTMLElement
    );
};

export default LoadScreen;