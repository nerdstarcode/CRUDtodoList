import { v4 as uuidv4 } from 'uuid';
export let ToDos = [
  {
    id: uuidv4(),
    title: 'BORA BILL!!',
    done: false,
    deadline: Date.parse('2022-12-30T00:00:00.000z'),
    created_at: Date.parse('2022-12-19T22:26:25.123z')
  },
  {
    id: uuidv4(),
    title: 'BORA BILL!!',
    done: false,
    deadline: new Date(Date.parse('2022-12-30T00:00:00.000z')),
    created_at: new Date(Date.parse('2022-12-19T22:26:25.123z'))
  },
]
export let Users =[
  {
    id: uuidv4(),
    name: 'Sthiven',
    username: 'NerdStarBoss',
    todos: ToDos
  }
]