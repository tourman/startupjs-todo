import Counter from './CounterModel'
import Task from './TaskModel'

export default function (racer) {
  racer.orm('counters.*', Counter)
  racer.orm('tasks.*', Task)
}
