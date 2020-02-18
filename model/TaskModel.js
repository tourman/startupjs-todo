import { BaseModel } from 'startupjs/orm'

export default class TaskModel extends BaseModel {
  async toggle (path) {
    const flag = this.get(path)
    await this.setAsync(path, !flag)
  }
}
