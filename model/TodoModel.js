import { BaseModel } from 'startupjs/orm'

export default class CounterModel extends BaseModel {
  async addSelf () {
    await this.root.addAsync(this.getCollection(), {
      id: this.getId(),
      tasks: [],
    })
  }
}
