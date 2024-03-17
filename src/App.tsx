import DataTable from "./components/DataTable";
import data from "./assets/random-people-data.json";

function App() {
  return (
    <div className="mt-10 md:mt-32">
      <DataTable data={data.ctRoot} />
    </div>
  );
}

export default App;
