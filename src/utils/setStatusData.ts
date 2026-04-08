import { emptyStatuses, type EmptyValueKeys } from "@/pages/AnalysisPage/analysis.config";

export const setStatusData = (status: string, key: EmptyValueKeys, isOk = true) => {
    if (status !== 'ok') return emptyStatuses[key][status as keyof typeof emptyStatuses[EmptyValueKeys]];
    return isOk ? 'ok' : '';
}

export const setClassStatus = (status: string | string[], isOk = true) => {
    const errorStatus = ['not_found', 'undefined', 'not_resolve', 'error', 'older', 'invalid_domain'];
    if (status === 'ok') return isOk ? 'ok' : '';
    if (errorStatus.includes(status as string)) return 'error';
    return 'warning';
}
