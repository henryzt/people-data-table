import { useState } from "react";

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
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const startRow = currentPage * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const displayedData = data.slice(startRow, endRow);

  return (
    <div>
      {/* table body */}
      <table>
        <thead>
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

      {/* pagination */}
      <div className="flex gap-2">
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
  );
};

export default DataTable;
