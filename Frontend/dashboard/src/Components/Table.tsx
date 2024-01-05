import TableHeader from "../components/TableHeader";
import TableRow from "../components/TableRow";
// interface tableProps{
//     ChainDetails:
//     {
//         "Chain Name":string,
//         "Start Time":string,
//         "End Time":string,
//         "Current Time":string,
//         "Chain Time":string,
//         "Benchmark":string,
//         "Deviation":string
//     }[],

//     HeaderList:string[]
// }

// function Table({ChainDetails,HeaderList}:tableProps){

//     return(
//         <div>
//             <table>
//                 <tr>
//                     {
//                         HeaderList.map(hname=>{
//                             return(
//                                 <td>{hname}</td>
//                             )
//                         })
//                     }
//                 </tr>
//                 {
//                     ChainDetails.map(chainDetail=>{
//                         return (
//                             <tr>
//                                 <td>{chainDetail["Chain Name"]}</td>
//                                 <td>{chainDetail["Start Time"]}</td>
//                                 <td>{chainDetail["End Time"]}</td>
//                                 <td>{chainDetail["Current Time"]}</td>
//                                 <td>{chainDetail["Chain Time"]}</td>
//                                 <td>{chainDetail.Benchmark}</td>
//                                 <td>{chainDetail.Deviation}</td>
//                                 <td><button>Click Here</button></td>
//                             </tr>
//                         );
//                     })
//                 }
//             </table>
//         </div>
//     );
// }

// export default Table;

export type columnProps<T, K extends keyof T> = {
  key: K;
  header: string;
};

type tableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<columnProps<T, K>>;
};

const Table = <T, K extends keyof T>({
  data,
  columns,
}: tableProps<T, K>): JSX.Element => {
  return (
    <table id="table">
      <TableHeader columns={columns}></TableHeader>
      <TableRow data={data} columns={columns}></TableRow>
    </table>
  );
};

export default Table;
