const {
  getEmployees,
  getEmployeeById,
  getDepartments,
  getDepartmentById
}  = require("./employee.js");
const express = require("express");
const app = express();
app.use(express.json());

// Api to all employees
app.get("/api/employees", async (req, res) => {
  try{
   const employees = await getEmployees();
   if(employees.length === 0){
     return res.status(404).json({ error: "No employees found" });
   }
   return res.status(200).json(employees);
  } catch(error){ 
    res.status(500).json({ error: "Internal Server error" });
  }
}); 

// Api to get employee by Id
app.get("/api/employees/:id", async (req, res) => {
 try{
  const employee = await getEmployeeById(parseInt(req.params.id));
  if(!employee){
    return res.status(404).json({ error: "No emplopyee found" });
  }
  return res.status(200).json(employee);
 } catch(error){ 
   res.status(500).json({ error: "Internal Sever Error" });
 }
});

// Api to get all departments
app.get("/api/departments", async (req, res) => {
 try{
  const departments = await getDepartments();
  if(departments.length === 0){
    return res.status(404).json({ error: "No departments found" });
  }
  return res.status(200).json(departments);
 } catch(error){ 
   res.status(500).json({ error: "Internal Server Error" });
 }
});

// Api to get departmemt by Id
app.get("/api/departments/:id", async (req, res) => {
  try{
  const department = await getDepartmentById(parseInt(req.params.id));
  if(!department){
    return  res.status(404).json({ error: "No department found" });
  }
  return res.status(200).json(department);
 } catch(error){
   res.status(500).json({ error: "Internal Server Error" });
 }
});

module.exports = { app };