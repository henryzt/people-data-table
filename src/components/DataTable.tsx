import { useState } from "react";
import "./DataTable.css";

interface PersonRecord {
  _id: string;
  name: string;
  dob: string;
  address: {
    street: string;
    town: string;
    postode: string;
  };
  telephone: string;
  pets: string[];
  score: number;
  email: string;
  url: string;
  description: string;
  verified: boolean;
  salary: number;
}

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="border rounded-lg">
        {/* table body */}
        <table className="data-table">
          <thead className="border-b">
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((person, index) => (
              <tr key={index}>
                <td>{person.name}</td>
                <td>{person.dob}</td>
                <td>{person.email}</td>
                <td>{person.verified ? "Yes" : "No"}</td>
                <td>{person.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        {/* pagination */}
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
