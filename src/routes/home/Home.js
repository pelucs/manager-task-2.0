import './Home.css';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

import ilust from '../../media/ilustration-task.svg';
import ilustSecurity from '../../media/ilustration-security.svg';

export default () => {

  document.documentElement.scrollTop = 0;

  const navigate = useNavigate();

  useEffect(() => {
    let isAutenticated = localStorage.getItem("key");
    if(isAutenticated){
      navigate("/app");
    }
  }, []);

  return(
    <div>
      <Header/>
      <div className="home-container">
        <section className="section-one">
          <div className="content-box content-box-left">
            <h1>Gerencie suas tarefas de forma fácil e prática.</h1>
            <p>Faça o registro de sua conta agora e desfrute de todas as funcionalidades que o app pode oferecer.</p>
            <Link to="/cadastro">Começar agora <ion-icon name="arrow-forward-outline"></ion-icon></Link>
          </div>
          <div className="content-box content-box-right">
            <img src={ilust} alt="Ilustração"/>
          </div>
        </section>

        <section className="section-two">
          <h1>Porque nos escolher?</h1>
          <ul className="func-box">
            <li>
              <span><ion-icon name="bulb"></ion-icon></span>
              <h1>Gerenciamento</h1>
              <p>Crie e exclua suas tarefas a qualquer momento</p>
            </li>

            <li>
              <span><ion-icon name="build"></ion-icon></span>
              <h1>Ferramenta simples</h1>
              <p>Crie suas tarefas e gerencie de forma fácil e prática</p>
            </li>

            <li>
              <span><ion-icon name="pricetags"></ion-icon></span>
              <h1>Conta gratuita</h1>
              <p>O registro de conta é totalmente gratuito</p>
            </li>

            <li>
              <span><ion-icon name="people"></ion-icon></span>
              <h1>Suporte</h1>
              <p>Você poderá entrar em contato com o suporte a qualquer momento</p>
            </li>
          </ul>
        </section>

        <section className="section-three">
          <div className="ilustration-box">
            <h1>Sua conta totalmente protegida</h1>
            <img src={ilustSecurity} alt="Ilustração"/>
            <p>Você poderá desfrutsar de todas as funcionalidades da nossa aplicação sem se preocupar. Sua conta é totalmente protegida.</p>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
}