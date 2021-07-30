import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import LoadingIndicator from '../util/LoadingIndicator';

const TodoScreen = ({route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [todosData, setTodosData] = useState(0);
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    let userId = 1;
    if (route.params) {
      userId = route.params.userId || 1;
    }
    console.log(
      'ToDoScreen',
      `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
    );
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
      .then(response => response.json())
      .then(json => {
        if (json.length) {
          setTodosData(json);
        }
      })
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
    setUserId(userId);
  }, [route.params]);

  const renderItem = ({item}) => (
    <View
      style={{
        ...styles.item,
        backgroundColor: item.completed ? '#9dcc91' : '#dcdce0',
      }}>
      <Text
        style={{
          ...styles.title,
          textDecorationLine: item.completed ? 'line-through' : 'none',
        }}>
        {item.title}
      </Text>
    </View>
  );

  if (isLoading) {
    return <LoadingIndicator />;
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle={'dark-content'} />

        <View style={styles.container}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '600',
              margin: 10,
            }}>
            {`User ${userId} - To-Dos`}
          </Text>
          <Text style={{textAlign: 'right', padding: 8}}>
            Total Count: {todosData.length}
          </Text>
          <FlatList
            data={todosData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  loading: {
    backgroundColor: 'rgba(48,48,46,0.8)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#ccc',
    padding: 8,
    marginVertical: 6,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 16,
  },
});
