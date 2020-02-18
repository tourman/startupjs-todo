import React, { useState } from 'react'
import { observer, useDoc, useQuery } from 'startupjs'
import cloneDeep from 'lodash/cloneDeep'

import View from './View'

const useTaskIds = query => {
  const [tasks, $tasks] = useQuery('tasks', query);
  return [tasks.map(({ id }) => ({ id })), $tasks];
}

export default observer(function TasksContainer () {
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('');
  const cleanFilter = filter.trim();
  const [tasks, $tasks] = useTaskIds(cleanFilter.length ? { text: { $regex: cleanFilter } } : {});

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

  return pug`
    View(
      onAdd=handleAdd
      onSearch=() => {}
      onChangeText=setText
      onChangeFilter=setFilter
      text=text
      filter=filter
      tasks=tasks
    )
  `;
})