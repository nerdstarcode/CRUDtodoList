import express, { json } from 'express';
import { Users, ToDos } from './PsudoDB.js';
import { v4 as uuidv4 } from 'uuid';
import { getUserByUsername } from './helpers/getUserByUsername.js';
const app = express();
const Options = {
  "Get":{
    "/":"O que você vê assim que entra :D",
    "/todo":"Retorna todos os ToDos"
  },
  "Post":{
    "/todo": "Cria um novo ToDos, só passar o no corpo da requisição a descrição do ToDos"
  },
  "Put/:id":{
    "/todo": "Atualiza um ToDos passando o index através do parametro id."
  },
  "Patch/:id":{
    "/todo": "Nesse caso, faz o mesmo que o put, atualiza um ToDos passando o index através do parametro id."
  },
  "Delete/:id":{
    "/todo": "Deleta o ToDos que foi passado o index na requisição"
  },
  "Options":{
    "/":"Eai, vem sempre aqui? Brincadeira, isso é o que você acabou de usar para ver isso ;)"
  }
}

app.use(json());

app.get("/", (req, res) =>{
  return res.send("Dê uma requisição do tipo options para ver o que pode fazer :D")
})
app.get("/users", (req, res) =>{
  return res.json(Users);
})
app.post("/users", (req, res) =>{
  const {name, username} = req.body;
  const VerificandoOutroUsername = Users.filter(obj => {
    return obj.username === username
  })[0]
  if(VerificandoOutroUsername){
    return res.send("Username já existe, por favor pense em outro, sei que vai encontrar um tão especial quanto você.")
  }
  Users.push(
    {
      id: uuidv4(),
      name,
      username,
      todos: []
    }
  )
  return res.json(Users);
})

app.get("/:username/todo", (req, res) => {

  const {username} = req.params;
  const User = getUserByUsername(Users, username)
 
  const ToDos = User["todos"]

  let todos = []
  ToDos.forEach( object => {
    todos.push({
      id: object.id,
      title: object.title,
      done: object.done,
      deadline: object.deadline,
      created_at: object.created_at
    })
  })

  return res.json(todos)
});

app.post("/:username/todo", (req, res) => {
  const todo = req.body;
  const {username} = req.params;
  const User = getUserByUsername(Users, username)
  const ToDoInsert = {
    id: todo.id,
    title: todo.title,
    done: todo.done, 
    deadline: new Date(Date.parse(todo.deadline)),
    created_at: new Date(Date.now())
  }
  User['todos'].push(ToDoInsert)
  return res.json(User['todos'])
})

app.put("/:username/todo/:id", (req, res) => {
  const {id, username} = req.params;
  const {todo} = req.body;
  const User = getUserByUsername(Users, username)
  ToDos[id] = todo
  return res.json(ToDos)
})

app.patch("/:username/todo/:id", (req, res) => {
  const {id, username} = req.params;
  const {todo} = req.body;
  const User = getUserByUsername(Users, username)
  ToDos[id] = todo
  return res.json(ToDos)
})

app.delete("/:username/todo/:id", (req, res) => {
  const {id, username} = req.params;
  const User = getUserByUsername(Users, username)
  ToDos.splice(id, 1)
  return res.json(ToDos)
})

app.options("/", (req, res) => {
  return res.json(Options)
})


app.listen(3333, console.log("Servidor rodando em http://localhost:3333"));