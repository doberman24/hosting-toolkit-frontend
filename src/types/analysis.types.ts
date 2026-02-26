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
    aRecords: string[],
    aaaaRecords: string[],
    ttl: number | null,
    nameservers: string[],
}

export interface SSLResult {
    status: Status,
    issuer: string | null,
    validFrom: string | null,
    validTo: string | null,
    daysRemaining: number | null,
    protocol: string | null
}

export interface HTTPResult {
    status: Status,
    statusCode: number,
    responseTimeMs: number,
    redirects: number,
    finalUrl: string | null
}

export interface MailResult {
    status: Status,
    mxRecords: MXRecordsType[],
    spf: string | null,
    dmarc: string | null,
    dkim: boolean
}

export type MXRecordsType = {
    host: string,
    priority: number
}

export type CardFieldValue = Status | string | string[] | number | boolean | MXRecordsType | null;