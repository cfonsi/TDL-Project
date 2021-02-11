'use strict';

//---------- FOR DISPLAYING TASKS------------------------------
const checkDone = document.querySelector("#checkerDone");
const subtasks = document.querySelector("#subtasks");
const effortOutput = document.querySelector("#eLevelDisplay");
// const display = document.querySelector("#taskDisplayRow"); 
let display = document.querySelector("table"); 
// const check = 
//--------------------------------------------------------------

//---------- FOR CREATE FORM------------------------------------
const subtaskDesc = document.querySelector("#subtaskDescription");
const eLevel = document.querySelector("#eLevel"); 
const alert = document.querySelector("#onsuccess");  
//--------------------------------------------------------------
// const printTaskToScreen = (stasks) => {
//     let task = document.createElement("p"); // <p> </p>
//     let text = document.createTextNode(`${stasks}`); // username
//     task.appendChild(text); // <p> username </p>
//     subtasks.appendChild(task);
// }

const printTaskToScreen = (done,stasks,effort) => {
    let doneStatus = document.createElement("p"); // <p> </p>
    let text = document.createTextNode(`${done}`); // username
    doneStatus.appendChild(text); // <p> username </p>
    checkDone.appendChild(doneStatus);

    let task = document.createElement("p"); // <p> </p>
    let text2 = document.createTextNode(`${stasks}`); // username
    task.appendChild(text2); // <p> username </p>
    subtasks.appendChild(task);

    let e = document.createElement("p"); // <p> </p>
    let text3 = document.createTextNode(`${effort}`); // username
    e.appendChild(text3); // <p> username </p>
    effortOutput.appendChild(e);

}

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

const getSubtask = () => {
    fetch("http://localhost:8080/subtask/readAll")
    .then((response) => {
        // check that the response is OK (i.e. 200)
        if(response.status !== 200){
            throw new Error("I don't have a status of 200");
        }else{
            console.log(response);
            console.log(`response is OK (200)`);
            //json-ify it (which returns a promise)
            response.json().then((infofromserver) =>{
                console.log(infofromserver);
                console.log(infofromserver); // key - return array(6)
                // generateTableHead(display,Object.keys(infofromserver[0]));
                for(let tasks of infofromserver){
                    console.log(tasks.subtaskDescription);
                    printTaskToScreen(tasks.done,tasks.subtaskDescription,tasks.effortLevel);
                    // printNameToScreen(tasks.effortLevel);
                    // printTaskToScreen(tasks.done,tasks.subtaskDescription);
                }
            })
        }
    }).catch((err) => {
        console.error(err);
    })
}

const createSubtask = () => {
    const subtaskDescriptionValue = subtaskDesc.value; 
    const effortLevelValue = eLevel.value;

    let data = {
        subtaskDescription: subtaskDescriptionValue, 
        effortLevel: effortLevelValue
    }

    fetch("http://localhost:8080/subtask/create",{
        method: "POST", 
        body: JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(response => response.json())
    .then(info => {
        console.log(info);
       alert.setAttribute("class", "alert alert-success"); 
       alert.innerHTML = "Subtask has been successfully created!"; 
        setTimeout( () => {
          alert.removeAttribute("class"); 
          alert.innerHTML = "";  
        },2000);
    })
    .catch(err => console.error(`Stopppppp! ${err}`));
}

getSubtask();