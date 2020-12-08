import "./Loader.scss";
function Loader() {
  return (
    <div className=" position-absolute flex-column d-flex justify-content-center align-items-center bg-dark  min-vw-100 min-vh-100">
      
      <h1 className="text-white w-100 text-center  d-block my-4">Loading ...</h1>

      <div className="loader text-center spinner-grow display-1 text-primary"></div>
    </div>
  );
}
export default Loader;
