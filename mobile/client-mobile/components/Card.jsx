import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import CreatedAt from './CreatedAt';
import Category from './Category';

const { height } = Dimensions.get('screen')
export default function CardComponent({post}) {
    const navigation = useNavigation()

    return (
      <View style={[styles.card, { height: height / 3 }]}>
        <TouchableOpacity onPress={() => navigation.navigate("Detail", {slug: post.slug})}>
          <Image source={{uri: post?.imgUrl}} 
            style={styles.cardImage} />
          <Category categoryName={post.Category?.name}/>
          <Text style={{fontWeight: "bold",}}>{post?.title}</Text>
          <CreatedAt createdAt={post?.createdAt}/>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
      card: {
        flex: 1,
        padding: 20,
        width: "45%"
      },
      cardImage: {
        width: "100%",
        height: 100,
        borderRadius: 5,
        marginBottom: 5
      },
  });