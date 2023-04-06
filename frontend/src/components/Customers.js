import React, { useEffect, useState } from "react";
import alert from "../helper/alerts";
import customerServices from "../services/customer.service";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  // alert.showAlert("Example", "success");
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const navigate = useNavigate();

  const getCustomer = async (id) => {
    navigate(`/customer/${id}`)
  };

  const deleteCustomer = async (id) => {
    alert.showConfirmAlert(
      "Are you sure?",
      "You won't be able to revert this!",
      async () => {
        const { data: response } = await customerServices.deleteById(id);
        if (response) {
          const { data: response } = await customerServices.getAll();
          setCustomer(response);
          alert.showAlert("Customer successfully removed", "success");
        }
      }
    );
  };

  const editCustomer = async (id) => {
    const { data: response } = await customerServices.getById(id);
    setCustomer(response);
    console.log(customer);
    navigate(`/edit/${id}`)
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const { data: response } = await customerServices.getAll();
        setCustomers(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchCustomers();
  }, []);

  return (
    <>
      <div className="App">
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-md-4 offset-4">
              <div className="d-grid mx-auto">
                <button className="btn btn-dark" onClick={() => {}}>
                  <i className="fa-solid fa-circle-plus"></i> Add
                </button>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>LastName</th>
                      <th>Email</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {loading && <div>Loading</div>}
                    {!loading &&
                      customers.map((item, id) => (
                        <tr key={id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.lastName}</td>
                          <td>{item.email}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={() => {
                                getCustomer(item.id);
                              }}
                            >
                              <i className="fa-solid fa-info"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={() => {
                                editCustomer(item.id);
                              }}
                            >
                              <i className="fa-solid fa-edit"></i>
                            </button>
                            &nbsp;
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => {
                                deleteCustomer(item.id);
                              }}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;
