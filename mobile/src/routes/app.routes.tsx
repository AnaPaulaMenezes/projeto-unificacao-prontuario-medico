import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import History from '../pages/History';

const App = createStackNavigator();
const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <App.Screen name="History" component={History} />
  </App.Navigator>
);
export default AppRoutes;
