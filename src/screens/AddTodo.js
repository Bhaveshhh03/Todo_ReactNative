import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";

const AddTodo = ({ navigation, route }) => {
  const { todoData } = route.params || {}; // Get the todo item if passed for editing from main screen
  const dispatch = useDispatch();
  const [task, setTask] = useState(todoData ? todoData.title : ""); // Initialize with existing title if editing
  const handleAdd = () => {
  if (task.trim() === "") {
    alert("Please enter a task.");
    return;
  }
    const data = {
      id: Date.now(), // Using timestamp as a simple unique ID
      title: task,
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    dispatch({ type: "ADD_TODO", payload: data });
    navigation.goBack();
  };
    const handleEdit = () => {
    const data = {
      id: todoData.id, // Using the existing ID
      title: task,
    };
    dispatch({ type: "EDIT_TODO", payload: data });
    navigation.goBack();
  };


  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={{width:100}}>
          <Text style={styles.headerTitle}>{todoData ? "Edit Todo" : "Add Todo"}</Text>
        </View>

        <View style={{ width: 24 }} />
      </View>

      {/* Input */}
      <View style={styles.content}>
        <TextInput
          placeholder="Enter your task..."
          placeholderTextColor={'#525151'}
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />

        {/* Add Button */}
       {todoData ?
        <TouchableOpacity style={styles.addButton} onPress={handleEdit}>
          <Text style={styles.addText}>Save Changes</Text>
        </TouchableOpacity>:
         <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addText}>Add Task</Text>
        </TouchableOpacity>}
      </View>

    </View>
  );
};

export default AddTodo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    backgroundColor: "#fff",
    elevation: 3,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  content: {
    padding: 20,
  },

  input: {
    backgroundColor: "#ECECEC",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 20,
  },

  addButton: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  addText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

