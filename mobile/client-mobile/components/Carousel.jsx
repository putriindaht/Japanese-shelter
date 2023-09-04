import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import Carousel, { PaginationLight } from 'react-native-x-carousel';
import Category from './Category';
import CreatedAt from './CreatedAt';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


const { width } = Dimensions.get('window');
  
export default function CarouselComponent({posts}) {
  const [data, setData] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    if(posts.length) {
      setData(posts)
    }
  }, [posts])
    const renderItem = (data) => (
      <View
          key={data.title}
          style={styles.cardContainer}
        >
      <TouchableOpacity onPress={() => navigation.navigate("Detail", {slug: data.slug})}>
          <View
            style={styles.cardWrapper}
          >
            <View>
              <ImageBackground
                style={styles.card}
                source={{ uri: data.imgUrl }}
              >
                 <LinearGradient
                  locations={[0, 0.2, 0.6, 0.93]}
                  colors={[
                    "rgba(0,0,0,0.0)",
                    "rgba(0,0,0,0.0)",
                    "rgba(200,60,50,0.6)",
                    "rgba(231,76,60,1)",
                  ]}
                  style={{height: "100%"}}
                >
                </LinearGradient>
              </ImageBackground>
            </View>
            <View style={styles.title}>
                <Category categoryName={data.Category.name} customBgColor={"white"}/>
                <Text style={{fontWeight:"bold", fontSize: 15, color: "white"}}>{data.title}</Text>
                <View style={styles.author}>
                    <CreatedAt createdAt={data.createdAt} customColor={"white"}/>
                </View>
            </View>
          </View>
      </TouchableOpacity>
        </View>
      );
    return (
        <View style={styles.container}>
            <Carousel
                pagination={PaginationLight}
                renderItem={renderItem}
                data={data}
                loop
                autoplay
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width,
      marginTop:10
    },
    cardWrapper: {
      borderRadius: 8,
      overflow: 'hidden',
    },
    card: {
      width: width * 0.9,
      height: width * 0.5,
    },
    title: {
        position: 'absolute',
        overlayColor: "red",
        width: '100%',
        marginBottom:0,
        bottom: 0,
        padding: 10,
    },
    author: {
        flexDirection: 'row',
        gap: 10,
    },

  });