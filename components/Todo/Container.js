import React from 'react';
import { observer, useModel, useDoc } from 'startupjs'
import cloneDeep from 'lodash/cloneDeep';

import View from './View';

const useTodo = () => {
  const [todo, $todo] = useDoc('todo', 'first');
  return [cloneDeep(todo), $todo];
}

export default observer(function TodoContainer() {
  const [todo, $todo] = useTodo();

  const handleChangeText = text => $todo.setAsync('text', text);

  const handleAddTask = () => {
    const text = todo.text.trim();
    if (!text) {
      return;
    }
    $todo.setAsync('text', '');
    $todo.setAsync('tasks', [...todo.tasks, text]);
  };

  const handleDeleteTask = index => () => $todo.setAsync('tasks', todo.tasks.filter((task, i) => index !== i));

  const { text, tasks } = todo;

  return (<View
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    onChangeText={handleChangeText}
    text={text}
    tasks={tasks}
  />);
});