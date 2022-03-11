import './App.css';
import { useContext } from 'react';
import { ActiveContext } from './../../contextAPI/ActiveElement';

import Sidebar from '../../components/sidebar/Sidebar';
import HeaderApp from '../../components/header-app/HeaderApp';
import NextWork from '../../components/next-work/NextWork';

export default () => {

  const { activeElement } = useContext(ActiveContext);

  return(
    <div>
      <Sidebar/>
      <HeaderApp/>
      <div className={`app-container ${activeElement}-app-container`}>
        <NextWork/>
      </div>
    </div>
  );
}