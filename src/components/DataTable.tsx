import "./DataTable.css";
import { Fragment, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { PersonRecord } from "../types";
import DataTableDetailRow from "./DataTableDetailRow";

interface DataTableProps {
  data: PersonRecord[];
}

const DataTable = ({ data }: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage] = useState(10);

  const startRow = currentPage * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const displayedData = data.slice(startRow, endRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const [selectedRow, setSelectedRow] = useState<string>();

  return (
    <div className="max-w-4xl mx-auto">
      {/* table body */}
      <div className="border rounded-lg">
        <table className="data-table">
          <thead className="border-b">
            <tr>
              <th></th>
              <th>Name</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Salary</th>
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
                    <td>{person.name}</td>
                    <td>{person.dob}</td>
                    <td>{person.email}</td>
                    <td>{person.verified ? "Yes" : "No"}</td>
                    <td>{person.salary}</td>
                  </tr>
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
          <div className="flex-1">
            Page {currentPage + 1} of {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
            disabled={currentPage === 0}
          >
            ←
          </button>
          <button
            onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
            disabled={endRow >= data.length}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
