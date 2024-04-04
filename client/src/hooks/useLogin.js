import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
    setLoading(true);
    try {
      const logindata = {
        email,
        password,
      };
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        logindata
      );

      // Attempt to read the response body as text first
      const data = res.data.name;
      const userid = res.data.userId;

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("userId", JSON.stringify(userid));

      setAuthUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed. Please check your credentials and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    alert("Please fill in all fields");
    return false;
  }

  return true;
}
