import React, { Fragment, useState, useEffect } from 'react'
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

function TaskModal ({ text, visible, onChange, onSubmit, onClose }) {
   return visible ? pug`
     Modal(
       visible=visible
       transparent=false
       onRequestClose=onClose
     )
       View
         TextInput(
           style=styles.textInput
           onChangeText=onChange
           onSubmitEditing=onSubmit
           value=text
           returnKeyType='done'
           returnKeyLabel='done'
         )
   ` : null;
}

export default function TaskView ({ text, done, important, onEdit, onDone, onImportant, onDelete }) {
  const [modal, setModal] = useState(false)
  const [edit, setEdit] = useState(text)
  useEffect(() => {
    setEdit(text)
  }, [text])
  const handleSubmit = () => {
    onEdit(edit)
    setModal(false)
  }
  const handleClose = () => setModal(false);
  const handleEdit = () => setModal(prevModal => !prevModal);
  return pug`
    Fragment
      TaskModal(
        text=edit
        visible=modal
        onChange=setEdit
        onSubmit=handleSubmit
        onClose=handleClose
      )
      View
        View(style=styles.listItemCont)
          if important
            Text !
          else
            = null
          Text(style=styles.listItem)
            = text
          if done
            Text Done
          else
            = null
          Button(title='V' onPress=onDone)
          Button(title='!' onPress=onImportant)
          Button(title='E' onPress=handleEdit)
          Button(title='X' onPress=onDelete)
        View(style=styles.hr)
  `
}