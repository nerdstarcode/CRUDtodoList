export function getToDoById(ToDos, id, res){
  const indexTodo = ToDos.findIndex((item) => item.id === id);
  const NotFound = (indexTodo == -1)
  if(NotFound){
    return res.status(404).send({message: `Não foi encontrado nenhum ToDo com esse id: ${id}`})
  }
  return indexTodo
}