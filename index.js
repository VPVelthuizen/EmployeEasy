const inquirer = require('inquirer');
const pool = require('./db');

async function allEmp() {
    const res = await pool.query("SELECT * FROM employees");
    console.table(res.command.rows);
    options()
};

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
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter the manager ID of the employee:',
        },
    ]);

    const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [employeeData.firstName, employeeData.lastName, employeeData.roleId, employeeData.managerId];

    try {
        const res = await pool.query(query, values);
        console.log('New employee added:', res.rows[0]);
    } catch (error) {
        console.error('Error adding employee:', error);
    }
}

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
      }
}

async function allRoles() {
    const res = await pool.query("SELECT * FROM roles");
    console.table(res.command.rows);
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
}

async function allDep() {
    const res = await pool.query("SELECT * FROM departments");
    console.table(res.command.rows);
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
    }
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
        case "View all Employees":
            return allEmp();
        case "Add an employee":
            return newEmp();
        case "Update an employee":
            return updateEmp();
        case "View all roles":
            return allRoles();
        case "Add new role":
            return newRole();
        case "View all departments":
            return allDep();
        case "Add a new department":
            return newDep();
    }
};

options()