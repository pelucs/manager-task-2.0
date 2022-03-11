import React, { useState, useEffect, createContext } from 'react';
import { auth, db } from '../Firebase';

export const TaskContext = createContext();

export const TaskContextProvider = props => {

  const [task, setTask] = useState([]);

  useEffect(() => {
    //IRÁ FILTRAR TODAS AS TAREFAS DO USUÁRIO NO BANCO DE DADOS
    auth.onAuthStateChanged(user => {
      if(user){
        let idUser = user.uid;

        db.collection("tasks").orderBy("timestamp", "desc").get().then(snap => {
          let docFilter = snap.docs.filter(itens => itens.id.substring(0, 28) == idUser),
              data = docFilter.map(itens => ({
                data: itens.data(),
                id: itens.id
              }));

          setTask(data);
        })
      }
    })
  }, []);

  return(
    <TaskContext.Provider value={{ task }}>
      {props.children}
    </TaskContext.Provider>
  );
}