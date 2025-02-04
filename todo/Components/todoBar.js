import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function TodoBar({ todos, toggleComplete, removeTask }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => toggleComplete(item.id)}
            onLongPress={() => removeTask(item.id)}
          >
            <Text
              style={[
                styles.todoText,
                item.completed && styles.completed,
              ]}
            >
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    marginTop: 20,
  },
  item: {
    padding: 15,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  todoText: {
    fontSize: 18,
    color: '#333',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});
