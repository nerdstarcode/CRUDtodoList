import express, { json } from 'express';
import { Users, ToDos } from './PsudoDB.js';
import { v4 as uuidv4 } from 'uuid';
import { getUserByUsername } from './helpers/getUserByUsername.js';
import { getToDoById } from './helpers/getToDoById.js';

const app = express();

const Options = {
  "Get":{
    "/":"O que você vê assim que entra :D",
    "/users": "Lista os usuários cadastrados",
    "/:username/todo":"Retorna todos os ToDos do usuário informado"
  },
  "Post":{
    "/users": "Cria um novo usuário",
    "/:username/todo": "Cria um novo ToDos, só passar o no corpo da requisição a descrição do ToDos"
  },
  "Put/:id":{
    "/:username/todo/:id": "Atualiza um ToDo do usuário indicado passando o index através do parametro id."
  },
  "Patch/:id":{
    "/:username/todo/:id/done": "Atualiza se a tarefa com o id indicado do usuário indicado foi terminada ou não"
  },
  "Delete/:id":{
    "/:username/todo/:id": "Deleta o ToDo do usuário indicado que foi passado o index na requisição"
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
  const todo = req.body;

  const User = getUserByUsername(Users, username)

  const indexTodo = getToDoById(User['todos'], id, res)

  const ToDoToUpdated = User["todos"][indexTodo]
  todo.title !== undefined ? ToDoToUpdated.title = todo.title : 'não foi dado title para alterar'
  todo.deadline !== undefined ? ToDoToUpdated.deadline = new Date(Date.parse(todo.deadline)) : 'não foi dado deadline para alterar'
  return res.json(ToDoToUpdated)
})

app.patch("/:username/todo/:id/done", (req, res) => {
  const {id, username} = req.params;
  const User = getUserByUsername(Users, username)
  const indexTodo = getToDoById(User['todos'], id, res)
  
  const ToDoToUpdated = User["todos"][indexTodo]
  if(!ToDoToUpdated.done){
    ToDoToUpdated.done = true
    ToDoToUpdated.completed_at = new Date(Date.now())
  }else{
    return res.send('Tarefa já completada')
  }
  return res.json(ToDoToUpdated)
})

app.delete("/:username/todo/:id", (req, res) => {
  const {id, username} = req.params;
  const User = getUserByUsername(Users, username)
  const indexTodo = getToDoById(User['todos'], id, res)
  const ToDoToUpdated = User["todos"]
  
  ToDoToUpdated.splice(indexTodo, 1)
  return res.json(ToDoToUpdated)
})

app.options("/", (req, res) => {
  return res.json(Options)
})


app.listen(3333, console.log("Servidor rodando em http://localhost:3333"));