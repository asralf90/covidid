import { useState, useEffect } from "react";

//custom localstorage hooks
const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) || ""
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [localStorageKey, value]);

  return [value, setValue];
};
export default useStateWithLocalStorage;
