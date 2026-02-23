import axios from "axios";
import type { AnalysisResponse } from "@/types/api.types";

interface IApi {
    getAnalysisData(domain: string): Promise<AnalysisResponse>,
}

export class Api implements IApi {

    async getAnalysisData (domain: string): Promise<AnalysisResponse> {
        const response = await axios({
            method: 'get',
            url: `${domain === 'example.com' ? './mockdata/validData.json' : './mockdata/notValidData.json'}`,
        });
        return { 
            data: response.data,
            statusCode: response.status,
            message: response.statusText,
        };
    };

}