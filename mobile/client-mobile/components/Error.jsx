import { View, Text, StyleSheet } from "react-native";
export default function ErrorComponent() {
    return <View style={styles.loadingContainer}>
        <Text>⚠️ ERROR ...</Text>
    </View>
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
  });