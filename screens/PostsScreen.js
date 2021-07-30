import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import LoadingIndicator from '../util/LoadingIndicator';

const PostsScreen = ({route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [postsData, setPostsData] = useState(0);
  const [userId, setUserId] = useState(1);
  useEffect(() => {
    setIsLoading(true);
    let userId = 1;
    if (route.params) {
      userId = route.params.userId || 1;
    }
    console.log(
      'PostScreen',
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    );
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(json => {
        if (json.length) {
          setPostsData(json);
        }
      })
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
    setUserId(userId);
  }, [route.params]);

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Image
        source={{
          uri: 'https://i.pinimg.com/originals/c8/f7/a8/c8f7a86a5a668cac7a2846073ce4baf3.jpg',
        }}
        style={styles.avatarStyle}
      />
      <View style={{width: '80%', paddingLeft: 10}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>
          {item.body.length > 100
            ? item.body.substring(0, 100) + '...'
            : item.body}
        </Text>
      </View>
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
            {`User ${userId} - Posts`}
          </Text>
          <Text style={{textAlign: 'right', padding: 8}}>
            Total Count: {postsData.length}
          </Text>
          <FlatList
            data={postsData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
};

export default PostsScreen;

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
    flexDirection: 'row',
    backgroundColor: '#ccc',
    borderRadius: 16,
    alignSelf: 'center',
    padding: 8,
    marginVertical: 6,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarStyle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  body: {
    fontSize: 12,
    paddingVertical: 4,
  },
});
