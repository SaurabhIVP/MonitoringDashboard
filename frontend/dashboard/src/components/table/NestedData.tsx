import React from "react";
import { MRT_ColumnDef, MaterialReactTable } from "material-react-table";
import { Box, Paper } from "@mui/material";
import { TableLabels } from "./TableContents";
import { useMemo } from "react";
import {
  NormalFontSize,
  PrimaryColor,
  SecondaryColor,
} from "../../utils/Colors";

// Define the Task type
interface Task {
  name: string; // Corresponds to "name"
  start_time: string; // Corresponds to "start_time"
  end_time: string; // Corresponds to "end_time"
  status: string; // Corresponds to "status"
  total_times: string; // Corresponds to "total_times"
  avg_total_time: string; // Corresponds to "avg_total_time"
  deviation_in_time: string; // Corresponds to "deviation_in_time"
  performance: string; // Corresponds to "performance"
}

// Define props for the DetailPanel component
interface DetailPanelProps {
  tasks: Task[];
}

// DetailPanel Component
const NestedData: React.FC<DetailPanelProps> = ({ tasks }) => {
  // Define columns with the same structure as your main table
  const columns1 = useMemo<MRT_ColumnDef<any>[]>(
    () =>
      TableLabels.map(([acc, head, is_deviation, is_name, al]) => ({
        muiTableHeadCellProps: ({ column }) => ({
          align: "left",
          size: "medium",
          sx: {
            "& .MuiBox-root ": {
              color: SecondaryColor,
            },
            ".css-fv3lde": {
              fontSize: NormalFontSize,
            },
            backgroundColor: PrimaryColor,
            color: SecondaryColor,
            maxHeight: "10px",
            borderSpacing: "1px",
            borderColor: "#5F9EA0",
            fontSize: NormalFontSize,
            fontFamily: "roboto",
            marginLeft: "0px",
            paddingTop: "0px",
            paddingBottom: "0px",
            fontWeight: "6px",
            // alignContent: "center",
            ".css-lapokc": {
              minWidth: "4ch",
            },
            "& .Mui-TableHeadCell-Content": {
              justifyContent: "flex-end",
            },
            ".css-i4bv87-MuiSvgIcon-root": {
              color: SecondaryColor,
            },
            "& .Mui-TableHeadCell-Content-Labels": {
              padding: "0px",
              margin: "auto",
            },
            ".css-118d58w-MuiButtonBase-root-MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon":
              {
                color: SecondaryColor,
              },
          },
        }),
        muiTableBodyCellProps: {
          align:
            al.toString() === "center"
              ? "center"
              : al.toString() === "left"
              ? "left"
              : "right",

          style: {
            fontFamily: "roboto",

            maxWidth: "100%", // Ensure the cell does not overflow
            overflow: "hidden", // Hide overflow content
            textOverflow: "ellipsis", // Ellipsis for overflow text
            whiteSpace: "nowrap", // Prevent text wrapping

            fontSize: NormalFontSize,
            border: "none",
            marginLeft: "0px",
            ".css-y6rp3m-MuiButton-startIcon>*:nth-of-type(1)": {
              color: "black",
            },
          },
        },

        accessorKey: acc.toString(),
        filterFn: "contains",
        columnFilterModeOptions: is_name
          ? []
          : [
              "between",
              "betweenInclusive",
              "contains",
              "greaterThan",
              "greaterThanOrEqualTo",
              "inNumberRange",
              "lessThan",
              "lessThanOrEqualTo",
              "notEquals",
            ],
        header: head.toString(),
        Cell: ({ cell, row }) => (
          <div>
            {is_name ? (
              <div
                style={{
                  color: "black",
                  fontFamily: "roboto",
                  fontWeight: row.getIsExpanded() ? "bold" : "normal",
                  marginLeft: "20px",
                  fontSize: NormalFontSize,
                }}
              >
                {cell.getValue<string>()}
              </div>
            ) : is_deviation ? (
              <div>
                <Box
                  component="div"
                  sx={(theme: any) => ({
                    width: "32px",
                    backgroundColor:
                      cell.getValue<string>() < "0"
                        ? theme.palette.error.dark
                        : cell.getValue<string>() >= "0" &&
                          cell.getValue<string>() <= "10"
                        ? "lightgreen"
                        : cell.getValue<string>() >= "-10" &&
                          cell.getValue<string>() < "0"
                        ? "coral"
                        : theme.palette.success.dark,
                    borderRadius: "10%",
                    // color: "#fff",
                    p: "3px",
                    fontSize: NormalFontSize,
                    color: "white",
                    fontFamily: "roboto",
                    fontWeight: row.getIsExpanded() ? "bold" : "normal",
                    marginLeft: "70px",
                  })}
                >
                  {cell.getValue<string>()}
                </Box>
              </div> // Render empty div if is_deviation is true
            ) : (
              <div>
                {cell.getValue<string>() == undefined ||
                cell.getValue<string>() == null ? (
                  <div
                    style={{
                      color: "black",
                      fontFamily: "roboto",
                      fontWeight: row.getIsExpanded() ? "bold" : "normal",
                      marginLeft: "20px",
                      fontSize: NormalFontSize,
                    }}
                  >
                    {"No Data"}
                  </div>
                ) : (
                  <div
                    style={{
                      color: "black",
                      fontFamily: "roboto",
                      fontWeight: row.getIsExpanded() ? "bold" : "normal",
                      marginLeft: "20px",
                      fontSize: NormalFontSize,
                    }}
                  >
                    {cell.getValue<string>()}
                  </div>
                )}
              </div>
            )}
          </div>
        ),
      })),
    [TableLabels]
  );

  return (
    <Box
      p={0}
      sx={{
        margin: 0,
        width: "100%",
        "& .MuiTable-root": {
          borderCollapse: "collapse", // Ensure no extra space from borders
        },
        "& .MuiTableCell-root": {
          padding: "4px", // Reduce padding inside cells
        },
        "& .MuiTableHead-root": {
          backgroundColor: "#007bff", // Replace with PrimaryColor
          color: "black",
          fontFamily: "roboto",
          fontWeight: "normal",
        },
        "& .MuiTableBody-root": {
          "& tr": {
            borderBottom: "1px solid light-grey", // Style for rows
          },
        },
      }}
    >
      <MaterialReactTable
        columns={columns1}
        data={tasks}
        enablePagination={false}
        enableDensityToggle={false}
        enableToolbarInternalActions={false}
      />
    </Box>
  );
};

export default NestedData;
