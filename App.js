import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddTask = () => {
    if (task) {
      if (editIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = { text: task, completed: tasks[editIndex].completed };
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        setTasks([...tasks, { text: task, completed: false }]);
      }
      setTask("");
    }
  };

  const handleEditTask = (index) => {
    if (!tasks[index].completed) {
      const taskToEdit = tasks[index];
      setTask(taskToEdit.text);
      setEditIndex(index);
    }
  };

  const handleToggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.task}>
      <TouchableOpacity
        onPress={() => handleToggleCompletion(index)}
        style={styles.checkbox}
      >
        <Icon
          name={item.completed ? "check-square" : "square-o"}
          size={30}
          color={item.completed ? "green" : "black"}
        />
      </TouchableOpacity>
      <Text style={[styles.itemList, { textDecorationLine: item.completed ? 'line-through' : 'none' }]}>
        {item.text}
      </Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => handleEditTask(index)} disabled={item.completed}>
          <Icon name="edit" size={30} color={item.completed ? "gray" : "green"} />
        </TouchableOpacity>
        <View style={styles.buttonSeparator} />
        <TouchableOpacity onPress={() => handleDeleteTask(index)} disabled={item.completed}>
          <Icon name="trash" size={30} color={item.completed ? "gray" : "red"} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lista de Tareas</Text>
      <Text style={styles.title}>ToDo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe una tarea"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TouchableOpacity
        style={[
          styles.addButton,
          { backgroundColor: editIndex !== -1 ? 'green' : 'black' },
        ]}
        onPress={handleAddTask}
      >
        <Text style={styles.addButtonText}>
          {editIndex !== -1 ? "Actualizar Tarea" : "Agregar Tarea"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 7,
    color: "green",
    textAlign: "center",
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
    fontSize: 18,
  },
  itemList: {
    fontSize: 19,
  },
  taskButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonSeparator: {
    width: 20,
  },
  checkbox: {
    marginRight: 10,
  },
});

export default App;