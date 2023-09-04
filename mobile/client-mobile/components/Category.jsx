import {View, Text} from 'react-native';

export default function Category({categoryName, customBgColor}){
  let bgColor = '#e74c3c'
  let _color = "white"
  customBgColor ? bgColor = "white" : bgColor
  customBgColor ? _color = "#e74c3c" : _color
    return <View style={{
        flexDirection: 'row',
      }}>
        <View style={{
          backgroundColor: bgColor,
          paddingHorizontal: 5,
          paddingVertical: 2,
          borderRadius: 10,
          marginBottom: 5
        }}>
          <Text style={{textTransform: "capitalize", fontSize:10, color: _color, fontWeight: "bold"}}>{categoryName}</Text>
        </View>
      </View>
}