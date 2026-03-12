import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import TodoCard from '../components/TodoCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { create } from 'react-native/types_generated/Libraries/ReactNative/ReactFabricPublicInstance/ReactNativeAttributePayload';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmModal from '../components/ConfirmModal';
import { Dropdown } from 'react-native-element-dropdown';

const TodoItems = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [loading, setloading] = useState(false); //for api loading state
  const [isModalVisible, setisModalVisible] = useState(false); //modal visibility state
  const [taskToDeleted, setTaskToDeleted] = useState(null); //task to be deleted
  const [totalTask, settotalTask] = useState(null); //total task count state
  const [totalCompletedTask, settotalCompletedTask] = useState(null); // total completed task count state;
  const [sort, setsort] = useState(null); // state for sorting the task
  const [filter, setfilter] = useState(null); // state for filtering the task
  const [filteredTodos, setfilteredTodos] = useState([]);

  //Sort Options
  const sortOptions = [
    { label: 'Recent', value: 'recent' },
    { label: 'By id', value: 'id' },
  ];
  const filterOptions = [
    { label: 'All', value: 'All' },
    { label: 'Active', value: 'Active' },
    { label: 'Done', value: 'Done' },
  ];
  //   For fetching the data from api
  const fetchTodos = async () => {
    setloading(true);
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
      const data = res.data.slice(0, 20); // Limiting to first 20 items for demo
      const todosData = data.map(item => ({
        ...item,
        createdAt: new Date().toISOString(), // Adding createdAt field
        updatedAt: new Date().toISOString(), // Adding updatedAt field
      }));

      dispatch({ type: 'SET_TODO', payload: todosData }); // Dispatching to Redux store
      setloading(false);
    } catch (error) {
      console.log('Error fetching todos:', error);
      setloading(false);
    }
  };

  const filteredAndSortedTodos = [...todos]
  .filter(item => {
    if (filter === 'Active') return !item.completed;
    if (filter === 'Done') return item.completed;
    return true;
  })
  .sort((a, b) => {
    if (sort === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sort === 'id') {
      return a.id - b.id;
    }
    return 0;
  });
  const TaskCompleteCount = filteredAndSortedTodos?.filter(item => item.completed).length; // Count of completed tasks
  console.log("Filtered and Sorted Todos:", filteredAndSortedTodos); // Debug log to check filtered and sorted todos
  useEffect(() => {
    settotalTask(filteredAndSortedTodos.length);
    settotalCompletedTask(TaskCompleteCount);
  }, [filteredAndSortedTodos]);


  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleTodo = id => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  // for Deleting the task
  const handleDelete = () => {
    dispatch({ type: 'DELETE_TODO', payload: taskToDeleted?.id });
    setisModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TodoCard
      title={item.title}
      completed={item.completed}
      onToggle={() => toggleTodo(item.id)}
      onEdit={() => navigation.navigate('AddTodo', { todoData: item })}
      onDelete={() => {
        setTaskToDeleted(item);
        setisModalVisible(true);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's tasks</Text>
      {/* Subheader with total and completed task count, sorting and filtering options */}
      <View style={styles.subHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={{ fontSize: 16, color: '#000' }}>
            Total: {totalTask}
          </Text>
          <Text style={{ fontSize: 16, color: '#000' }}>
            Done: {totalCompletedTask}
          </Text>
        </View>
        {/* Sorting and filtering options */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={sortOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Sort by"
            value={sort}
            onChange={item => {
              setsort(item.value);
            }}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={filterOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Filter by"
            value={filter}
            onChange={item => {
              setfilter(item.value);
            }}
          />
        </View>
      </View>

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#000" />
          <Text style={{ textAlign: 'center', marginTop: 10 }}>
            Loading tasks...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredAndSortedTodos}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Bottom Add Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTodo')}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <ConfirmModal
        title={'Are you sure you want to delete'}
        onClose={() => setisModalVisible(false)}
        onConfirm={handleDelete}
        visible={isModalVisible}
      />
    </View>
  );
};

export default TodoItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    fontSize: 25,
    fontWeight: '800',
    marginBottom: 20,
    color: '#333',
  },
  subHeader: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    marginTop: 10,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: '#ECECEC',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
  },

  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 100,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
