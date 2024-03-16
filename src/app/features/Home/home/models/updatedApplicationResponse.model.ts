import { ApplicationResponse } from "./application-response.model";

export interface UpdatedApplicationResponse{
    response:ApplicationResponse[];
    totalRecords:number;
}