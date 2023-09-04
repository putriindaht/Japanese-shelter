import { View, Text, StyleSheet } from "react-native";
export default function LoadingComponent() {
    return <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
    </View>
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
  });