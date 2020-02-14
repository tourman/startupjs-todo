import React from 'react'
import { observer, useDoc } from 'startupjs'
import cloneDeep from 'lodash/cloneDeep'

import View from './View'

const useTodo = () => {
  const [todo, $todo] = useDoc('todo', 'first')
  return [cloneDeep(todo), $todo]
}

export default observer(function TodoContainer () {
  const [{ text, tasks: rawTasks }, $todo] = useTodo()
  const tasks = rawTasks.filter(task => typeof task === 'object') // FILTER SHOULD BE REMOVED

  const handleChangeText = text => $todo.setAsync('text', text)

  const handleAddTask = () => {
    const readyText = text.trim()
    if (!readyText) {
      return
    }
    const task = {
      text: readyText,
      done: false,
      important: false,
    }
    $todo.setAsync('text', '')
    $todo.setAsync('tasks', [...tasks, task])
  }

  const handleDeleteTask = index => () => $todo.setAsync('tasks', tasks.filter((task, i) => index !== i))

  return (
    <View
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      onChangeText={handleChangeText}
      text={text}
      tasks={tasks}
    />
  )
})
