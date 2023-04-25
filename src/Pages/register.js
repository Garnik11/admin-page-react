import { useState } from 'react';

function Register() {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });


  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={(e) => {
        setUser({
         
          username: "",
          password: ""
        })
        e.preventDefault()
      }}>
        
       
        <label>
          Username:
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </label>
        <br />
        <button onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
}

export default Register;
