import Counter from './CounterModel'
import Todo from './TodoModel'

export default function (racer) {
  racer.orm('counters.*', Counter)
  racer.orm('todo.*', Todo)
}
