interface dates {
    date: string;
    slot: string;    
}

export class Holiday{
    userId:string;
    // approved:boolean;
    // rejected:boolean;
    type: string;
    dates;//dates:dates[];
    daysTaken:number;
    fromDate:string;
    toDate:string;
    status:string;
    comment?:string;
    key?:string;
}

// export enum type {
//     Paid, 
//     Sick, 
//     Leave        
// } 