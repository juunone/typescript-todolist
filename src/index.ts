import { waitForInput } from "./Input";
import { AppState, Priority, Action } from "./type";
import Todo from "./Todo";
import { CommandPrintTodos, Command, CommandNewTodo, CommandDeleteTodo } from "./Command";

const commands: Command[] = [
  new CommandPrintTodos(),
  new CommandNewTodo(),
  new CommandDeleteTodo
]

async function main() {
  let state: AppState = {
    todos: [
      new Todo('test1', Priority.High),
      new Todo('test2', Priority.Medium),
      new Todo('test3', Priority.Low)
    ]
  } 

  while(true){
    console.clear();
    for(const command of commands){
      console.log(command.toString())
    }
    console.log();
    const key = await waitForInput('input commnad: ')
    console.clear();
    const command = commands.find(item => item.key === key);
    if(command){
      const action = await command.run(state);
      if(action){
        state = getNextState(state, action)
      }
    }
  }
}
main();

function getNextState(state: AppState, action: Action): AppState {
  switch(action.type){
    case 'newTodo':
      return{
        ...state,
        todos:[
          ...state.todos, new Todo(action.title, action.priority)
        ]
      }
    case 'deleteTodo':
      return{
        ...state,
        todos: state.todos.filter(item => item.id !== action.id)
      }
  }
} 