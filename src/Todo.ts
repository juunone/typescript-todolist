import {Priority, PRIORITY_NAME_MAP} from './type'
import chalk from 'chalk';

export default class Todo {
  static nextId : number = 1;
  constructor(
    private title: string, 
    private priority: Priority, 
    public id: number = Todo.nextId
  ) {
    Todo.nextId++;
  }

  toString() {
    // return `${this.id}) 제목: ${this.title} (우선순위: ${PRIORITY_NAME_MAP[this.priority]})`
    return chalk`{blue.bold ${this.id})} 제목: {bold ${this.title}} (우선순위: {${PRIORITY_STYLE_MAP[this.priority]} ${PRIORITY_NAME_MAP[this.priority]}})`
  }
}

const PRIORITY_STYLE_MAP: {[key in Priority]: string} = {
  [Priority.High]: 'red.bold',
  [Priority.Medium]: 'grey.bold',
  [Priority.Low]: 'yellow.bold',
}

