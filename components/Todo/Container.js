import React from 'react'
import { observer, useDoc } from 'startupjs'
import cloneDeep from 'lodash/cloneDeep'

import View from './View'

const useTodo = () => {
  const [todo, $todo] = useDoc('todo', 'first')
  return [cloneDeep(todo), $todo]
}

export default observer(function TodoContainer () {
  const [{ text, tasks }, $todo] = useTodo()

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

  const handleEditTask = index => text => $todo.editTask({ index, text });

  const handleDoneTask = index => () => $todo.doneTask(index);

  const handleImportantTask = index => () => $todo.importantTask(index);

  const handleDeleteTask = index => () => $todo.deleteTask(index);

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
