import type { FieldResult } from "@/types/analysis.types";


export const checkEmptyData = (value: FieldResult<string[] | number | string | null>) => {
    if (!value.data || Array.isArray(value.data) && value?.data.length === 0) {
        return '- пусто -';
    }
    return value.data ? value.data : '- пусто -';
}
