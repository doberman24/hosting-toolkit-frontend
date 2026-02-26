import type { CardFieldValue } from "@/types/analysis.types";
import { type ReactElement } from "react";
import styles from './CheckRow.module.scss';
import { emptyStatus, keyMapping, type EmptyValue, type FieldName } from "@/pages/AnalysisPage/analysis.config";

const CheckRow = ({fieldName, fieldValue}: {fieldName: FieldName, fieldValue: CardFieldValue}) => {

  const getConvertValue = (fieldValue: CardFieldValue): ReactElement => {
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

  const checkExistData = (fieldValue: CardFieldValue) => {
    if (
      fieldValue && Array.isArray(fieldValue) && fieldValue.length === 0 ||
      !fieldValue
    ) {
      return emptyStatus[fieldName as EmptyValue].error;
    }
    return fieldValue;
  }

  const checkValidDate = (fieldValue: CardFieldValue) => {
    if (typeof fieldValue === 'string') {
      const date = new Date(fieldValue);
      if (!isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}Z)?$/.test(fieldValue)) {
        return date.toLocaleDateString();
      }
      return checkExistData(fieldValue);
    }
    return checkExistData(fieldValue);
  }

  return (
    <li className={styles.checkRowBlock}>
      <div className={styles.nameProperty}>
        {keyMapping[fieldName] ?? fieldName} :
      </div> 
      {getConvertValue(checkValidDate(fieldValue))}
    </li>
  )
}

export default CheckRow;
