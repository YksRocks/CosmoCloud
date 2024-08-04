import EmployeeList from "../components/EmployeeList/EmployeeList";

function Home() {
  return (
    <div className="px-8 md:px-14 lg:px-20  py-10 pt-24">
      <div className="flex flex-row justify-between">
        <h2 className="text-white/90 text-2xl font-semibold">Employees</h2>
      </div>
      <EmployeeList />
    </div>
  );
}

export default Home;
