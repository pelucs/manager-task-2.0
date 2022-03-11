import './Header.css';
import { Link } from 'react-router-dom';

export default () => {

  //MENU
  function menuHamb(){
    document.querySelector(".menu").classList.add("active-menu");
    document.querySelector(".back-menu").classList.add("active-back-menu");
  }

  function closeMenu(){
    document.querySelector(".menu").classList.remove("active-menu");
    document.querySelector(".back-menu").classList.remove("active-back-menu");
  }

  return(
    <div className="header-container">
        <div className="logo-box">
          <h1>Task</h1>
        </div>
        
        <div onClick={menuHamb} className="menu-hamb"></div>
        <div onClick={closeMenu} className="back-menu"></div>

        <ul className="menu">
          <h1>Menu</h1>
          <li onClick={closeMenu}><Link to="/">Início</Link></li>
          <li onClick={closeMenu}><Link to="/sobre">Sobre</Link></li>
          <li onClick={closeMenu}><Link to="/login">Login</Link></li>
          <li onClick={closeMenu}><Link to="/cadastro">Cadastrar</Link></li>
        </ul>
    </div>
  );
}