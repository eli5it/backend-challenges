import styles from "./UserForm.module.css";
function UserForm() {
  const submitHandler = () => {};

  return (
    <form onSubmit={submitHandler} className={styles.userForm}>
      <label htmlFor="username">username</label>
      <input name="username" type="text" />

      <label htmlFor="password">password</label>
      <input name="password" type="text" />
      <button>Submit</button>
    </form>
  );
}

export default UserForm;
