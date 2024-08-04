import "./Loader.css";
function Loader() {
  return (
    <div className="loader fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#0b0b0c] text-white/90">
      <p className="heading">Loading</p>
      <div className="loading">
        <div className="load"></div>
        <div className="load"></div>
        <div className="load"></div>
        <div className="load"></div>
      </div>
    </div>
  );
}

export default Loader;
