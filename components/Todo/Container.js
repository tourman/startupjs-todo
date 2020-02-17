import React from 'react'
import { observer, useDoc } from 'startupjs'
import cloneDeep from 'lodash/cloneDeep'

import View from './View'

const useTodo = () => {
  const [todo, $todo] = useDoc('todo', 'first')
  return [cloneDeep(todo), $todo]
}

const handleToggle = ({ $todo, tasks, flag, index }) => $todo.setAsync('tasks', tasks.map((task, i) => index === i ? { ...task, [flag]: !task[flag] } : task))

export default observer(function TodoContainer () {
  const [{ text, tasks: rawTasks }, $todo] = useTodo()
  const tasks = Object.values(rawTasks).filter(task => typeof task === 'object' && task.id) // FILTER SHOULD BE REMOVED

  const handleChangeText = text => $todo.setAsync('text', text)

  const handleAddTask = async () => {
    const readyText = text.trim()
    if (!readyText) {
      return
    }
    const task = {
      text: readyText,
      done: false,
      important: false
    }
    await Promise.all([
      $todo.resetText(),
      $todo.addTask(task),
    ]);
  }

  const handleEditTask = index => text => $todo.setAsync('tasks', tasks.map((task, i) => index === i ? { ...task, text } : task))

  const handleDoneTask = index => () => handleToggle({ $todo, tasks, index, flag: 'done' })

  const handleImportantTask = index => () => handleToggle({ $todo, tasks, index, flag: 'important' })

  const handleDeleteTask = index => () => $todo.setAsync('tasks', tasks.filter((task, i) => index !== i))

  return (
    <View
      onAddTask={handleAddTask}
      onEditTask={handleEditTask}
      onDoneTask={handleDoneTask}
      onImportantTask={handleImportantTask}
      onDeleteTask={handleDeleteTask}
      onChangeText={handleChangeText}
      text={text}
      tasks={tasks}
    />
  )
})
