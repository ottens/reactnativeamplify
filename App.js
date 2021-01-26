import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { CheckBox, Icon, ListItem, Input, Button, Header } from 'react-native-elements';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import config from './aws-exports';

import { Todo } from './models';

Amplify.configure(config);

const initialState = { name: '', description: '' };

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
    DataStore.observe(Todo).subscribe((msg) => {
      console.log({ model: msg.model, opType: msg.opType, element: msg.element });
      fetchTodos();
    });
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  async function fetchTodos() {
    try {
      const todos = await DataStore.query(Todo, Predicates.ALL, {
        sort: (s) => s.createdAt('ASCENDING'),
      });
      setTodos(todos);
    } catch (err) {
      console.log('error fetching todos', err);
    }
  }

  async function addTodo() {
    try {
      const todo = { ...formState };
      // setTodos([new Todo(todo), ...todos]);
      setFormState(initialState);
      // await API.graphql(graphqlOperation(createTodo, { input: todo }));
      await DataStore.save(new Todo(todo));
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }
  async function checkTodo(todo) {
    try {
      await DataStore.save(
        Todo.copyOf(todo, (updated) => {
          updated.status = !todo.status;
        })
      );
      fetchTodos();
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }
  const deleteTodo = async (id) => {
    try {
      const toDelete = await DataStore.query(Todo, id);
      await DataStore.delete(toDelete);
      fetchTodos();
    } catch (error) {
      console.log('error deleting todo:', err);
    }
  };
  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      addTodo();
      setFormState(initialState);
    }
  };

  return (
    <SafeAreaProvider>
      <Header centerComponent={{ text: 'React Native - Expo - AWS Amplify', style: { color: '#fff' } }} />
      <View style={styles.container}>
        <View style={styles.addTodo}>
          <View style={styles.addTodo}>
            <ListItem style={styles.addTodo}>
              <ListItem.Content style={styles.addTodo}>
                <Input
                  placeholder="Add todo"
                  style={styles.input}
                  onKeyPress={handleKeyUp}
                  value={formState.name}
                  onChangeText={(val) => setInput('name', val)}
                />
                {/* <TextInput
              onChangeText={(val) => setInput('name', val)}
              style={styles.input}
              value={formState.name}
              placeholder="Name"
            /> */}
              </ListItem.Content>
              <Icon name="add-outline" type="ionicon" color="#517fa4" onPress={addTodo} />
            </ListItem>
          </View>
          {todos
            .slice(0)
            .reverse()
            .map((todo, index) => (
              <View key={todo.id ? todo.id : index} style={styles.todo}>
                <ListItem key={index} bottomDivider>
                  <ListItem.Content>
                    <ListItem.CheckBox
                      checked={todo.status}
                      title={todo.name}
                      onPress={() => {
                        checkTodo(todo);
                      }}
                    />
                  </ListItem.Content>
                  <Icon
                    name="trash-outline"
                    type="ionicon"
                    color="#517fa4"
                    onPress={() => {
                      deleteTodo(todo.id);
                    }}
                  />
                </ListItem>
              </View>
            ))}
        </View>
        <View>
          <Button title="Sign out" type="clear" onPress={signOut} />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexdirection: 'row', padding: 10, height: 100 },
  todoName: { fontSize: 18 },
  addTodo: { padding: 0 },
  checkboxTodo: { border: 'none', backgroundColor: 'red' },
});

export default withAuthenticator(App);
