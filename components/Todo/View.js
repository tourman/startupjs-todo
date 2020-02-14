import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Modal, Button, View, FlatList, StyleSheet, Text, TextInput, Platform } from 'react-native'

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

function TodoModal({ text, visible, onChange, onSubmit, onClose }) {
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
  ) : null;
}

function TodoItem({ text, done, important, onEditTask, onDoneTask, onImportantTask, onDeleteTask }) {
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(text);
  useEffect(() => {
    setEdit(text);
  }, [text])
  return (
    <>
      <TodoModal
        text={edit}
        visible={modal}
        onChange={setEdit}
        onSubmit={() => {
          onEditTask(edit);
          setModal(false);
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
                <Button title='V' onPress={onDoneTask} />
                <Button title='!' onPress={onImportantTask} />
                <Button title='E' onPress={() => setModal(prevModal => !prevModal)} />
                <Button title='X' onPress={onDeleteTask} />
              </View>
              <View style={styles.hr} />
            </View>
      </>
  );
}

export default function TodoView ({ text, tasks, onAddTask, onEditTask, onDoneTask, onImportantTask, onDeleteTask, onChangeText }) {
  return (
    <>
      <View
        style={[styles.container, { paddingBottom: viewPadding }]}
      >
        <FlatList
          style={styles.list}
          data={tasks}
          renderItem={({ item, index }) => <TodoItem {...item} onEditTask={onEditTask(index)} onDoneTask={onDoneTask(index)} onImportantTask={onImportantTask(index)}
            onDeleteTask={onDeleteTask(index)}
          />}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          onSubmitEditing={onAddTask}
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
  tasks: PropTypes.arrayOf( PropTypes.shape({
    text: PropTypes.string.isRequired,
    important: PropTypes.bool.isRequired,
    done: PropTypes.bool.isRequired,
  }) ).isRequired,
  onAddTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onDoneTask: PropTypes.func.isRequired,
  onImportantTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
}