// View all dep- table showing dep names and ids
// View all roles- table showing job title, role id, department it belongs to, salary
// View all employees- table with employee data, first last names, id, job title, dep, salary, managers
// Add department- enter name
// Add role- name, salary, department
// add employee- first alst name role manager
// Update employee- change role

// 3 tables- department (id,name)
// role (id, title, salary, department_id)
// employee- (id, first name, last, role id, manager id)
const inquirer = require('inquirer');
const pool = require('./db');

async function options() {
    const { prompt } = await inquirer.prompt([
        {
            type: "list", name: "prompt", message: "Choose an option!",
            choices: [
                "View all employees",
                "Add an employee",
                "Update an employee",
                "View all roles",
                "Add new role",
                "View all departments",
                "Add a new department"
            ],
        },
    ]);

}

// // Ask the user to describe the logo
// inquirer.prompt(
//     { type: 'list', message: 'What would you like to do or see?', name: 'choice', choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee'] })

// // Use what they entered to create the logo
//     .then((response) => {
//         let newShape;
//         console.log(response.choice)
//         // switch (response.shape) {
//         //     case 'Square':
//         //         newShape = new shapes.Square();
//         //         break;
//         //     case 'Circle':
//         //         newShape = new shapes.Circle();
//         //         break;
//         //     case 'Triangle':
//         //         newShape = new shapes.Triangle();
//         //         break;
//         //     default:
//         //         console.log('Invalid shape selected');
//         //         return;
//         // }
//     });