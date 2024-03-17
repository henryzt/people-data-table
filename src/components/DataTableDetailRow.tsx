import { PersonRecord } from "../types";

const DataTableDetailRow = ({ person }: { person: PersonRecord }) => {
  return (
    <tr>
      <td></td>
      <td colSpan={5} className="!pt-0">
        <div className="grid grid-cols-2 whitespace-normal bg-gray-100 py-3 px-8 rounded-lg">
          <div className="grid grid-cols-4 items-center">
            <div className="info-title">Telephone</div>
            <div className="info-body">{person.telephone}</div>

            <div className="info-title">Email</div>
            <div className="info-body">{person.email}</div>

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

export default DataTableDetailRow;
