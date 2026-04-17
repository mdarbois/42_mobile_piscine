import Ionicons from '@expo/vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import CurrentScreen from '../screens/currentScreen';
import TodayScreen from '../screens/todayScreen';
import WeeklyScreen from '../screens/weeklyScreen';

const Tab = createMaterialTopTabNavigator();

export default function TabsNavigator({
  location,
  weather,
  loading,
  error,
}: any) {
  return (
    <Tab.Navigator
      initialRouteName="Currently"
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIndicatorStyle: { backgroundColor: '#6200ee' },

        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'time';

          if (route.name === 'Currently') {
            iconName = focused ? 'bug' : 'bug-outline';
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
        {() => (
          <CurrentScreen
            location={location}
            weather={weather}
            loading={loading}
            error={error}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Today">
        {() => <TodayScreen weather={weather} location={location} />}
      </Tab.Screen>

      <Tab.Screen name="Weekly">
        {() => <WeeklyScreen weather={weather} location={location} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}