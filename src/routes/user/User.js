import './User.css';
import { useContext } from 'react';
import { ActiveContext } from './../../contextAPI/ActiveElement';
import { AuthContext } from './../../contextAPI/AuthContext';
import { auth } from '../../Firebase';

import Sidebar from '../../components/sidebar/Sidebar';
import HeaderApp from '../../components/header-app/HeaderApp';

export default () => {

  const { activeElement } = useContext(ActiveContext);
  const { user } = useContext(AuthContext);

  //MODAL EXCLUIR CONTA
  function modalExcluirConta(){
    document.querySelector(".modal-excluir-conta-container").classList.add("active-modal-excluir-conta");
  }
  
  function closeModalExcluirConta(){
    document.querySelector(".modal-excluir-conta-container").classList.remove("active-modal-excluir-conta");
  }

  //DATA
  function getDate(){
    let date = new Date(),
        hora = date.getHours(),
        span = document.getElementById("dia");

    if(hora >= 5 && hora < 13){
      span.textContent = "Bom dia";
    } else if(hora >= 13 && hora < 18){
      span.textContent = "Boa tarde";
    } else{
      span.textContent = "Boa noite";
    }
  }

  window.addEventListener("load", getDate);

  function modalAvisoFuncUser(){
    let modalAviso = document.querySelector(".modal-aviso-user");

    modalAviso.classList.add("active-modal-aviso-user");
    setTimeout(() => {
      modalAviso.classList.remove("active-modal-aviso-user");
    }, 2000);
  }


  //VERIFICAR EMAIL
  function emailVerifiedFunc() {
    let aviso = document.querySelector(".modal-aviso-user p");

    auth.languageCode = "pt";

    auth.currentUser.sendEmailVerification()
    .then(() => {
      aviso.textContent = `Um email foi enviado para ${user.email}`;
      modalAvisoFuncUser();
    })
    .catch(error => {
      aviso.textContent = `Ocorreu algum erro: ${error.message}`;
      modalAvisoFuncUser();
    })
  }

  function exlcuirConta(){
    let email = document.getElementById("email").value,
        senha = document.getElementById("senha").value,
        aviso = document.querySelector(".modal-aviso-user p");
        
    if(email.length !== 0 && senha.length !== 0){
      auth.signInWithEmailAndPassword(email, senha)
      .then(() => {
        auth.currentUser.delete()
        .then(() => {
          localStorage.removeItem("key");
          window.location.href = "/cadastro";
        })
        .catch(error => {
          aviso.textContent = `Ocorreu algum erro: ${error.message}`;
          modalAvisoFuncUser();
        })
      })

    } else{
      aviso.textContent = "*Preencha todos os campos corretamente";
      modalAvisoFuncUser();
    }
  }

  return(
    <div>
      <Sidebar/>
      <HeaderApp/>
      <div className={`user-container ${activeElement}-user-container`}>
        <div className="modal-aviso modal-aviso-user">
          <p></p>
        </div>
        {
          user ?
            <div className="profile-container">
              <ul className="dados-user">
                <li>
                  <h1>ID do usuário : </h1>
                  <p>{user.uid}</p>
                </li>
                <li>
                  <h1>Nome : </h1>
                  <p>{user.displayName}</p>
                </li>
                <li>
                  <h1>Email : </h1>
                  <p>{user.email}</p>
                </li>
                <li>
                  <h1>Email verificado : </h1>
                  {
                    user.emailVerified ?
                      <p>Verificado</p>
                    :
                      <button onClick={emailVerifiedFunc}>Verificar email</button>
                  }
                </li>
              </ul>

              <div className="excluir-conta-box">
                <h1>Área de risco</h1>
                <p>Você pode excluir sua conta a qualquer momento que quiser</p> 
                <button onClick={modalExcluirConta}>Excluir conta</button>

                <div className="modal-excluir-conta-container">
                  <div onClick={closeModalExcluirConta} className="back-close-modal-excluir-conta"></div>
                  <div className="modal-excluir-conta-box">
                    <span onClick={closeModalExcluirConta}><ion-icon name="close"></ion-icon></span>
                    <h1>Essa ação é irreversível e você terá que criar outra conta para poder acessar.</h1>
                    <div className="input-box">
                      <label htmlFor="email">Email</label>
                      <div className="input">
                        <ion-icon name="mail"></ion-icon>
                        <input type="email" placeholder="Informe o email" id="email" autoComplete="off"/>  
                      </div>
                    </div>
                    <div className="input-box">
                      <label htmlFor="senha">Senha</label>
                      <div className="input">
                        <ion-icon name="lock-closed"></ion-icon>
                        <input type="password" placeholder="Informe a senha" id="senha"/>  
                      </div>
                    </div>
                    <button onClick={exlcuirConta}>Excluir conta</button>
                  </div>
                </div>
              </div>
            </div>
          :
            <h2>Carregando...</h2>
        }
      </div>
    </div>
  );
}