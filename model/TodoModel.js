import { BaseModel } from 'startupjs/orm'
import uniqueId from 'lodash/uniqueId';

export default class TodoModel extends BaseModel {
  async addSelf () {
    await this.root.addAsync(this.getCollection(), {
      id: this.getId(),
      text: '',
      tasks: []
    })
  }

  async addTask(task) {
    const id = uniqueId('task');
    await this.pushAsync('tasks', {
      id,
      ...task,
    });
  }

  async deleteTask(index) {
    await this.removeAsync('tasks', index);
  }

  async resetText() {
    await this.setAsync('text', '');
  }

  async toggleAsync(path) {
    const flag = this.get(path);
    await this.setAsync(path, !flag);
  }

  async doneTask(index) {
    await this.toggleAsync(`tasks.${index}.done`);
  }

  async importantTask(index) {
    await this.toggleAsync(`tasks.${index}.important`); 
  }
}
