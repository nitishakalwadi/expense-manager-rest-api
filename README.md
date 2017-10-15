# Expense Manager REST APIs
This is a expense manager rest apis developed in mean stack

# Api End points

    api root - 

    SignUp
    api - /api/auth/signup
    type - POST
    params: username, password

    Login
    api - /api/auth/authenticate
    type - POST
    params: username, password

    Get all expenses
    api - /api/expense
    type - GET
    params - none

    Get expense by Id
    api - /api/expense/{expense_id}
    type - GET
    params - expenseId

    Save Expense
    api - /api/expense/
    type - POST
    params: expenseName, expense

    Delete Expense
    api - /api/expense/{{expense_id}}
    type - DELETE
    params: expenseId

    Update expense
    api - /api/expense/{{expense_id}}
    type - PUT
    params: expenseId

# Framework - Express.js

# Database - MongoDB

# Steps to deploy
    1. Run `npm install`
    2. Delete `mongod.lock` file from data folder if using local mongo instance
    3. Update the env files with proper values
    4. run app.js by `node app.js`