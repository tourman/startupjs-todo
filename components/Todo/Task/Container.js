import React, { useState } from 'react'
import { observer, useDoc, useQuery } from 'startupjs'
import cloneDeep from 'lodash/cloneDeep'

import View from './View'

export default observer(function TaskContainer ({ id }) {
  const [task, $task] = useDoc('tasks', id);
  const handleDelete = () => $task.del();
  const handleDone = () => {
    const done = $task.get('done');
    $task.set('done', !done);
  }
  const handleImportant = () => {
    const important = $task.get('important');
    $task.set('important', !important);
  }
  const handleEdit = text => $task.set('text', text);
  const { text, done, important } = task;
  return (
    <View
      text={text}
      done={done}
      important={important}
      onDelete={handleDelete}
      onDone={handleDone}
      onImportant={handleImportant}
      onEdit={handleEdit}
    />
  );
});
