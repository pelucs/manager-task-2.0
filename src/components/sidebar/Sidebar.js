import './Sidebar.css';
import { useContext } from 'react';
import { ActiveContext } from './../../contextAPI/ActiveElement';
import { auth } from '../../Firebase';

export default () => {

  const { setActiveElement, setActiveModal } = useContext(ActiveContext);

  //SIDEBAR
  function sidebar(){
    document.querySelector(".sidebar").classList.toggle("active-sidebar");
    
    if(document.querySelector(".sidebar").classList.contains("active-sidebar")){
      setActiveElement("active");
    } else{
      setActiveElement(null);
    }
  }

  //MODAL NOVA TAREFA
  function newTaskSidebar(e){
    e.preventDefault();

    setActiveModal("active-modal-nova-terefa");
  }

  //SAIR DA CONTA
  function logOutSidebar(e){
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

  //DATA
  function currentDate(){
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

  window.addEventListener("load", currentDate);

  return(
    <div className="sidebar-container">
      <div className="sidebar">
        <div onClick={sidebar} className="menu-hamb-sidebar"></div> 

        <ul className="menu-sidebar">
          <li>
            <a href="/app">
              <ion-icon name="home-outline"></ion-icon>
              <p className="hidden-name">Início</p>  
            </a>
          </li>
          <li>
            <a href="/app/user">
              <ion-icon name="person-outline"></ion-icon>
              <p className="hidden-name">Conta</p>  
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="notifications-outline"></ion-icon>
              <p className="hidden-name">Notificações</p>  
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="checkmark-circle-outline"></ion-icon>
              <p className="hidden-name">Tarefas completas</p>  
            </a>
          </li>  
          <li>
            <a href="#">
              <ion-icon name="settings-outline"></ion-icon>
              <p className="hidden-name">Confirgurações</p>  
            </a>
          </li>  
        </ul>

        <div className="menu-sidebar-bottom">
          <div className="log-out">
            <ion-icon name="log-out-outline"></ion-icon>
            <p onClick={logOutSidebar} className="hidden-name">Sair</p>  
          </div>
          <hr></hr>
          <a href="#">
            <ion-icon name="person-circle-outline"></ion-icon>
            <p className="hidden-name">Olá, <span id="dia"></span></p>
          </a> 
        </div>
      </div>
      
      <div className="sidebar-bottom">
        <ul className="menu-bottom">
          <li><a href="/app"><ion-icon name="home"></ion-icon></a></li>
          <li><a href="/app/user"><ion-icon name="person"></ion-icon></a></li>
          <li onClick={newTaskSidebar}><a href="#"><ion-icon name="add"></ion-icon></a></li>
          <li onClick={logOutSidebar}><a href="#"><ion-icon name="log-out-outline"></ion-icon></a></li>
        </ul>
      </div>
    </div>
  );
}