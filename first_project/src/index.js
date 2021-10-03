const { request, response } = require("express");
const express = require("express");
const { v4: uuidv4} = require("uuid")

app.use(express.json());

const costumers = [

]


const app = express();


//Middleware

function verifyIfExistsAccountCPF(request, response, next){
    const { cpf } = request.headers
    const customer = customers.find(customer => customer.cpf === cpf);

    if(!customer){
        return response.status(400).json({error: "Customer not found"})
    }

    request.customer = customer;

    return next()

}

function getBalance(statament){
    const balance = statament.reduce((acc, operation) => {
        if( operation === 'credit'){
            return acc + operation.amount;
        }else{
            return acc - operation.amount
        }
    }, 0)

    return balance;
}

app.post("/account", (request, response) => {
    const {cpf, name} = request.body
    const customersAlreadyExist = customers.some((customer) => customer.cpf === cpf)

    if(customersAlreadyExist){
        return response.status(400).json({error: "Customer Already Exist!"})
    }

    customers.push({
        cpf,
        name, 
        id: uuidv4(),
        statement: []
    })

    return response.status(201).send();

})

app.get("/statement/:cpf", verifyIfExistsAccountCPF, (request, response) => {
   const {customer} = request;
    
    return response.json(customer.statement)
})

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
    const { description, amount } = request.body;

    const {customer} = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }
    
    customer.statement.push(statementOperation)

    return response.status(201).send();

})

app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
   const { amount } = request.body;

   const { customer } = request

   const balance = getBalance(customers.statement);

   if(balance < amount){
       return response.status(400).json({error: "Insufficiet funds!"})
   }

   const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "debit"
   }   

   customer.statement.push(statementOperation)

   return response.status(201).send()

})

app.listen(3333);