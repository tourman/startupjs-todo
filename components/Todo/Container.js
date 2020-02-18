import React, { useState } from 'react'
import { observer, useDoc, useQuery } from 'startupjs'
import cloneDeep from 'lodash/cloneDeep'

import View from './View'

export default observer(function TodoContainer () {
  const [tasks, $tasks] = useQuery('tasks', {});
  const [text, setText] = useState('');

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
      onChangeText={setText}
      text={text}
      tasks={tasks}
    />
  )
})
