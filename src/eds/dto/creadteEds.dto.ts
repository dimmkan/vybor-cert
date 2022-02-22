export class CreateEdsDto {
    readonly organization: string;
    readonly position: string;
    readonly fullname: string;
    readonly accountId: number;
    readonly inn: string;
    readonly certificateSerial: string;
    readonly vendor: string;
    readonly usageType: string;
    readonly fromDate: string;
    readonly toDate: string;
    readonly comment: string;
}