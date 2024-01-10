import TableHeader from "../Components/TableHeader"
import TableRow from "../Components/TableRow";

export type columnProps<T, K extends keyof T>={
    key:K;
    header:string;
    action:boolean;
}

type tableProps<T, K extends keyof T>={
    data: Array<T>;
    columns: Array<columnProps<T,K>>;
}

const Table =<T,K extends keyof T>({data,columns}:tableProps<T,K>): JSX.Element=>{
    return(
        <div className="table">
            <div className="tableFixHead">
                    <table>
                    <TableHeader columns={columns}></TableHeader>
                    <TableRow data={data} columns={columns}></TableRow>
                    </table>
            </div>
        </div>
    );
}

export default Table;