import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import customerServices from "../services/customer.service";

const AddOrUpdateCustomer = () => {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState({});
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  const back = () => {
    navigate(`/`);
  };
  const { id } = useParams();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const { data: response } = await customerServices.getById(id);
        const { addresses } = response;
        setCustomer(response);
        setAddresses(addresses);
        console.log("customer", customer);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    if (id) {
      fetchCustomers();
    }
  }, []);

  return (
    <>
      <h1> {id>0 ? "Actualizar" : "Agregar"} Customer</h1>
      <button
        type="button"
        className="btn btn-info"
        onClick={() => {
          back();
        }}
      >
        Volver
      </button>
      <div class="container">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            ></input>
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            ></input>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            ></input>
            <label class="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddOrUpdateCustomer;
