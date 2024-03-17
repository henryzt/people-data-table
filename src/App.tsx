import DataTable from "./components/DataTable";
import data from "./assets/random-people-data.json";

function App() {
  return (
    <div className="pt-10 md:pt-32">
      <DataTable data={data.ctRoot} />
    </div>
  );
}

export default App;
