import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AddBar({ addTask }) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim() === '') {
      Alert.alert('No empty tasks allowed');
    } else {
      addTask(text);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Add to the list:</Text>
      <TextInput
        style={styles.input}
        value={text}
        placeholder="Add a task"
        onChangeText={setText}
      />
      <Button title="Add" onPress={handleAdd} color="#007BFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});
