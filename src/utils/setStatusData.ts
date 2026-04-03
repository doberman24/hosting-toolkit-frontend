import { emptyStatuses, type EmptyValueKeys } from "@/pages/AnalysisPage/analysis.config";

export const setStatusData = (status: string, key: EmptyValueKeys) => {
    if (status !== 'ok') return emptyStatuses[key][status as keyof typeof emptyStatuses[EmptyValueKeys]];
    return 'ok';
}

export const setClassStatus = (status: string | string[]) => {
    if (status === 'ok') return 'ok';
    if (status === 'not_found' || status === 'undefined' || status === 'not_resolve') return 'error';
    return 'warning';
}
