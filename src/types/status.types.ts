export type Status = 'ok' | 'warning' | 'error';

export interface AnalysisError {
    statusCode: number,
    statusText: string,
    message: string | null,
    details?: any,
    timestamp: string,
}