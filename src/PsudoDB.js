import { v4 as uuidv4 } from 'uuid';
export let ToDos = [
  {
    id: "ba7c8126-4cca-4927-9066-1fc65acf5b82",
    title: 'BORA BILL!!',
    done: false,
    deadline: Date.parse('2022-12-30T00:00:00.000z'),
    created_at: Date.parse('2022-12-19T22:26:25.123z')
  },
  {
    id: "9096a00e-9f4c-4273-8739-2b1d531c2ce8",
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