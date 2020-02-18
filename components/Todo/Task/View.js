import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, View, FlatList, Text, TextInput, Platform } from 'react-native'
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
        View.item
          Text.text
            = text
          View.btn
            Button(title='Done' onPress=onDone color=(done ? 'gray' : null))
          View.btn
            Button(title='Imp' onPress=onImportant color=(important ? 'red' : null))
          View.btn
            Button(title='Edit' onPress=handleEdit)
          View.btn
            Button(title='Remove' onPress=onDelete)
        View.hr
  `
}
