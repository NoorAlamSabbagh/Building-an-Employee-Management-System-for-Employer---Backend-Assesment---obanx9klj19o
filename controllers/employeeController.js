const Employee = require('../models/employeeModel');

//Registering Employee into database
const createEmployee = async (req, res) => {
 
  try {
    
    // Write a code here to store Employee data
   console.log(req.url)
    let {firstName, lastName,companyName,email,salary} = req.body
    
    let newEmp = new Employee({
      firstName,
      lastName,
      companyName,
      email,
      salary}
    )
   
    let data = await newEmp.save();
    res.status(201).json({newEmployee:data})
  } catch (err) {
    
    res.status(500).json({ error: 'Failed to create employee' });
  }
};

//Get Employee From a Particular id
const getEmployee = async (req, res) => {
 console.log(req.url)
  try {
    // Write a code here to get Employee from a Particular id
    let id = req.params.id
    let data = await Employee.findById(id)
    if(data){
      res.status(200).json(data)
      return;
    }
    res.status(404).json({error:"Employee not found"})
  } catch (err) {
    res.status(500).json({ error: 'Failed to get employee details' });
  }
};

//Updating Employee
const updateEmployee = async (req, res) => {
 console.log(req.url)
  try {
    //Write a code here for updating Employee details using 'PUT' request
    let id = req.params.id
    const {firstName, lastName,companyName,email,salary} = req.body
    let data = await Employee.findById(id)
    if(!data){
      res.status(404).json({error:"Employee not found"})
      return
    }
    data.firstName=firstName;
    data.lastName = lastName;
    data.companyName=companyName;
    data.email = email;
    data.salary = salary;
    await data.save();
    res.status(200).json({message:"Employee details updated successfully"})
    

  } catch (err) {
    res.status(500).json({ error: 'Failed to update employee details' });
  }
};

const deleteEmployee = async (req, res) => {
 console.log(req.url)
  try {
    //Write a code here for Deleting all the employees whose salary is greater than 10000
    let data = await Employee.deleteMany({salary:{$gt:10000}});
    
    if (data.deletedCount>0){
      res.json({message:"employees deleted successfully"})
      return;
    }
    res.status(404).json({error:"No employees found"})
    

  } catch (err) {
    res.status(500).json({ error: 'Failed to delete employees' });
  }
};

module.exports = {
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
