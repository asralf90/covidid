import axios from "axios";

const addCustomer = async (user) => {
  const result = await axios.post("/customerinfo/add", user);
  return result;
};

const getCustomer = async () => {
  const result = await axios.get("/customerinfo/get");
  return result;
};

const deleteData = async (user) => {
  const result = await axios.delete("/customerinfo/deleteword/:cardId", user);
  return result;
};

export { addCustomer, getCustomer, deleteData };
