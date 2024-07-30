const inquirer = require('inquirer');
const pool = require('./db');

// Return all employees
async function allEmp() {
    const res = await pool.query("SELECT * FROM employees");
    console.table(res.rows);
    options()
};

// Create a new employee
async function newEmp() {
    const employeeData = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the employee:',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the employee:',
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the role ID of the employee:',
        },
    ]);

    const query = 'INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [employeeData.firstName, employeeData.lastName, employeeData.roleId];

    try {
        const res = await pool.query(query, values);
        console.log('New employee added:', res.rows[0]);
    } catch (error) {
        console.error('Error adding employee:', error);
    };
    options();
}

// Update an employee
async function updateEmp() {
    const employeeData = await inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the ID of the employee you want to update:',
        },
        {
            type: 'input',
            name: 'updatedRoleId',
            message: 'Enter the new role ID for the employee:',
        },
    ]);

    const query = 'UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *';
    const values = [employeeData.updatedRoleId, employeeData.employeeId];

    try {
        const res = await pool.query(query, values);
        if (res.rowCount > 0) {
            console.log('Employee role updated successfully.');
        } else {
            console.log('Employee not found or role not updated.');
        }
    } catch (error) {
        console.error('Error updating employee role:', error);
    };
    options();
}

async function allRoles() {
    const res = await pool.query("SELECT * FROM roles");
    console.table(res.rows);
    options()
}

async function newRole() {
    const roleData = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the role:',
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter the department ID of the role:',
        },
    ]);

    const query = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [roleData.title, roleData.salary, roleData.departmentId];

    try {
        const res = await pool.query(query, values);
        console.log('New role added:', res.rows[0]);
    } catch (error) {
        console.error('Error adding role:', error);
    }
    options();
}

async function allDep() {
    const res = await pool.query("SELECT * FROM departments");
    console.table(res.rows);
    options()
}

async function newDep() {
    const departmentData = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:',
        },
    ]);

    const query = 'INSERT INTO departments (name) VALUES ($1) RETURNING *';
    const values = [departmentData.name];

    try {
        const res = await pool.query(query, values);
        console.log('New department added:', res.rows[0]);
    } catch (error) {
        console.error('Error adding department:', error);
    };
    options();
}

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

    switch (prompt) {
        case "View all employees":
            allEmp();
            break;
        case "Add an employee":
            newEmp();
            break;
        case "Update an employee":
            updateEmp();
            break;
        case "View all employees":
            allEmp();
            break;
        case "Add an employee":
            newEmp();
            break;
        case "Update an employee":
            updateEmp();
            break;
        case "View all roles":
            allRoles();
            break;
        case "Add new role":
            newRole();
            break;
        case "View all departments":
            allDep();
            break;
        case "Add a new department":
            newDep();
            break;
        case "Add new role":
            newRole();
        case "View all departments":
            allDep();
        case "Add a new department":
            newDep();
    }
};

options()