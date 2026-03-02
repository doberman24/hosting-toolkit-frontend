import type { CardFieldValue, CardValue } from "@/types/analysis.types";
import { type ReactElement } from "react";
import styles from './CheckRow.module.scss';
import { emptyStatuses, keyMapping, type EmptyValueKeys, type FieldName } from "@/pages/AnalysisPage/analysis.config";

const CheckRow = ({fieldName, fieldValue}: {fieldName: FieldName, fieldValue: CardFieldValue<CardValue, EmptyValueKeys>}) => {

  const getConvertValue = (fieldValue: CardValue): ReactElement => {
    if (Array.isArray(fieldValue)) {
      return (
        <ul className={styles.description}> 
          {fieldValue.map((value: string, count: number) => {
            if (typeof value === 'object') {
              return (
                <ul className={styles.descriptionValue} key={count}>
                  {Object.values(value).map((val, index) => <li key={index} className={styles.descriptionValueParams}>{val as string}</li>)}
                </ul>
              )
            } 
            return <li className={styles.descriptionValue} key={count}>{value}</li>;
          })}
        </ul>
      )
    }
    return <div className={styles.description}>{String(fieldValue)}</div>;
  }

  const checkExistData = (fieldName: EmptyValueKeys, fieldValue: CardFieldValue<CardValue, EmptyValueKeys>) => {
    if (
      fieldValue?.data && Array.isArray(fieldValue?.data) && fieldValue?.data.length === 0 ||
      !fieldValue?.data 
    ) {
      return emptyStatuses[fieldName][fieldValue?.status as keyof typeof emptyStatuses[typeof fieldName]];
    }
    return fieldValue.data;
  }

  const checkValidDate = (fieldName: FieldName, fieldValue: CardFieldValue<CardValue, EmptyValueKeys>) => {
    if (typeof fieldValue?.data === 'string') {
      const date = new Date(fieldValue?.data);
      if (!isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}Z)?$/.test(fieldValue?.data)) {
        fieldValue = {...fieldValue, data: date.toLocaleDateString()}
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
