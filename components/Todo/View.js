import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, View, FlatList, StyleSheet, Text, TextInput, Platform } from 'react-native'
import { observer, useDoc, useQuery } from 'startupjs'

const isAndroid = Platform.OS === 'android'
const viewPadding = 10

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: viewPadding,
    paddingTop: 20
  },
  list: {
    width: '100%'
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18
  },
  hr: {
    height: 1,
    backgroundColor: 'gray'
  },
  listItemCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: isAndroid ? 0 : 1,
    width: '100%'
  }
})

function TodoModal ({ text, visible, onChange, onSubmit, onClose }) {
  return visible ? (
    <Modal
      visible={visible}
      transparent={false}
      onRequestClose={onClose}
    >
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={onChange}
          onSubmitEditing={onSubmit}
          value={text}
          returnKeyType='done'
          returnKeyLabel='done'
        />
      </View>
    </Modal>
  ) : null
}

const TodoItemContainer = observer(function TodoItemContainer ({ id }) {
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
    <TodoItem
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

function TodoItem ({ text, done, important, onEdit, onDone, onImportant, onDelete }) {
  const [modal, setModal] = useState(false)
  const [edit, setEdit] = useState(text)
  useEffect(() => {
    setEdit(text)
  }, [text])
  return (
    <>
      <TodoModal
        text={edit}
        visible={modal}
        onChange={setEdit}
        onSubmit={() => {
          onEdit(edit)
          setModal(false)
        }}
        onClose={() => setModal(false)}
      />
      <View>
        <View style={styles.listItemCont}>
          {important ? <Text>!</Text> : null}
          <Text style={styles.listItem}>
            {text}
          </Text>
          {done ? <Text>(Done)</Text> : null}
          <Button title='V' onPress={onDone} />
          <Button title='!' onPress={onImportant} />
          <Button title='E' onPress={() => setModal(prevModal => !prevModal)} />
          <Button title='X' onPress={onDelete} />
        </View>
        <View style={styles.hr} />
      </View>
    </>
  )
}

export default function TodoView ({ text, tasks, onAdd, onChangeText }) {
  return (
    <>
      <View
        style={[styles.container, { paddingBottom: viewPadding }]}
      >
        <FlatList
          style={styles.list}
          data={tasks}
          renderItem={({ item: { id } }) => (
            <TodoItemContainer
              id={id}
            />
          )}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          onSubmitEditing={onAdd}
          value={text}
          placeholder='Add Tasks'
          returnKeyType='done'
          returnKeyLabel='done'
        />
      </View>
      <Text>---</Text>
    </>
  )
};

TodoView.propTypes = {
  text: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  onAdd: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired
}
