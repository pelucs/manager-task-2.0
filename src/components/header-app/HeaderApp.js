import './HeaderApp.css';
import { useContext, useEffect } from 'react';
import { ActiveContext } from './../../contextAPI/ActiveElement';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase';

export default () => {

  const { activeElement, setActiveModal } = useContext(ActiveContext);
  const navigate = useNavigate();

  //MODAL USUÁRIO
  function modalUser(){
    document.querySelector(".box-user").classList.toggle("active-modal");
  }

  //SAIR DA CONTA
  function logOut(e){
    e.preventDefault();

    auth.signOut()
    .then(() => {
      localStorage.removeItem("key");
      window.location.href = "/login";
    })
    .catch(error => {
      alert(`Ocorreu um erro: ${error.message}`);
    });
  }

  //BOTÃO NOVA TAREFA
  useEffect(() => {
    let href = window.location.href,
        result = href.substring(href.length - 4),
        button = document.querySelector(".content-right");

    if(result !== "/app"){
      button.style.display = "none";
    } else{
      button.style.display = "flex";
    }
  }, []);

  //MODAL NOVA TAREFA
  function newTaskModal(){
    setActiveModal("active-modal-nova-terefa");
  }

  return(
    <div className={`header-app-container ${activeElement}`}>
      <div className="header-top">
        <div className="content-left">
          <h1>Task</h1>
          <hr></hr>
          <a href="/app"><ion-icon name="list-outline"></ion-icon>Lista</a>
          <hr></hr>
          <a href="#"><ion-icon name="calendar-outline"></ion-icon>Calendário</a>
        </div>  
        <div className="content-right">
          <div onClick={newTaskModal}><ion-icon name="add-outline"></ion-icon>Nova Tarefa</div>  
        </div>
      </div>
      <div className="header-bottom">
        <div className="search-box">
          <ion-icon name="search-outline"></ion-icon>
          <input type="text" placeholder="Pesquise aqui"/>
        </div>
        <ul className="buttons-header">
          <li><ion-icon name="filter-outline"></ion-icon>Filtrar</li>
          <li onClick={modalUser} className="box-user">
            <div>
              <ion-icon name="person"></ion-icon>Me
            </div>
            <ul className="modal-user">
              <li><Link to="/app/user"><ion-icon name="person-outline"></ion-icon>Conta</Link></li>
              <li onClick={logOut}><a href="#"><ion-icon name="log-out-outline"></ion-icon>Sair</a></li>
            </ul>
          </li>
          <li><ion-icon name="ellipsis-horizontal"></ion-icon></li>
        </ul>
      </div>
    </div>
  );
}