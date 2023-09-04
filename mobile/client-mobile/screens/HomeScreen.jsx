import {StyleSheet, View, Text, FlatList, TextInput, ScrollView} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context"
import CarouselComponent from '../components/Carousel';
import {useQuery} from "@apollo/client"
import {GET_POSTS} from "../queries/post"
import LoadingComponent from "../components/Loading"
import ErrorComponent from '../components/Error';
import { useEffect, useState } from 'react';
import CardComponent from '../components/Card';

export default function HomeScreen() {
  const [posts, setPosts] = useState({})
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [search, setSearch] = useState("")
  const {loading, error, data} = useQuery(GET_POSTS)
  useEffect (() => {
    if (data) {
      setPosts(data.getPosts)
      setFilteredDataSource(data.getPosts)
    }
  }, [data])

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = posts.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(posts);
      setSearch(text);
    }
  };
  
  const renderItem = ({item}) => (<CardComponent post={item}/>)
  
  if(loading) {
    return <LoadingComponent/>
  }
  if (error) {
    return <ErrorComponent/>
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.containerSearch}>
          <Text style={styles.brand}>Japanese Shelter</Text>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search here ..."
          />
        </View>
        <CarouselComponent posts={posts}/>
        <View>
          <Text style={{fontWeight: "bold", fontSize: 18, marginTop: 20, paddingHorizontal: 20, color: "#e74c3c"}}>
            Berita Jepang Hari Ini
          </Text>
        </View>
        <View style={{flex: 1 }}>
          <FlatList 
            style={styles.flatlist}
            data={filteredDataSource}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
            numColumns={2}
          />
        </View>
      </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 10
  },
  flatlist: {
    flex: 1
  },
  textInputStyle: {
    height: 25,
    width: "50%",
    borderWidth: 1,
    margin: 5,
    borderColor: '#e74c3c',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10
  },
  containerSearch: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  brand: {
    fontWeight: "bold",
    fontSize: 18,
    color: '#e74c3c'
  }
});
