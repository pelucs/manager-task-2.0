import './NextWork.css';
import { db, firebase } from '../../Firebase';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../contextAPI/AuthContext';
import { TaskContext } from './../../contextAPI/TaskContext';
import { ActiveContext } from './../../contextAPI/ActiveElement';

export default () => {

  const { user } = useContext(AuthContext);
  const { task } = useContext(TaskContext);
  const { activeElement, activeModal, setActiveModal } = useContext(ActiveContext);

  //CALCULAR A ALTURA DA BOX
  function calcHeight(){
    let itens = document.querySelectorAll(".task"),
        lengthMax = itens.length,
        heightBox = 0;
    
    itens.forEach(item => heightBox = item.clientHeight * lengthMax);
        
    return heightBox;
  }

  //ANIMAÇÃO NA LISTA DE TAREFAS
  function activeBoxTask(){
    let box = document.querySelector(".next-work-box"),
        icon = document.querySelector(".next-work-box-button button ion-icon");

    box.classList.toggle("active-box-task");
    
    if(box.classList.contains("active-box-task")){
      box.style.height = "0px";
      icon.style.transform = "rotate(0)";
    } else{
      box.style.height = `${calcHeight()}px`;
      icon.style.transform = "rotate(180deg)";
    }
  }

  //MODAL NOVA TAREFA
  function modalNovaTarefa(){
    document.querySelector(".modal-nova-tarefa-container").classList.add("active-modal-nova-terefa");
  }

  function closeModalNovaTarefa(){
    document.querySelector(".modal-nova-tarefa-container").classList.remove("active-modal-nova-terefa");
    setActiveModal(null);
  }

  //CRIAR NOVA TAREFA
  function dadosTask(nameTask, nivelTask){
    let idUser = user.uid,
        randomID = Math.floor(Math.random() * 999),
        idTask = idUser + randomID;

    //DATA DA CRIAÇÃO
    let data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes  = (data.getMonth() + 1).toString(),
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();

    //PRIORIDADE DA TAREFA
    let color;
    if(nivelTask == "alta"){
      color = "#f44336";
    } else if(nivelTask == "media"){
      color = "#f6776e";
    } else{
      color = "#f8a7a2";
    }

    //INSERINDO NO BANCO DE DADOS
    db.collection("tasks").doc(idTask).set({
      title: nameTask,
      nivel: color,
      date: `${diaF}/${mesF}/${anoF}`,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      window.location.reload();
    })
  }

  function newTask(){
    let nameTask = document.querySelector("#task").value,
        getNivelTask = document.querySelector("input[name='radio']:checked"),
        nivelTask = "";

    if(getNivelTask){
      nivelTask = getNivelTask.id;
    }

    if(nameTask.length !== 0 && nivelTask.length !== 0){
      dadosTask(nameTask, nivelTask);
    } else{
      alert("PREENCHA TODOS OS CAMPOS")
    }
  }

  //EXCLUIR TAREFA
  function modalExcluirTask(id){
    document.querySelector(".modal-excluir-tarefa-container").classList.add("active-modal-excluir-tarefa");
    document.querySelector(".modal-excluir-tarefa p span").textContent = id;
  }

  function closeModalExcluirTask(){
    document.querySelector(".modal-excluir-tarefa-container").classList.remove("active-modal-excluir-tarefa");
  }

  function excluirTarefa(){
    let idTask = document.querySelector(".modal-excluir-tarefa p span").innerHTML;
    
    db.collection("tasks").doc(idTask).delete()
    .then(() => {
      window.location.reload();
    })
    .catch(error => {
      alert(error.message);
    })
  }

  //TAREFA COMPLETA
  function tarefaCompleta(id){
    db.collection("tasks").doc(id).delete()
    .then(() => {
      alert("TAREFA COMPLETA")
      window.location.reload();
    })
    .catch(error => {
      alert(error.message);
    })
  }

  return(
    <div className="next-work-container">
      <div className="next-work-box-button">
        <button onClick={activeBoxTask}>Próximos trabalhos <ion-icon name="chevron-down-outline"></ion-icon><span>{task.length}</span></button>
        <div className="next-work-box">
          {
            task.length != 0 ?
              <div>
                <ul className="title-box">
                  <li>Prioridade</li>
                  <li>Data</li>
                </ul>
                {
                  task.map(task => (
                    <div className="task" id={task.id}>
                      <div className="info-task-left">
                        <input onChange={() => tarefaCompleta(task.id)} type="checkbox" id="chk"/>
                        <p>{task.data.title}</p> 
                      </div>
                      <ul className="info-task-right">
                        <li>
                          <span onClick={() => modalExcluirTask(task.id)}><ion-icon name="trash"></ion-icon></span>
                        </li>
                        <hr></hr>
                        <li>
                          <p className="nivel-task-color" style={{ backgroundColor: task.data.nivel }}></p>
                        </li>
                        <hr></hr>
                        <li>
                          <p>{task.data.date}</p>
                        </li>
                      </ul>
                    </div>
                  ))
                }
              </div> 
            :
              <h1 className="task">Sua caixa de tarefas está vazia!</h1>           
          }
        </div>     
      </div>
      <button onClick={modalNovaTarefa}><ion-icon name="add"></ion-icon>Nova Tarefa</button>
      <div className={`modal-container modal-nova-tarefa-container ${activeModal}`}>
        <div onClick={closeModalNovaTarefa} className="back-close-modal back-close-modal-nova-tarefa"></div>  
        <div className="modal-nova-tarefa">
          <span onClick={closeModalNovaTarefa}><ion-icon name="close-outline"></ion-icon></span>
          <h1>Nova tarefa</h1>
          <input type="text" placeholder="Digite a nova tarefa" id="task" maxLength="50" autoComplete="off"/>
          <ul className="nivel-task">
            <h1>Prioridade</h1>
            <li>
              <input type="radio" name="radio" id="alta"/>
              <label htmlFor="alta">Alta</label>
              <span></span>  
            </li>
            <li>
              <input type="radio" name="radio" id="media"/>
              <label htmlFor="media">Média</label>
              <span></span>  
            </li> 
            <li>
              <input type="radio" name="radio" id="baixa"/>
              <label htmlFor="baixa">Baixa</label>
              <span></span>  
            </li>   
          </ul>
          <button onClick={newTask}>Criar tarefa</button>
        </div>
      </div>

      <div className="modal-container modal-excluir-tarefa-container">
        <div onClick={closeModalExcluirTask} className="back-close-modal back-close-modal-exluir-tarefa"></div>
        <div className="modal-excluir-tarefa">
          <h1>Tem certeza que deseja excluir esta tarefa?</h1>
          <p>ID da tarefa: #<span></span></p>
          <div className="buttons-excluir-tarefa">
            <button onClick={excluirTarefa}>Excluir</button>
            <button onClick={closeModalExcluirTask}>Cancelar</button>  
          </div>
        </div>
      </div>
    </div>
  );
}