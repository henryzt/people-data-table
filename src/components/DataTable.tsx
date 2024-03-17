import "./DataTable.css";
import { Fragment, useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { PersonRecord } from "../types";
import DataTableDetailRow from "./DataTableDetailRow";

interface DataTableProps {
  data: PersonRecord[];
}

const textSorter = (a: string, b: string) => a.localeCompare(b);
const numberSorter = (a: number, b: number) => a - b;
const dateSorter = (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime();
const booleanSorter = (a: boolean, b: boolean) => (a === b ? 0 : a ? 1 : -1);
type Sorter = typeof textSorter | typeof numberSorter | typeof dateSorter | typeof booleanSorter;

const booleanFormatter = (value: boolean) => (value ? "Yes" : "No");
const numberFormatter = (value: number) =>
  value.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
type Formatter = typeof booleanFormatter | typeof numberFormatter;

const DataTable = ({ data }: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState<string>();

  useEffect(() => {
    // scroll to top and clear selected row
    window.scrollTo(0, 0);
    setSelectedRow(undefined);
  }, [currentPage]);

  const columns: {
    key: keyof PersonRecord;
    label: string;
    sorter?: Sorter;
    formatter?: Formatter;
  }[] = [
    { key: "name", label: "Name", sorter: textSorter },
    { key: "dob", label: "DOB", sorter: dateSorter },
    { key: "email", label: "Email", sorter: textSorter },
    { key: "verified", label: "Verified", sorter: booleanSorter, formatter: booleanFormatter },
    { key: "salary", label: "Salary", sorter: numberSorter, formatter: numberFormatter },
  ];

  const [sortKey, setSortKey] = useState<keyof PersonRecord | undefined>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (key: keyof PersonRecord) => {
    if (sortKey === key) {
      setSortDirection((sortDirection) => (sortDirection === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a: PersonRecord, b: PersonRecord) => {
    if (sortKey) {
      const sorter = columns.find((column) => column.key === sortKey)?.sorter;
      if (sorter) {
        return (
          sorter(a[sortKey] as never, b[sortKey] as never) * (sortDirection === "asc" ? 1 : -1)
        );
      }
    }
    return 0;
  });

  const startRow = currentPage * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const displayedData = sortedData.slice(startRow, endRow);

  return (
    <div className="max-w-4xl mx-auto">
      {/* table body */}
      <div className="border rounded-lg">
        <table className="data-table">
          <thead className="border-b">
            <tr>
              <th></th>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="sortable-header"
                  onClick={() => column.sorter && handleSort(column.key)}
                >
                  {column.label}{" "}
                  {!!column.sorter &&
                    (sortKey === column.key ? (sortDirection === "asc" ? "↑" : "↓") : "")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedData.map((person, index) => {
              const isSelected = selectedRow === person._id;
              return (
                <Fragment key={index}>
                  <tr
                    className={`cursor-pointer ${isSelected ? "selected" : "tr-hover"}`}
                    onClick={() => setSelectedRow(isSelected ? undefined : person._id)}
                  >
                    <td className="w-5 !pr-0 opacity-40">
                      {isSelected ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </td>
                    {/* column data */}
                    {columns.map((column, index) => (
                      <td key={index}>
                        {column.formatter
                          ? column.formatter(person[column.key] as never)
                          : (person[column.key] as string)}
                      </td>
                    ))}
                  </tr>
                  {/* row expander */}
                  {isSelected && <DataTableDetailRow person={person} />}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div>
        <div className="flex gap-2 my-3 items-center">
          <div>
            Page {currentPage + 1} of {totalPages}
          </div>

          <select
            className="border rounded-md p-1"
            onChange={(e) => {
              setRowPerPage(Number(e.target.value));
            }}
          >
            <option value="10">10 Rows</option>
            <option value="20">20 Rows</option>
            <option value="50">50 Rows</option>
          </select>

          <div className="flex-1"></div>

          <button
            onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
            disabled={currentPage === 0}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
            disabled={endRow >= data.length}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
