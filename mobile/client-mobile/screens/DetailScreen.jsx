import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { GET_POST } from "../queries/post";
import LoadingComponent from "../components/Loading";
import ErrorComponent from "../components/Error";
import CreatedAt from "../components/CreatedAt";
import { Icon } from '@rneui/themed';
import Category from "../components/Category";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context"

export default function DetailScreen({ route }) {
  const { slug } = route.params;
  const [post, setPost] = useState({})
  const {loading, error, data} = useQuery(GET_POST, {
    variables: {
      slug
    }
  })
  
  useEffect(() => {
    if (data) {
      setPost(data.getPost)
    }
  }, [loading])


  if(loading) {
    return <LoadingComponent/>
  }
  if (error) {
    return <ErrorComponent/>
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView >
          <View style={styles.detailContainer}>
            <Category categoryName={post.Category?.name}/>
            <Text style={{fontWeight: "bold", fontSize: 20}}>{post.title}</Text>
            <Image source={{uri: post.imgUrl}}
            style={styles.imgDetail} />
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
              <View style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                <Icon name="person" type="material" size={15} color={"#808080"}/>
                <Text style={{fontSize: 12, textTransform: "capitalize", color: "#808080"}}>{post.Author?.username}</Text>
              </View>
              <CreatedAt createdAt={post.createdAt}/>
            </View>
            <Text>{post.content}</Text>
            <View style={{width:"100%", height: 1, backgroundColor: "red"}}/>
            <Text style={{textTransform: "capitalize", fontWeight: "bold"}}>Tags: {post.Tags?.map(el => el.name).join(", ")} </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  detailContainer: {
    padding: 20,
    marginBottom:10,
    gap: 10
  },
  imgDetail: {
    height: 200,
    width: "100%",
    borderRadius: 10
  }
});
