import { getAnalysis } from "@/redux/slices/analysis.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import styles from './AnalysisPage.module.scss';
import InputMain from "@/components/ui/Inputs/InputMain";
import Card from "@/components/ui/Card/Card";
import ButtonMain from "@/components/ui/Buttons/ButtonMain";
import LoaderMain from "@/components/ui/Loaders/LoaderMain";
import { configStatusDNS, configStatusHTTP, configStatusMail, configStatusSSL } from "./analysis.config";

const AnalysisPage = () => {

  const dispatch = useAppDispatch();
  const {loading, analysisData} = useAppSelector(state => state.analysis);
  const [domain, setDomain] = useState<string | null>(null);
  

  useEffect(() => {
    dispatch(getAnalysis('example.com'));
    setDomain('example.com');
  }, []);

  if (loading || !analysisData) {
    return <div>Загрузка</div>
  }

  const checkDomain = (e: React.SyntheticEvent<HTMLFormElement>, domain: string | null) => {
    e.preventDefault();
    console.log(domain);
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerBlock}>
        <h1>Полная диагностика сайта</h1>
        <p>Быстрая диагностика проблем с DNS, SSL, HTTP и email</p>
      </div>
      <div className={styles.findDomainBlock}>
        <form className={styles.formBlock} onSubmit={(e) => checkDomain(e, domain)}>
          <label>
            <InputMain />
          </label>
          <label>
            <ButtonMain>Проверить</ButtonMain>
          </label>
        </form>
        <LoaderMain />
      </div>
      <div className={styles.responseBlock}>
        <Card nameData={'DNS Configuration'} data={analysisData.checks.dns} statusCard={configStatusDNS} />
        <Card nameData={'SSL Certificate'} data={analysisData.checks.ssl} statusCard={configStatusSSL} />
        <Card nameData={'HTTP Status'} data={analysisData.checks.http} statusCard={configStatusHTTP} />
        <Card nameData={'Mail Security'} data={analysisData.checks.mail} statusCard={configStatusMail} />
      </div>
      <div className={styles.resaultBlock}>
        <div className={styles.resault}>Общий статус</div>
        <div className={styles.summary}>Краткий вывод</div>
      </div>
    </div>
  )
}

export default AnalysisPage;
