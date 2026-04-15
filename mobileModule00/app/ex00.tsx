import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>A simple text</Text>
      <Button 
        title="Click me"
        color="#f194ff"
        onPress={() => console.log('Button pressed')}
        />
    </View>
  );
}
