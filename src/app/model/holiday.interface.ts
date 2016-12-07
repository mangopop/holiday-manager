export interface Holiday{
    id?:string;
    type: string;
    dates: string[];
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