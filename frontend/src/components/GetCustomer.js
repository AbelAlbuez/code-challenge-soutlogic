import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import customerServices from "../services/customer.service";

const GetCustomer = () => {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState({});
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  const back = ()=> {
    navigate(`/`)
  }

  let { id } = useParams();
   
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

    fetchCustomers();
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-info"
        onClick={() => {
          back();
        }}
      >
       Volver 
      </button>
      {loading && <div>Loading</div>}
      {!loading && (
        <div>
          <p>Nombre: {customer.name}</p>
          <p>Apellido: {customer.lastName}</p>
          <p>Correo Electronico: {customer.email}</p>
          <p>Direcciones:</p>
          <ul>
            {addresses.map((item, id) => (
              <li>
                {item.name} - {item.address}{" "}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default GetCustomer;
