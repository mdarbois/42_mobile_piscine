import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [expression, setExpression] = useState("0");
  const [result, setResult] = useState("0");

  const handlePress = (value: string) => {
    console.log("button pressed :", value);
  };

  const buttons = [
    ["7", "8", "9", "C", "AC"],
    ["4", "5", "6", "+", "-"],
    ["1", "2", "3", "*", "/"],
    ["0", ".", "00", "="]
  ];

  return (
    <View style={{ flex: 1 }}>
      
      <View style={styles.appBar}>
        <Text style={styles.title}>Calculator</Text>
      </View>

      <View style={styles.display}>
        <Text style={styles.expression}>{expression}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>

      <View style={styles.buttons}>
        {buttons.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={styles.button}
                onPress={() => handlePress(btn)}
              >
                <Text style={styles.buttonText}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    height: 60,
    backgroundColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  display: {
    flex: 2,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 20,
  },
  expression: {
    fontSize: 24,
    color: "#333",
  },
  result: {
    fontSize: 32,
    fontWeight: "bold",
  },
  buttons: {
    flex: 3,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

