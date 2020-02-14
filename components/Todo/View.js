import React, { useState } from 'react';
import { Button, SafeAreaView, View, FlatList, StyleSheet, Text }  from 'react-native'
import {
  AsyncStorage,
  TextInput,
  Keyboard,
  Platform
} from "react-native";
import { observer, useModel, useDoc } from 'startupjs'

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: viewPadding,
    paddingTop: 20
  },
  list: {
    width: "100%"
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18
  },
  hr: {
    height: 1,
    backgroundColor: "gray"
  },
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: isAndroid ? 0 : 1,
    width: "100%"
  }
});

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export default function TodoView({ text, tasks, onAddTask, onDeleteTask, onChangeText }) {
  return (
    <>
      <View
        style={[styles.container, { paddingBottom: viewPadding }]}
      >
        <FlatList
          style={styles.list}
          data={tasks}
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.listItemCont}>
                <Text style={styles.listItem}>
                  {item}
                </Text>
                <Button title="X" onPress={onDeleteTask(index)} />
              </View>
              <View style={styles.hr} />
            </View>}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          onSubmitEditing={onAddTask}
          value={text}
          placeholder="Add Tasks"
          returnKeyType="done"
          returnKeyLabel="done"
        />
      </View>
      <Text>{'---'}</Text>
    </>
  );
};