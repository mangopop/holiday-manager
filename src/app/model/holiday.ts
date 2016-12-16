export class Holiday{
    userId:string;
    approved:boolean;
    rejected:boolean;
    type: string;
    dates: any[];
    daysTaken:number;
    fromDate:string;
    toDate:string;
    status?:string;
    comment?:string;
}

// export enum type {
//     Paid, 
//     Sick, 
//     Leave        
// }