import type { Status } from "./status.types";
import type { AnalysisError } from './error.types';


export interface AnalysisState {
    analysisData: AnalysisData | null,
    loading: boolean,
    error: AnalysisError | null,
    message: string | null
}

export interface AnalysisData {
    domain: string,
    checkedAt: string,
    summary: {
        status: Status,
        score: number,
        message: string
    },
    checks: {
        dns: DNSResult,
        ssl: SSLResult,
        http: HTTPResult,
        mail: MailResult,
    }
}

export interface DNSResult {
    status: Status,
    aRecords: FieldResult<string[]>,
    aaaaRecords: FieldResult<string[]>,
    ttl: FieldResult<number | null>,
    nameservers: FieldResult<NameServerType[]>,
}

export interface SSLResult {
    status: Status,
    issuer: FieldResult<string | null>,
    validFrom: FieldResult<string | null>,
    validTo: FieldResult<string | null>,
    daysRemaining: FieldResult<number | null>,
    protocol: FieldResult<string | null>
}

export interface HTTPResult {
    status: Status,
    statusCode: FieldResult<number>,
    responseTimeMs: FieldResult<number>,
    redirects: FieldResult<number>,
    finalUrl: FieldResult<string | null>
}

export interface MailResult {
    status: Status,
    mxRecords: FieldResult<MXRecordsType[]>,
    spf: FieldResult<string | null>,
    dmarc: FieldResult<string | null>,
    dkim: FieldResult<boolean>
}

export type NameServerType = string | { [ns: string]: string | string[] }

export type MXRecordsType = {
    host: string,
    priority: number
}

export interface FieldResult<T> {
    data: T,
    status: Status
}