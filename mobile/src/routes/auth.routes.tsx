import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';

const Auth = createStackNavigator();
const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Auth.Screen name="LogIn" component={LogIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);
export default AuthRoutes;
