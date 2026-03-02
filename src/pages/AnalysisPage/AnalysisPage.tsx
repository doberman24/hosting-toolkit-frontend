import { getAnalysis } from "@/redux/slices/analysis.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";
import styles from './AnalysisPage.module.scss';
import InputMain from "@/components/ui/Inputs/InputMain";
import Card from "@/components/ui/Card/Card";
import ButtonMain from "@/components/ui/Buttons/ButtonMain";
import LoaderMain from "@/components/ui/Loaders/LoaderMain";
import { configStatusDNS, configStatusHTTP, configStatusMail, configStatusSSL } from "./analysis.config";
import ResultCard from "@/components/ui/Card/ResultCard";
import LoadScreen from "@/components/ui/Loaders/LoaderScreen";

const AnalysisPage = () => {

  const dispatch = useAppDispatch();
  const {loading, analysisData} = useAppSelector(state => state.analysis);
  const [domain, setDomain] = useState<string>('');
  const [disabledCheck, setDisabledCheck] = useState<boolean>(true);

  const checkDomain = (e: React.SyntheticEvent<HTMLFormElement>, domain: string) => {
    e.preventDefault();
    dispatch(getAnalysis(domain));
    console.log(domain);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisabledCheck(!e.target.value);
    setDomain(e.target.value);
  }

  return (
    <div className={styles.pageContainer}>
      <LoadScreen vision={loading} />
      <div className={styles.headerBlock}>
        <h1>Полная диагностика сайта</h1>
        <p>Быстрая диагностика проблем с DNS, SSL, HTTP и email</p>
      </div>
      <div className={styles.findDomainBlock}>
        <form className={styles.formBlock} onSubmit={(e) => checkDomain(e, domain)}>
          <label>
            <InputMain required={true} onChange={handleChange} disabled={loading}/>
          </label>
          <label>
            <ButtonMain disabled={disabledCheck || loading}>Проверить</ButtonMain>
          </label>
        </form>
        {loading ? <LoaderMain /> 
          : <div className={styles.validResponse}>
              {!analysisData ? 'Для вывода результатов укажите домен и нажмите "Проверить' : 'Проверка выполнена. Данные загружены.'}
            </div>
        }
      </div>
      <div className={styles.responseBlock}>
        <Card nameData={'DNS Configuration'} data={analysisData?.checks.dns} statusCard={configStatusDNS} />
        <Card nameData={'SSL Certificate'} data={analysisData?.checks.ssl} statusCard={configStatusSSL} />
        <Card nameData={'HTTP Status'} data={analysisData?.checks.http} statusCard={configStatusHTTP} />
        <Card nameData={'Mail Security'} data={analysisData?.checks.mail} statusCard={configStatusMail} />
      </div>
      <div className={styles.resaultBlock}>
        <ResultCard data={analysisData?.summary} />
      </div>
    </div>
  )
}

export default AnalysisPage;
