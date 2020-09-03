import { AppState, Priority, PRIORITY_NAME_MAP, ActionNewTodo, Action, ActionDeleteTodo } from "./type";
import { waitForInput } from "./Input";
import { getIsValidEnumValue } from "./util";
import chalk from 'chalk'

export abstract class Command {
  constructor(public key: string, private desc: string){

  }
  toString() {
    return chalk`{blue.bold ${this.key}}: ${this.desc}`;
  }
  abstract async run(state: AppState): Promise<void | Action>
}

export class CommandPrintTodos extends Command {
  constructor(){
    super('p', chalk`모든 할 일 {red.bold 출력}하기`);
  }

  async run(state: AppState): Promise<void> {
    for(const todo of state.todos){
      const text = todo.toString();
      console.log(text)
    }
    await waitForInput('press any key: ')
  }
}

export class CommandNewTodo extends Command {
  constructor(){
    super('n', chalk`할 일 {red.bold 추가}하기`);
  }

  async run(): Promise<void | ActionNewTodo> {
    const title = await waitForInput('title: ')
    // priority 높음 (0) ~ 낮음 (2)
    const priorityStr = await waitForInput(`priority: ${PRIORITY_NAME_MAP[Priority.High]}${Priority.High} ~ ${PRIORITY_NAME_MAP[Priority.Low]}${Priority.Low}: `)
    const priority = Number(priorityStr);

    if(title && CommandNewTodo.getIsPriority(priority)){
      return {
        type:'newTodo',
        title,
        priority
      }
    }
  }
  static getIsPriority(priority: number): priority is Priority {
    return getIsValidEnumValue(Priority, priority);
  }
}

export class CommandDeleteTodo extends Command {
  constructor(){
    super('d', chalk`할 일 {red.bold 제거}하기`);
  }

  async run(state: AppState): Promise<void | ActionDeleteTodo> {
    for(const todo of state.todos){
      const text = todo.toString();
      console.log(text);
    }

    const idStr = await waitForInput('press todo id to delete: ')
    const id = Number(idStr)
    return {
      type:'deleteTodo',
      id
    }
  }
  static getIsPriority(priority: number): priority is Priority {
    return getIsValidEnumValue(Priority, priority);
  }
}