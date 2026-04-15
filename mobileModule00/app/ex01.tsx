import React, { Component } from 'react';
import { Button, Text, View } from "react-native";

type State = {
  textValue: string;
};

export default class App extends Component<{}, State> {
    state: State = {
    textValue: 'A simple text'
  };

  onPress = () => {
    this.setState(prevState => ({
      textValue: prevState.textValue === 'A simple text'
        ? 'Hello world'
        : 'A simple text'
    }));
  }
  render () {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{this.state.textValue}</Text>
        <Button 
          title="Click me"
          color="#f194ff"
          onPress={this.onPress}
          />
      </View>
    )
  }
}
