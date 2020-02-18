import React, { useState } from 'react'
import { observer, useDoc, useQuery } from 'startupjs'
import cloneDeep from 'lodash/cloneDeep'

import View from './View'

export default observer(function TasksContainer () {
  const [tasks, $tasks] = useQuery('tasks', {});
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('');

  const handleAdd = () => {
    const readyText = text.trim()
    if (!readyText) {
      return
    }
    setText('');
    $tasks.add({
      text: readyText,
      done: false,
      important: false,
    });
  }

  return (
    <View
      onAdd={handleAdd}
      onSearch={() => {}}
      onChangeText={setText}
      onChangeFilter={setFilter}
      text={text}
      text={filter}
      tasks={tasks}
    />
  )
})
