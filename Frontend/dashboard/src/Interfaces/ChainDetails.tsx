// import { columnProps } from "../Components/Table";

export interface ChainDetails
{
    ChainName:string;
    StartTime:string;
    EndTime:string;
    CurrentTime:string;
    ChainTime:string;
    Benchmark:string;
    Deviation:string;
}

// export const columnList: columnProps<ChainDetails, keyof ChainDetails>[]=[
//     {
//         key:'ChainName',
//         header:'Chain Name'
//     },
//     {
//         key:'StartTime',
//         header:'Start Time'
//     },
//     {
//         key:'EndTime',
//         header:'End Time'
//     },
//     {
//         key:'CurrentTime',
//         header:'Current Time'
//     },
//     {
//         key:'ChainTime',
//         header:'Chain Time'
//     },
//     {
//         key:'Benchmark',
//         header:'Benchmark'
//     },
//     {
//         key:'Deviation',
//         header:'Deviation'
//     }
// ]

// // export const chainList:ChainDetails[]=[
// //     {
// //         ChainName:"Chain1",
// //         StartTime:"2023/11/01 00:00:00.000",
// //         EndTime:"2023/11/01 00:00:00.000",
// //         CurrentTime:"2023/11/01 00:00:00.000",
// //         ChainTime:"2023/11/01 00:00:00.000",
// //         Benchmark:"30 min",
// //         Deviation:"50%"
// //     }
// // ]