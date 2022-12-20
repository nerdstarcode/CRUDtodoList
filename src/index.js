const express = require('express');
const app = express();
const Options = {
  "Get":{
    "/":"O que você vê assim que entra :D",
    "/todo":"Retorna todos os ToDo"
  },
  "Post":{
    "/todo": "Cria um novo ToDo, só passar o no corpo da requisição a descrição do ToDo"
  },
  "Put/:id":{
    "/todo": "Atualiza um ToDo passando o index através do parametro id."
  },
  "Patch/:id":{
    "/todo": "Nesse caso, faz o mesmo que o put, atualiza um ToDo passando o index através do parametro id."
  },
  "Delete/:id":{
    "/todo": "Deleta o ToDo que foi passado o index na requisição"
  },
  "Options":{
    "/":"Eai, vem sempre aqui? Brincadeira, isso é o que você acabou de usar para ver isso ;)"
  }
}
let ToDo = [
  "Never",
  "Stop",
  "Learning",
]
app.use(express.json());

app.get("/", (req, res) =>{
  return res.send("Dê uma requisição do tipo options para ver o que pode fazer :D")
})

app.get("/todo", (req, res) => {
  return res.json(ToDo)
});

app.post("/todo", (req, res) => {
  const {todo} = req.body;
  if(todo==null){
    return res.status(400).json({message: 'Tente colocar algo do tipo {"todo": "Conteudo do Todo"}'})
  }
  ToDo.push(todo)
  return res.json(ToDo)
})

app.put("/todo/:id", (req, res) => {
  const {id} = req.params;
  const {todo} = req.body;
  ToDo[id] = todo
  return res.json(ToDo)
})

app.patch("/todo/:id", (req, res) => {
  const {id} = req.params;
  const {todo} = req.body;
  ToDo[id] = todo
  return res.json(ToDo)
})

app.delete("/todo/:id", (req, res) => {
  const {id} = req.params;
  ToDo.splice(id, 1)
  return res.json(ToDo)
})

app.options("/", (req, res) => {
  return res.json(Options)
})


app.listen(3333, console.log("Servidor rodando em http://localhost:3333"));