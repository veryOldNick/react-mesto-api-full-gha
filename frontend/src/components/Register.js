import { useState } from "react";
import { Link } from "react-router-dom";


function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {        
    evt.preventDefault();
    props.handleRegister({ email, password });
  };

  const handleChangeEmail = (e) => {setEmail(e.target.value)};
  const handleChangePassword = (e) => {setPassword(e.target.value)};

  return (
    <section className="auth">
            <h2 className="auth__heading">Регистрация</h2>
            <div className="auth__container">
                <form className="auth__form" id="auth-form-login" onSubmit={handleSubmit}>
                    <input 
                      className="auth__form-input" 
                      type="email" 
                      placeholder="Почта" 
                      name="email" 
                      minLength="2" 
                      maxLength="35"
                      value={email || ''} 
                      onChange={handleChangeEmail}
                    />
                    <input 
                      className="auth__form-input"
                      type="password"
                      placeholder="Пароль" 
                      name="password" 
                      minLength="6" 
                      maxLength="16"
                      value={password || ''} 
                      onChange={handleChangePassword}
                    />
                    <button className="auth__form-button" type="submit">Зарегистрироваться</button>
                    <Link to="/sign-in" className="auth__link">Уже зарегистрированы? Войти</Link>
                </form>
            </div>
        </section>    
  )
};

export default Register;
