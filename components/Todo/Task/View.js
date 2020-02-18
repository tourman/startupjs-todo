import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, View, FlatList, StyleSheet, Text, TextInput, Platform } from 'react-native'
import { observer, useDoc, useQuery } from 'startupjs'

import './View.styl';

function TaskModal ({ text, visible, onChange, onSubmit, onClose }) {
   return visible ? pug`
     Modal(
       visible=visible
       transparent=false
       onRequestClose=onClose
     )
       View
         TextInput(
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
        View.list
          if important
            Text !
          else
            = null
          Text.item
            = text
          if done
            Text Done
          else
            = null
          Button(title='V' onPress=onDone)
          Button(title='!' onPress=onImportant)
          Button(title='E' onPress=handleEdit)
          Button(title='X' onPress=onDelete)
        View.hr
  `
}
