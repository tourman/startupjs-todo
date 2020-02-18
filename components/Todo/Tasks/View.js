import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, View, FlatList, StyleSheet, Text, TextInput, Platform } from 'react-native'
import { observer, useDoc, useQuery } from 'startupjs'

import Task from '../Task';

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

const renderItem = ({ item: { id } }) => pug`
  Task(
    id=id
  )
`;

export default function TasksView ({ text, filter, tasks, onAdd, onSearch, onChangeText, onChangeFilter }) {
  return pug`
    View(
      style=[styles.container, { paddingBottom: viewPadding }]
    )
      TextInput(
        style=styles.textInput
        onChangeText=onChangeFilter
        onSubmitEditing=onSearch
        value=filter
        placeholder='Find Tasks'
        returnKeyType='done'
        returnKeyLabel='done'
      )
      FlatList(
        style=styles.list
        data=tasks
        renderItem=renderItem
      )
      TextInput(
        style=styles.textInput
        onChangeText=onChangeText
        onSubmitEditing=onAdd
        value=text
        placeholder='Add Tasks'
        returnKeyType='done'
        returnKeyLabel='done'
      )
  `;
};
