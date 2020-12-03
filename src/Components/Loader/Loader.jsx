function Loader() {
  return (
    <div className="position-absolute flex-column d-flex justify-content-center align-items-center bg-light  min-vw-100 min-vh-100">
      <h1 className="d-block my-4"> Loading ... </h1>
      <div className="d-block">
        <div className="spinner-grow display-1 text-primary"></div>
      </div>
    </div>
  );
}
export default Loader;
