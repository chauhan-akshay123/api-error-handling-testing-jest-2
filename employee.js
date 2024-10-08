let employees = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', departmentId: 1 },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', departmentId: 2 },
];

let departments = [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Marketing' },
];

// function to get all employees
function getEmployees(){
  return employees;
}

// function to get employee by Id
function getEmployeeById(id){
  return employees.find(emp => emp.id === id);
}

// function to get all departments
function getDepartments(){
  return departments;
}

// function to get department by Id
function getDepartmentById(id){
  return departments.find(dep => dep.id === id);
}

module.exports = {
  getEmployees,
  getEmployeeById,
  getDepartments,
  getDepartmentById
};