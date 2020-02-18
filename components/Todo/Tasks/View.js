import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, View, FlatList, StyleSheet, Text, TextInput, Platform } from 'react-native'
import { observer, useDoc, useQuery } from 'startupjs'

import Task from '../Task';
import './View.styl';

const renderItem = ({ item: { id } }) => pug`
  Task(
    id=id
  )
`;

export default function TasksView ({ text, filter, tasks, onAdd, onSearch, onChangeText, onChangeFilter }) {
  return pug`
    View.container
      TextInput.input(
        onChangeText=onChangeFilter
        onSubmitEditing=onSearch
        value=filter
        placeholder='Find Tasks'
        returnKeyType='done'
        returnKeyLabel='done'
      )
      FlatList.list(
        data=tasks
        renderItem=renderItem
      )
      TextInput.input(
        onChangeText=onChangeText
        onSubmitEditing=onAdd
        value=text
        placeholder='Add Tasks'
        returnKeyType='done'
        returnKeyLabel='done'
      )
  `;
};
