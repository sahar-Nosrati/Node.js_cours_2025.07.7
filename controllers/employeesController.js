const { json } = require("express");

const data = {
  employees: require("../model/employee.json"),
  setemployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: parseInt(data.employees[data.employees.length - 1].id) + 1 || 1,
    firstName: req.body.firstName,
    LastName: req.body.LastName,
    age: req.body.age,
  };

  if (!newEmployee.firstName || !newEmployee.LastName) {
    res.status(400).json({ message: "firstName and LastName are required" });
  }

  data.setemployees([...data.employees, newEmployee]);
  res.status(200).json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (employee) => employee.id === req.body.id
  );
  if (!employee) {
    return res
      .status(404)
      .json({ message: `employee ID ${req.body.id} has not been found` });
  }
  if (req.body.firstName) employee.firstName = req.body.firstName;
  if (req.body.LastName) employee.LastName = req.body.LastName;
  if (req.body.age) employee.age = req.body.age;
  const filteredArray = data.employees.filter(
    (employee) => employee.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray];
  data.setemployees(
    unsortedArray.sort((a, b) => {
      a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
    })
  );
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  let employeeSingleId;
  const modifiedId = [];

  for (let employee of data.employees) {
    const convertedId = JSON.parse(employee.id);

    convertedId === req.body.id
      ? (employeeSingleId = parseInt(req.body.id))
      : employeeSingleId;
  }

  if (employeeSingleId === undefined) {
    return res
      .status(400)
      .json({ messag: "Employee ID `${req.body.id}` not found" });
  }

  const filteredArray = data.employees.filter(
    (employee) => JSON.parse(employee.id) !== parseInt(req.body.id)
  );

  for (let employee of filteredArray) {
    if (JSON.parse(employee.id) > parseInt(req.body.id)) {
      employee.id = parseInt(employee.id) - 1;

      modifiedId.push(employee);
    } else {
      modifiedId.push(employee);
    }
  }
  data.setemployees([...modifiedId]);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  // const employee = data.employees.find(
  //   (employee) => employee.id === parseInt(req.params.id)
  // );
  // for (let employee of data.employees) {
    //   employee.id === req.params.id ? (employeeInfo = employee) : employee;
    // }
    
    let employeeInfo;
    data.employees.map((employee) => employee.id === req.params.id ? (employeeInfo = employee) : employee)
  if (employeeInfo === undefined) {
    return res
      .status(400)
      .json({ Message: "The employee Id `${req.params.id}` not found" });
  }
  res.json(employeeInfo);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
