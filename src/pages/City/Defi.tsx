import Layout from "../../components/Layout";

function Defi() {
  return (
    <Layout>
      <div className="container">
        <h1 className="text-center text-light mb-5 pb-5">Defi</h1>
        <div className="row justify-content-center">
          <div className="col-3">
            <div className="icon-box d-flex align-items-center text-center">
              <h4 className="w-100"><a href="">Swap</a></h4>
            </div>
          </div>
          <div className="col-3">
            <div className="icon-box d-flex align-items-center text-center">
              <h4 className="w-100"><a href="">Pools</a></h4>
            </div>
          </div>
          <div className="col-3">
            <div className="icon-box d-flex align-items-center text-center">
              <h4 className="w-100"><a href="">Rent</a></h4>
            </div>
          </div>
          <div className="col-3">
            <div className="icon-box d-flex align-items-center text-center">
              <h4 className="w-100"><a href="">Bridge</a></h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Defi
