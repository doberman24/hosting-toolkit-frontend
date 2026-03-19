import type { FieldResult } from "@/types/analysis.types";
import { type ReactElement } from "react";
import styles from './CheckRow.module.scss';
import { emptyStatuses, keyMapping, type EmptyValueKeys, type FieldName } from "@/pages/AnalysisPage/analysis.config";

const CheckRow = ({fieldName, fieldValue}: {fieldName: FieldName, fieldValue: FieldResult<unknown>}) => {

  const getConvertValue = (fieldValueData: unknown): ReactElement => {
    if (!Array.isArray(fieldValueData)) {
      if (typeof fieldValueData === 'object') {
        return <div className={styles.description}>
          {Object.entries(fieldValueData as {[x: string]: string}).map(([keyFieldValue, valueField]) => {
            console.log(valueField);
            return <ul className={styles.notOkValue}> 
              <li className={styles.warningValue}>{keyFieldValue}</li>
              <li className={styles.warningStatus}>{String(valueField)}</li>
            </ul>
          })}
        </div>
      }
      return <div className={styles.description}>{String(fieldValueData)}</div>;
    }
    return ( <ul className={styles.description}> 
      {fieldValueData.map((value, count) => {
        if (typeof value !== 'object') {
          return <li className={styles.descriptionValue} key={count}>{String(value)}</li>;
        }
        return ( <ul className={styles.descriptionValue} key={count}>
          {Object.entries(value).map(([k, val], index) => {
            return ( fieldName === 'mxRecords' 
              ? <li key={index} className={styles.descriptionValueParams}>{String(val)}</li>
              : <li key={index} className={styles.descriptionValueNS}>
                <div className={styles.fullValue}>{k}</div>
                <div className={styles.nsWarns}>
                  {Array.isArray(val) ? nsWarningsTransform(val).map((v, i) => (<p key={i}>{v}</p>)) : <p>{String(val)}</p>}
                </div>
              </li> )
          })}
        </ul> )
      })}
    </ul> )
  }

  const nsWarningsTransform = (warn: string[]) => {
    const transform = warn.map((value) => emptyStatuses.nameservers.not_correct[value as keyof typeof emptyStatuses.nameservers.not_correct]);
    return transform;
  }

  const checkExistData = (fieldName: EmptyValueKeys, fieldValue: FieldResult<unknown>): unknown => {
    const data = fieldValue?.data;
    const statusKey = fieldValue?.status as keyof typeof emptyStatuses[typeof fieldName];
    if (!data || Array.isArray(fieldValue.data) && fieldValue?.data.length === 0) {
      return emptyStatuses[fieldName][statusKey];
    }
    if (Array.isArray(data)) {
      return data.map(item => {
        const key = Object.keys(item)[0];
        if (typeof item === 'object' && item[key] === 'not_resolve') {
          return { [key]: emptyStatuses[fieldName][statusKey][item[key]] };
        }
        return item; 
      }) 
    }
    if (fieldValue.status !== 'ok') {
      return {[fieldValue.data as string]: emptyStatuses[fieldName][statusKey]};
    }
    return fieldValue.data;
  }

  const checkValidDate = (fieldName: FieldName, fieldValue: FieldResult<unknown>): unknown => {
    if (typeof fieldValue?.data === 'string') {
      const date = new Date(fieldValue?.data);
      if (!isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(fieldValue?.data)) {
        fieldValue = {...fieldValue, data: date.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'})};
      }
    }
    return checkExistData(fieldName as EmptyValueKeys, fieldValue);
  }

  return (
    <li className={styles.checkRowBlock}>
      <div className={styles.nameProperty}>
        {keyMapping[fieldName] ?? fieldName} :
      </div> 
      {getConvertValue(checkValidDate(fieldName, fieldValue))}
    </li>
  )
}

export default CheckRow;
