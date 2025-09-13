import UserForm from "../components/UserForm";
import "./Register.module.css";

function Register() {
  return (
    <>
      <h2 className="text-center bold user-header">Register an account</h2>
      <UserForm></UserForm>
    </>
  );
}

export default Register;
