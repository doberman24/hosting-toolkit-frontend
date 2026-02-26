export type Status = 'ok' | 'warning' | 'error';

export interface DescriptionStatusType {
    ok: string,
    warning: string,
    error: string
}

export interface IStatusDescription {
    statusDescription: DescriptionStatusType,
    getStatus(status: Status): string,
}