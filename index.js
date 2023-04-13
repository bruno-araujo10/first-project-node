
const express = require('express')

const uuid = require('uuid')

const cors = require("cors")

const port = 3001

const app = express()

app.use(express.json())
app.use(cors())

app.listen(port, () => {
    console.log(`🏴‍☠️ Server started on port ${port}`)
})


const users = []

const checkUser = (request, response, next) => {
    const {id} = request.params
    const index = users.findIndex(user => user.id === id)

    if(index < 0)
    return response.status(404).json({message: "not a found"})

    request.userId = id
    request.userIndex = index
    
    next()


}

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const {name, age} = request.body
    const user = {id:uuid.v4(), name, age}
    
    users.push(user)

    return response.status(201).json(users)
})

app.put('/users/:id', checkUser, (request, response) => {
    const id = request.userId
    const index = request.userIndex
    const {name, age} = request.body
    
    const updatedUser = {id, name, age}

    users[index] = updatedUser

    return response.status(201).json(updatedUser)

})

app.delete('/users/:id', checkUser, (request, response) => {
    const index = request.userIndex

    users.splice(index,1)

    return response.status(201).json()
})
























// app.get('/users', (request, response) => {
//     return response.json(users)
// })

// app.post('/users', (request, response) => {
//     const {name, age} = request.body
    
//     const user = {id:uuid.v4(), name, age}

//     users.push(user)

//     return response.status(201).json(users)
// })

// app.put('/users/:id', (request, response) => {
//     const {id} = request.params
//     const {name, age} = request.body

//     const updatedUser = {id, name, age}

//     const index = users.findIndex(user => user.id === id)
//     if(index < 0)
//     return response.status(404).json({message: "user not found" })

//     users[index] = updatedUser

//     return response.json(updatedUser)
// })

// app.delete('/users/:id', (request, response) => {
//     const { id } = request.params
    
//     const index = users.findIndex(user => user.id === id)
    
//     if(index < 0) {
//         return response.status(404).json({ message: "user not found"})
//     }
    
//     users.splice(index,1)
    
//     return response.status(204).json()
// })
