import './Login.css';
import '../../components/inputs/Inputs.css';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../Firebase';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

export default () => {

  document.documentElement.scrollTop = 0;

  const navigate = useNavigate();

  useEffect(() => {
    let isAutenticated = localStorage.getItem("key");
    if(isAutenticated){
      navigate("/app");
    }
  }, []);

  //FAZER LOGIN
  function modalAvisoFuncLogin(){
    let modalAviso = document.querySelector(".modal-aviso-login");

    modalAviso.classList.add("active-modal-aviso-login");
    setTimeout(() => {
      modalAviso.classList.remove("active-modal-aviso-login");
    }, 2000);
  }

  function logIn(){
    let email = document.getElementById("email").value,
        senha = document.getElementById("senha").value,
        p = document.querySelector(".modal-aviso-login p"),
        key = Math.floor(Math.random() * 500);

    if(email.length != 0 && senha.length != 0){
      auth.signInWithEmailAndPassword(email, senha)
      .then(() => {
        localStorage.setItem("key", key);
        navigate("/app");
      })
      .catch(() => {
        p.textContent = `*Email/Senha incorreto(a)`;
        modalAvisoFuncLogin();
      })
    } else{
      p.textContent = "*Preencha todos os campos";
      modalAvisoFuncLogin();
    }
  }

  return(
    <div>
      <Header/>
      <div className="login-container">
        <div className="modal-aviso modal-aviso-login">
          <p></p>
        </div>
        <div className="content-box content-box-left-login">
          <h1>Seja muito bem-vindo(a)!</h1>
          <p>Informe seu email e sua senha para acessar o aplicativo.</p>
        </div>
        <div className="content-box content-box-right-login">
          <div className="form">
            <div className="input-box">
              <label htmlFor="email">Email</label>
              <div className="input">
                <ion-icon name="mail"></ion-icon>
                <input type="email" placeholder="Email" id="email"/>
              </div>
            </div>
            <div className="input-box">
              <label htmlFor="senha">Senha</label>
              <div className="input">
                <ion-icon name="lock-closed"></ion-icon>
                <input type="password" placeholder="Senha" id="senha"/>
              </div>
            </div>
            <button onClick={logIn}>Login</button>
            <Link to="/cadastro">Ainda não possui uma conta? Crie uma aqui</Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}