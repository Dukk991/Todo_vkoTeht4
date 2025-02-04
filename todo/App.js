import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import AddBar from './Components/addBar';
import TodoBar from './Components/todoBar';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('todos');
        if (storedTodos) {
          const parsedTodos = JSON.parse(storedTodos);
          setTodos(parsedTodos);

          const highestId = parsedTodos.length > 0 ? Math.max(...parsedTodos.map(todo => todo.id)) : 0;
          setId(highestId + 1);
        }
      } catch (error) {
        console.log('Error loading previous todos', error);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.log('Error saving todos', error);
      }
    };

    saveTodos();
  }, [todos]);

  const addTask = (taskname) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id, name: taskname, completed: false },
    ]);
    setId(id + 1);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTask = async (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);

    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.log('Error removing from storage', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <AddBar addTask={addTask} />
      {todos.length === 0 ? (
        <Text style={styles.noTasksText}>Add some tasks</Text>
      ) : (
        <TodoBar todos={todos} toggleComplete={toggleComplete} removeTask={removeTask} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  noTasksText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
  },
});
