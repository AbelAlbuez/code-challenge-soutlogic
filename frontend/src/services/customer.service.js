import axios from "axios";
import endpoints from "../common/routes.enum";
const baseURL = `${process.env.REACT_APP_BACKEND_BASE_URL}`;

const getAll = () => {
  const path = `${baseURL}/${endpoints.customers}`;
  return axios.get(path);
};

const getById = (id) => {
  const path = `${baseURL}/${endpoints.customers}/${id}`;
  return axios.get(path);
};

const deleteById = (id) => {
    const path = `${baseURL}/${endpoints.customers}/${id}`;
    return axios.delete(path);
  };

const customerServices = {
  getAll,
  getById,
  deleteById
};
export default customerServices;
