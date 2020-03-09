//Bring in all the require packages
const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

// Call for async function
async function startQuestion() {
    
        // Setting the variables
        let name;
        let id;
        let role;
        let email;

        // Prompt user with the questions 
        await inquirer.prompt([ 
            {
                type: "input",
                message: `What is your name?`,
                name: "name"
            },
            {
                type: "input",
                message: `What is your id?`,
                name: "id"
            },
            {
                type: "input",
                message: `What is your Email?`,
                name: "email"
            },
            {
                type: "list",
                message: `what is your role?`,
                name: "role",
                choices: ["Manager", "Engineer", "Intern"]
            }
        ])
        .then((data) => {

            // redifining the variables base on user input
            name = data.name;
            id = data.id;
            role = data.role;
            email = data.email;
        });

        switch (role){
            //If manager is selected = execute question about office 
            //Then await for the user to response to the question
            //Store the user response and generate to manager.html 
            case "Manager":

                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your Manager's Office Number?",
                        name: "officeNum"
                    }
                ])
                .then((data) => {

                    // Create object
                    const manager = new Manager(name, id, email,role, data.officeNum);

                    // Create template
                    const managerTemplate = `
                    <div class="card-header text-white bg-primary">
                    <h3>${manager.name}</h3>
                    <h5>${manager.getRole()}</h5>
                    </div>
                    <div class="card-body bg-light text-dark">
                    <ul class="list-group">
                        <li class="list-group-item" style="font-size: 14px;">ID: ${manager.id}</li>
                        <li class="list-group-item" style="font-size: 14px;">Email: ${manager.email}</li>
                        <li class="list-group-item" style="font-size: 14px;">OfficeNumber: ${data.officeNum}</li>
                    </ul>
                    </div>
                    `

                    // Write template to html file, console log success or error 
                    fs.writeFile("manager.html", managerTemplate, function(err) {
                        if (err) {
                            return console.log(err);
                        }

                        console.log("success!");
                    })
                  
                });
                break;
            
            case "Engineer":

                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your Github username?",
                        name: "github"
                    }
                ])
                .then((data) => {
    
                        // Create object
                        const engineer = new Engineer(name, id, email,role, data.github);
    
                        // Create template
                        const engineerTemplate = `
                        <div class="card-header text-white bg-primary">
                        <h3>${engineer.name}</h3>
                        <h5>${engineer.getRole()}</h5>
                        </div>
                        <div class="card-body bg-light text-dark">
                        <ul class="list-group">
                            <li class="list-group-item" style="font-size: 14px;">ID: ${engineer.id}</li>
                            <li class="list-group-item" style="font-size: 14px;">Email: ${engineer.email}</li>
                            <li class="list-group-item" style="font-size: 14px;">Github: ${data.github}</li>
                        </ul>
                        </div>
                        `
    
                        // Write template to html file, console log success or error 
                        fs.writeFile("engineer.html", engineerTemplate, function(err) {
                            if (err) {
                                return console.log(err);
                            }
    
                            console.log("success!");
                        })
                      
                });
                break;
            
            case "Intern":

                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is the name of the school you attend?",
                        name: "school"
                    }
                ])
                .then((data) => {
                            // Create object
                            const intern = new Intern(name, id, email,role, data.school);
        
                            // Create template
                            const internTemplate = `
                            <div class="card-header text-white bg-primary">
                            <h3>${intern.name}</h3>
                            <h5>${intern.getRole()}</h5>
                            </div>
                            <div class="card-body bg-light text-dark">
                            <ul class="list-group">
                                <li class="list-group-item" style="font-size: 14px;">ID: ${intern.id}</li>
                                <li class="list-group-item" style="font-size: 14px;">Email: ${intern.email}</li>
                                <li class="list-group-item" style="font-size: 14px;">School: ${data.school}</li>
                            </ul>
                            </div>
                            `
        
                            // Write template to html file, console log success or error 
                            fs.writeFile("intern.html", internTemplate, function(err) {
                                if (err) {
                                    return console.log(err);
                                }
        
                                console.log("success!");
                            })
                          
                });
                break;
        } 

}


startQuestion();