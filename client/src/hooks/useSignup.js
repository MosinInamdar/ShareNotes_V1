import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const signup = async ({ name, email, password, confirmPassword }) => {
    const success = handleInputErrors({
      name,
      email,
      password,
      confirmPassword,
    });
    if (!success) return;

    setLoading(true);
    try {
      const details = { name, email, password, confirmPassword };
      const res = await axios.post(
        "http://localhost:8080/api/v1/users",
        details
      );
      console.log(res);
      const data = res.data.newUser.name;
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      if (res.status === 201) {
        // toast.success("User created successfully");
        console.log("User created successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sign Up Failed. Email already in use.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;

function handleInputErrors({ name, email, password, confirmPassword }) {
  if (!name || !email || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
