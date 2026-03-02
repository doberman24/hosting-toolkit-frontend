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
    aRecords: {
        data: string[],
        status: string
    },
    aaaaRecords: {
        data: string[],
        status: string
    },
    ttl: number | null,
    nameservers: {
        data: string[],
        status: string
    },
}

export interface SSLResult {
    status: Status,
    issuer: {
        data: string | null,
        status: string
    },
    validFrom: {
        data: string | null,
        status: string
    },
    validTo: {
        data: string | null,
        status: string
    },
    daysRemaining: {
        data: number | null,
        status: string
    },
    protocol: {
        data: string | null,
        status: string
    }
}

export interface HTTPResult {
    status: Status,
    statusCode: {
        data: number,
        status: string
    },
    responseTimeMs: {
        data: number,
        status: string
    },
    redirects: {
        data: number,
        status: string
    },
    finalUrl: {
        data: string | null,
        status: string
    }
}

export interface MailResult {
    status: Status,
    mxRecords: {
        data: MXRecordsType[],
        status: string
    },
    spf: {
        data: string | null,
        status: string
    },
    dmarc: {
        data: string | null,
        status: string
    },
    dkim: {
        data: boolean,
        status: string
    }
}

export type MXRecordsType = {
    host: string,
    priority: number
}

export type CardFieldValue<T, S extends string> = {
    data: T,
    status: S
};
export type CardValue = Status | string | string[] | number | boolean | MXRecordsType | null;

export interface DataLines { 
    boolenData: {
        data: boolean,
        status: string
    },
    stringNullData: {
        data: string | null,
        status: string
    },
    arrayMXData: {
        data: MXRecordsType[],
        status: string
    },
    numberData: {
        data: number,
        status: string
    },
    numberNullData: {
        data: number | null,
        status: string
    },
    arrayStringData: {
        data: string[],
        status: string
    }
}