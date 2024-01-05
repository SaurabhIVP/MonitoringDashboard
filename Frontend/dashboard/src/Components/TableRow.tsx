import { columnProps } from "../components/Table";

type tableRowProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<columnProps<T, K>>;
};

const TableRow = <T, K extends keyof T>({
  data,
  columns,
}: tableRowProps<T, K>): JSX.Element => {
  const rowCount = data.length;
  console.log(rowCount);
  let rows;
  if (rowCount > 0) {
    rows = data.map((row, i) => {
      return (
        <tr key={`row-${i}`}>
          {columns.map((col, i2) => {
            return <td key={`col-${i2}`}>{`${row[col.key]}`}</td>;
          })}
        </tr>
      );
    });
  } else {
    rows = (
      <tr>
        <td colSpan={columns.length} id="NoData">
          No Data
        </td>
      </tr>
    );
  }

  return <tbody>{rows}</tbody>;
};

export default TableRow;
