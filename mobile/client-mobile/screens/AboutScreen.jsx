import {Alert, Linking, StyleSheet, View, Text} from "react-native"
import React, {useCallback} from 'react';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons";

const githubURL = 'https://github.com/putriindaht';

const OpenURLButton = ({url, children}) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return <Ionicons name="logo-github" size={30} title={children} onPress={handlePress} />;
  };
  

export default function AboutScreen(){
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
            <View style={{gap: 20}}>
                <Text>
                    Japanese Shelter merupakan sebuah project Portal Berita Jepang di Indonesia – Sumber Utama Kultur, Budaya, dan Info Terkini!                </Text>
                <View>
                    <Text style={{fontWeight: "bold"}}>Connect with me!</Text>
                    <Text style={styles.customText}>Putri Indah Tresnawati</Text>
                    <OpenURLButton url={githubURL}>Github</OpenURLButton>
                </View>
            </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        marginTop: 10,
        gap: 20,
        flex: 1,
        justifyContent: "center"
    },
    customText: {
        fontSize: 20
    }
  });
  