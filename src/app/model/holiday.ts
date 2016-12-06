export class Holiday{
    id?:string;
    type: string;
    dates: string[];
    daysTaken:number;
    fromDate:string;
    toDate:string;
    comment?:string;
}

// export enum type {
//     Paid, 
//     Sick, 
//     Leave        
// }