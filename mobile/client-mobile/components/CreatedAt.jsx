import { View, Text } from "react-native";
import { Icon } from '@rneui/themed';
export default function CreatedAt({createdAt, customColor}) {
    const date = new Date(createdAt);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    customColor ? customColor : customColor = "#808080"
    return (
        <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
          <Icon size={15} color={customColor} name="schedule"/>
          <Text style={{fontSize: 10, color:customColor}}>{formattedDate}</Text>
        </View>
    )
}