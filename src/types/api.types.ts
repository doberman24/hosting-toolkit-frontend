import type { AnalysisData } from "./analysis.types";

export interface AnalysisResponse {
    data: AnalysisData | null,
    statusCode: number,
    message: string,
}
