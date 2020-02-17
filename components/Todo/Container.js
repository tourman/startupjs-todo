import React, { useState } from 'react'
import { observer, useDoc } from 'startupjs'
import cloneDeep from 'lodash/cloneDeep'

import View from './View'

const useTodo = () => {
  const [todo, $todo] = useDoc('todo', 'tasks')
  if (!todo) throw $todo.addSelf()
  return [cloneDeep(todo), $todo]
}

export default observer(function TodoContainer () {
  const [{ tasks }, $todo] = useTodo()
  const [text, setText] = useState('');

  const handleAddTask = async () => {
    const readyText = text.trim()
    if (!readyText) {
      return
    }
    setText('');
    await $todo.addTask(readyText);
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
      onChangeText={setText}
      text={text}
      tasks={tasks}
    />
  )
})
