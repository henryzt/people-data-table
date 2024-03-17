import { Fragment, useState } from "react";
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

  const [selectedRow, setSelectedRow] = useState<string>();

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
            {displayedData.map((person, index) => {
              const isSelected = selectedRow === person._id;
              return (
                <Fragment key={index}>
                  <tr
                    className={`cursor-pointer ${isSelected ? "selected border-none" : "tr-hover"}`}
                    onClick={() => setSelectedRow(isSelected ? undefined : person._id)}
                  >
                    <td>{person.name}</td>
                    <td>{person.dob}</td>
                    <td>{person.email}</td>
                    <td>{person.verified ? "Yes" : "No"}</td>
                    <td>{person.salary}</td>
                  </tr>
                  {isSelected && <DetailRow person={person} />}
                </Fragment>
              );
            })}
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

const DetailRow = ({ person }: { person: PersonRecord }) => {
  return (
    <tr>
      <td colSpan={5} className="!pt-0">
        <div className="grid grid-cols-2 whitespace-normal bg-gray-100 p-3 rounded-lg">
          <div className="grid grid-cols-4 items-center">
            <div className="info-title">Telephone</div>
            <div className="info-body">{person.telephone}</div>

            <div className="info-title">Pets</div>
            <div className="info-body">{person.pets.join(", ")}</div>

            <div className="info-title">Score</div>
            <div className="info-body">{person.score}</div>

            <div className="info-title">URL</div>
            <div className="info-body">{person.url}</div>
          </div>

          <div>
            <div className="info-title">Address</div>
            <div className="info-body">
              <div>{person.address.street}</div>
              <div>{person.address.town}</div>
              <div>{person.address.postode}</div>
            </div>

            <div className="info-title">Description</div>
            <div className="info-body">{person.description}</div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default DataTable;
