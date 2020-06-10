import axios from "axios";

// const getUserId = async (user) => {
//   const result = await axios.post("/auth/getuser", user);
//   return result;
// };

const signin = async (user) => {
  const result = await axios.post("/auth/signin", user);
  return result;
};

const signup = async (user) => {
  const result = await axios.post("/auth/signup", user);
  return result;
};

const hasSignned = async () => {
  const result = await axios.get("/auth/hassignned");
  return result;
};

const signout = async () => {
  const result = await axios.get("/auth/signout");
  return result;
};

const qrcode = async () => {
  const result = await axios.get("/auth/qrcode/:adminid");
  return result;
};

const submitted = async (user) => {
  const result = await axios.post("/auth/submitted", user);
  return result;
};

export { signin, signup, hasSignned, signout, qrcode, submitted };
