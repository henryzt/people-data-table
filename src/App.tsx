import "./App.css";
import DataTable from "./components/DataTable";
import data from "./assets/random-people-data.json";

function App() {
  return (
    <>
      <DataTable data={data.ctRoot} />
    </>
  );
}

export default App;
