import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainStack from "./navigators/MainStack";
import { Ionicons } from "@expo/vector-icons";
import AboutScreen from "./screens/AboutScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const client = new ApolloClient({
  uri: "https://app-jshelter.puthree.space/",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Dashboard"
            component={MainStack}
            options={{
              tabBarActiveTintColor: "#e74c3c",
              tabBarIcon: ({ focused, color, size }) => {
                const iconName = focused ? "home" : "home-outline";
                const iconColor = focused ? "#e74c3c" : "grey";
                return (
                  <Ionicons name={iconName} color={iconColor} size={size} />
                );
              },
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="About"
            component={AboutScreen}
            options={{
              tabBarActiveTintColor: "#e74c3c",
              tabBarIcon: ({ focused, color, size }) => {
                const iconName = focused
                  ? "information-circle"
                  : "information-circle-outline";
                const iconColor = focused ? "#e74c3c" : "grey";

                return (
                  <Ionicons name={iconName} color={iconColor} size={size} />
                );
              },
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
