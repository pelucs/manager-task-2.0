import './Cadastro.css';
import '../../components/inputs/Inputs.css';
import { auth } from '../../Firebase';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

  //CRIAR CONTA
  function modalAvisoFunc(){
    let modalAviso = document.querySelector(".modal-aviso-cadastro");

    modalAviso.classList.add("active-modal-aviso-cadastro");
    setTimeout(() => {
      modalAviso.classList.remove("active-modal-aviso-cadastro");
    }, 2000);
  }

  function criarConta(){
    let nome = document.getElementById("nome"),
        sobrenome = document.getElementById("sobrenome"),
        email = document.getElementById("email"),
        confirmemail = document.getElementById("confirmemail"),
        senha = document.getElementById("senha"),
        confirmsenha = document.getElementById("confirmsenha"),
        p = document.querySelector(".modal-aviso-cadastro p");

    if(nome.value.length !== 0 && sobrenome.value.length !== 0 && email.value.length !== 0 && confirmemail.value.length !== 0 && senha.value.length !== 0 && confirmsenha.value.length !== 0){
      if(email.value == confirmemail.value && senha.value == confirmsenha.value){
        auth.createUserWithEmailAndPassword(email.value, senha.value)
        .then(authUser => {
          authUser.user.updateProfile({
            displayName: `${nome.value} ${sobrenome.value}`
          })

          p.textContent = "*Cadastrado com sucesso";
          modalAvisoFunc();

          nome.value = "";
          sobrenome.value = "";
          email.value = "";
          confirmemail.value = "";
          senha.value = "";
          confirmsenha.value = "";
        })
        .catch(error => {
          p.textContent = `Ocorreu um erro: ${error.message}`;
          modalAvisoFunc();
        })
      } else{
        p.textContent = "*Verifique se o email e/ou senha estão iguais";
        modalAvisoFunc();
      }
    } else{
      p.textContent = "*Preencha todos os campos";
      modalAvisoFunc();
    }
  }

  return(
    <div>
      <Header/>
      <div className="cadastro-container">
        <div className="modal-aviso modal-aviso-cadastro">
          <p></p>
        </div>
        <div className="content-box content-box-left-cadastro">
          <h1>Seja muito bem-vindo(a)!</h1>
          <p>Informe seus dados para registrar sua conta e acessar o aplicativo.</p>
        </div>
        <div className="content-box content-box-right-cadastro">
          <div className="form">
            <div className="input-box">
              <label htmlFor="nome">Nome</label>
              <div className="input">
                <ion-icon name="person"></ion-icon>
                <input type="text" placeholder="Nome" id="nome"/>
              </div>
            </div>
            <div className="input-box">
              <label htmlFor="sobrenome">Sobrenome</label>
              <div className="input">
                <ion-icon name="person"></ion-icon>
                <input type="text" placeholder="Sobrenome" id="sobrenome"/>
              </div>
            </div>
            <div className="input-box">
              <label htmlFor="email">Email</label>
              <div className="input">
                <ion-icon name="mail"></ion-icon>
                <input type="email" placeholder="Email" id="email"/>
              </div>
            </div>
            <div className="input-box">
              <label htmlFor="confirmemail">Confirme o email</label>
              <div className="input">
                <ion-icon name="mail"></ion-icon>
                <input type="email" placeholder="Email" id="confirmemail"/>
              </div>
            </div>
            <div className="input-box">
              <label htmlFor="senha">Senha</label>
              <div className="input">
                <ion-icon name="lock-closed"></ion-icon>
                <input type="password" placeholder="Senha" id="senha"/>
              </div>
            </div>
            <div className="input-box">
              <label htmlFor="confirmsenha">Confirme a senha</label>
              <div className="input">
                <ion-icon name="lock-closed"></ion-icon>
                <input type="password" placeholder="Senha" id="confirmsenha"/>
              </div>
            </div>
            <button onClick={criarConta}>Registrar-se</button>
            <Link to="/login">Já possui uma conta? acesse aqui</Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}