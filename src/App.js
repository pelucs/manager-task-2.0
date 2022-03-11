import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

export default () => {
  return(
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  );
}