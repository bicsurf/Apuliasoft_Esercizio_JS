//Dichiarazioni ID

//1--
//Catturo l'INTERA della tabella
let tableAll = document.querySelector('#tableAll');
//Catturo il BODY della tabella INTERA
let bodyTableAll = document.querySelector('#bodyTableAll');
//Button - Intera tabella
let buttonTableAll = document.getElementById('buttonTableAll');


//2--
//Catturo la tabella per PROJECT
let tableProject = document.querySelector('#tableProject');
//Catturo il BODY della tabella PROJECT
let bodyTableProject = document.querySelector('#bodyTableProject');
//Button - Raggruppamento per progetto
let buttonTableProject = document.getElementById('buttonTableProject');


//3--
//Catturo la tabella per PROJECT e IMPIEGATO
let tableProjectEmployee = document.querySelector('#tableProjectEmployee');
//Catturo il BODY della tabella PROJECT e IMPIEGATO
let bodyTableProjectEmployee = document.querySelector('#bodyTableProjectEmployee');
//Button - Raggruppamento per PROJECT e IMPIEGATO
let buttonTableProjectEmployee = document.getElementById('buttonTableProjectEmployee');


//4--
//Catturo la tabella per IMPIEGATO e PROJECT
let tableEmployeeProject = document.querySelector('#tableEmployeeProject');
//Catturo il BODY della tabella IMPIEGATO e PROJECT
let bodyTableEmployeeProject = document.querySelector('#bodyTableEmployeeProject');
//Button - Raggruppamento per impiegato e progetto
let buttonTableEmployeeProject = document.getElementById('buttonTableEmployeeProject');


//Definisco il mio Array
let employees = {
    'employee': [
        {
            "project": { "id": 1, "name": "Mars Rover" },
            "employee": { "id": 1, "name": "Mario" },
            "date": "2021-08-26T22:00:00.000Z",
            "hours": 5
        },
        {
            "project": { "id": 2, "name": "Manhattan" },
            "employee": { "id": 2, "name": "Giovanni" },
            "date": "2021-08-30T22:00:00.000Z",
            "hours": 3
        },
        {
            "project": { "id": 1, "name": "Mars Rover" },
            "employee": { "id": 1, "name": "Mario" },
            "date": "2021-08-31T22:00:00.000Z",
            "hours": 3
        },
        {
            "project": { "id": 1, "name": "Mars Rover" },
            "employee": { "id": 3, "name": "Lucia" },
            "date": "2021-08-31T22:00:00.000Z",
            "hours": 3
        },
        {
            "project": { "id": 2, "name": "Manhattan" },
            "employee": { "id": 1, "name": "Mario" },
            "date": "2021-08-26T22:00:00.000Z",
            "hours": 2
        },
        {
            "project": { "id": 2, "name": "Manhattan" },
            "employee": { "id": 2, "name": "Giovanni" },
            "date": "2021-08-31T22:00:00.000Z",
            "hours": 4
        }
    ],


    //1--Tabella INTERA
    'createTableAll': function () {
        this.employee.forEach(element => {
            if (element.date >= "20") {
                let changeDate = new Date(element.date);

                let rowTable = document.createElement('tr');
                rowTable.innerHTML = `
                    <td>${element.project["name"]}</td>
                    <td>${element.employee["name"]}</td>
                    <td>${changeDate.toLocaleDateString('it-IT', { dateStyle: "medium" })}</td>
                    <td>${element.hours}</td>
                `
                //Collego le righe della tabella al corpo della tabella mostrata per intero
                bodyTableAll.appendChild(rowTable);
            }
        })
    },


    //2--Tabella raggruppamento Project
    'createTableProject': function () {
        let project = [];

        employees.employee.forEach(element => {
            let check = 0;
            project.forEach(checkElement => {
                if (project.length > 0) {
                    if (element.project.id == checkElement.project.id) {
                        check = 1;
                        checkElement.hours += element.hours;
                    }
                }
            });

            if (!check) {
                let push = {
                    "project": element.project,
                    "hours": element.hours
                };
                project.push(push);
            }
        });

        project.forEach(checkElement => {
            // console.log(checkElement);
            let rowTable = document.createElement('tr');
            rowTable.innerHTML = `
                    <td>${checkElement.project.name}</td>
                    <td>${checkElement.hours}</td>`
            bodyTableProject.appendChild(rowTable);
        });
    },


    //3--Tabella raggruppamento Project->Employee
    'createTableProjectEmployee': function () {
        let employee = [];

        employees.employee.forEach(element => {
            let checkEmployee = 0;

            employee.forEach(checkElement => {
                if (employee.length > 0) {
                    if (element.employee.id == checkElement.employee.id && element.project.id == checkElement.project.id) {
                        checkEmployee = 1;
                        checkElement.hours += element.hours;
                    }
                }
            });

            if (!checkEmployee) {
                let push = {
                    "project": element.project,
                    "employee": element.employee,
                    "hours": element.hours
                };
                employee.push(push);
            }
        });

        employee.forEach(checkElement => {
            let rowTable = document.createElement('tr');
            rowTable.innerHTML = `
                    <td>${checkElement.project.name}</td>
                    <td>${checkElement.employee.name}</td>
                    <td>${checkElement.hours}</td>
                `
            bodyTableProjectEmployee.appendChild(rowTable);
        });
    },


    //4--Tabella raggruppamento Employee->Project
    'createTableEmployeeProject': function () {
        let employee = [];

        employees.employee.forEach(element => {
            let checkEmployee = 0;

            employee.forEach(checkElement => {
                if (employee.length > 0) {
                    if (element.project.id == checkElement.project.id && element.employee.id == checkElement.employee.id) {
                        checkEmployee = 1;
                        checkElement.hours += element.hours;
                    }
                }
            });

            //Pusho all'interno di push i miei dati filtrati
            if (!checkEmployee) {
                let push = {
                    "employee": element.employee,
                    "project": element.project,
                    "hours": element.hours
                };
                employee.push(push);
            }
            //Ordino gli impiegati in base al loro nome
            employee.sort((a, b) => {
                if (a.employee.name >= b.employee.name) {
                    return -1;
                }
                return 0;
            });
            console.log(employee);
        });

        //Creo un ciclo per popolare la tabella
        employee.forEach(checkElement => {
            let rowTable = document.createElement('tr');
            rowTable.innerHTML = `
                    <td>${checkElement.employee.name}</td>
                    <td>${checkElement.project.name}</td>
                    <td>${checkElement.hours}</td>
                `
            //appendo l'innerHTML creato
            bodyTableEmployeeProject.appendChild(rowTable);
        });
    },
}

//EVENTI DEI BOTTONI
//1--Evento al click sul bottone (compare/scompare l'intera tabella)
buttonTableAll.addEventListener('click', () => {
    tableAll.classList.toggle('d-none');
})
//2--Evento al click sul bottone (compare/scompare la tabella raggruppata per progetto)
buttonTableProject.addEventListener('click', () => {
    tableProject.classList.toggle('d-none');
})
//3--Evento al click sul bottone (compare/scompare la tabella raggruppata per progetto e impiegato)
buttonTableProjectEmployee.addEventListener('click', () => {
    tableProjectEmployee.classList.toggle('d-none');
})
//4--Evento al click sul bottone (compare/scompare la tabella raggruppata per impiegato e progetto)
buttonTableEmployeeProject.addEventListener('click', () => {
    tableEmployeeProject.classList.toggle('d-none');
})

//INVOCAZIONI DELLE FUNZIONI
//1--Invochiamo la funzione che mostra l'intera tabella
employees.createTableAll();
//2--Invochiamo la funzione che mostra il raggruppamento per progetto
employees.createTableProject();
//3--Invochiamo la funzione che mostra il raggruppamento per progetto e per impiegato
employees.createTableProjectEmployee();
//4--Invochiamo la funzione che mostra il raggruppamento per impiegato e per progetto
employees.createTableEmployeeProject();