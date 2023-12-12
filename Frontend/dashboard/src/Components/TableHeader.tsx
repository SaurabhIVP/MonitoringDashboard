import {columnProps} from "../Components/Table"

type tableHeaderProps<T,K extends keyof T>={
    columns: Array<columnProps<T,K>>;
}

const TableHeader=<T, K extends keyof T>({columns}:tableHeaderProps<T,K>):JSX.Element=>{
    return(
        <tr>
            {
                columns.map(column=>{
                    return(
                        <th>{column.header}</th>
                    );
                })
            }
        </tr>  
    );
}

export default TableHeader;