const Employee = require('../models/employeeModel');

const filterQueries = async (req, res) => {
  try {
    //Write your code here for sorting & pagination
    //1) For sorting sort salary from ascending to descending order
    //2) For Pagination set limit 5 as a default limit and default page is 1
    // Formulae to implementing pagination: (page - 1) * limit
    // For Sorting use    .sort('salary')
    let {page,limit} = req.query
    
   
    if(!page){
      page =1
    }
    if(!limit){
      limit =5;
    }
    let data = await Employee.find().sort({salary:1}).limit(+limit)
    res.json(data)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { filterQueries };
