import { getAnalysis } from "@/redux/slices/analysis.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import styles from './AnalysisPage.module.scss';
import InputMain from "@/components/ui/Inputs/InputMain";
import Card from "@/components/ui/Card/Card";
import ButtonMain from "@/components/ui/Buttons/ButtonMain";
import LoaderMain from "@/components/ui/Loaders/LoaderMain";

const AnalysisPage = () => {

  const dispatch = useAppDispatch();
  const {loading, analysisData} = useAppSelector(state => state.analysis);

  useEffect(() => {
    dispatch(getAnalysis('example.com'));
  }, []);

  if (loading || !analysisData) {
    return <div>Загрузка</div>
  }
  console.log(analysisData);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerBlock}>
        <h1>Полная диагностика сайта</h1>
        <p>Быстрая диагностика проблем с DNS, SSL, HTTP и email</p>
      </div>
      <div className={styles.findDomainBlock}>
        <form className={styles.formBlock}>
          <label>
            <InputMain />
          </label>
          <label>
            <ButtonMain />
          </label>
        </form>
        <LoaderMain />
      </div>
      <div className={styles.responseBlock}>
        <Card nameData={'DNS'} />
        <Card nameData={'SSL'} />
        <Card nameData={'HTTP'} />
        <Card nameData={'Email'} />
      </div>
      <div className={styles.resaultBlock}>
        <div className={styles.resault}>Общий статус</div>
        <div className={styles.summary}>Краткий вывод</div>
      </div>
    </div>
  )
}

export default AnalysisPage;
