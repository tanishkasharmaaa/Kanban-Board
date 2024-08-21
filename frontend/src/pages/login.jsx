import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  function handleForm(e) {
    e.preventDefault()
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch('https://kanban-board-1-5b37.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert('Login Successful');
        // Storing the token in local storage
        localStorage.setItem('accessToken', data.accessToken);
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }

    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleForm}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleForm}
          required
        />
        <br />
        <input type="submit" value="Login" />
        <br />
        {/* Updated Link to point to registration page */}
        <Link to="/register">Not registered? Go back to register</Link>
      </form>
    </>
  );
}

export { Login };
