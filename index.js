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
const express = require('express');
const sequelize = require('./config/connection');

// Import model to sync table with database
const Departments = require('./models/departments.js');
const Roles = require('./models/roles.js');
const Employees = require('./models/employees.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Force true to drop/recreate table(s) on every sync
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// Ask the user to describe the logo
inquirer.prompt(
    { type: 'list', message: 'What would you like to do or see?', name: 'choice', choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee'] })

// Use what they entered to create the logo
    .then((response) => {
        let newShape;
        console.log(response.choice)
        // switch (response.shape) {
        //     case 'Square':
        //         newShape = new shapes.Square();
        //         break;
        //     case 'Circle':
        //         newShape = new shapes.Circle();
        //         break;
        //     case 'Triangle':
        //         newShape = new shapes.Triangle();
        //         break;
        //     default:
        //         console.log('Invalid shape selected');
        //         return;
        // }
    });