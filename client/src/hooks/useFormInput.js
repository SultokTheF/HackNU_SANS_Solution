import { useState } from "react";

const useFormInput = (initialState) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const resetForm = () => {
    setValues(initialState);
  };

  return { values, handleInputChange, resetForm };
};

export default useFormInput;
