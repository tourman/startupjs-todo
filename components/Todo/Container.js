import React from 'react';
import { observer, useModel, useDoc } from 'startupjs'
import cloneDeep from 'lodash/cloneDeep';

import View from './View';

const useTodo = () => {
  const [todo, $todo] = useDoc('todo', 'first');
  return [cloneDeep(todo), $todo];
}

export default observer(function TodoContainer() {
  const [{ text, tasks }, $todo] = useTodo();

  const handleChangeText = text => $todo.setAsync('text', text);

  const handleAddTask = () => {
    const readyText = text.trim();
    if (!readyText) {
      return;
    }
    $todo.setAsync('text', '');
    $todo.setAsync('tasks', [...tasks, readyText]);
  };

  const handleDeleteTask = index => () => $todo.setAsync('tasks', tasks.filter((task, i) => index !== i));

  return (<View
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    onChangeText={handleChangeText}
    text={text}
    tasks={tasks}
  />);
});