import Ionicons from '@expo/vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Tab = createMaterialTopTabNavigator();

type Mode = {
  type: 'text' | 'geo';
  value: string;
};

function Screen({ label }: { label: string }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

export default function App() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<Mode>({
    type: 'text',
    value: '',
  });

  const handleGeo = () => {
    setMode({
      type: 'geo',
      value: 'Geolocation',
    });
  };

  const getLabel = (tabName: string) => {
    return `${tabName} \n ${mode.value}`;
  };

  return (
    <View style={{ flex: 1 }}>

      <View style={styles.topBar}>
        
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#888" />
          <TextInput
            value={input}
            placeholder="Search..."
            placeholderTextColor="#888"
            style={styles.input}
            onChangeText={setInput}
            onSubmitEditing={() => {
              setMode({
                type: 'text',
                value: input,
              });
            }}
            returnKeyType="search"
          />
        </View>

        <TouchableOpacity style={styles.geoBtn} onPress={handleGeo}>
          <Ionicons name="location-outline" size={22} color="#fff" />
        </TouchableOpacity>

      </View>

      <Tab.Navigator
        initialRouteName="Currently"
        tabBarPosition="bottom"
        screenOptions={({ route }) => ({
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIndicatorStyle: { backgroundColor: '#6200ee' },
          tabBarIcon: ({ focused, color }) => {
                let iconName: keyof typeof Ionicons.glyphMap = 'time';

                if (route.name === 'Currently') {
                  iconName = focused ? 'bug' : 'bug';
                } else if (route.name === 'Today') {
                  iconName = focused ? 'today' : 'today-outline';
                } else if (route.name === 'Weekly') {
                  iconName = focused ? 'calendar' : 'calendar-outline';
                }

                return <Ionicons name={iconName} size={20} color={color} />;
              },
        })}
      >
        <Tab.Screen name="Currently">
          {() => <Screen label={getLabel('Currently')} />}
        </Tab.Screen>

        <Tab.Screen name="Today">
          {() => <Screen label={getLabel('Today')} />}
        </Tab.Screen>

        <Tab.Screen name="Weekly">
          {() => <Screen label={getLabel('Weekly')} />}
        </Tab.Screen>
      </Tab.Navigator>

    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    height: 40,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: '#000',
  },
  geoBtn: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4a00c8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});