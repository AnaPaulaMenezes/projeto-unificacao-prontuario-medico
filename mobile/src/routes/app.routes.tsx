import React, {useContext} from 'react';
import {createDrawerNavigator } from '@react-navigation/drawer';
import History from '../pages/History';
import Profile from '../pages/Profile';
import Detalhes from '../pages/Details';


const AppDrawer = createDrawerNavigator();


const AppRoutes: React.FC = () => (

  <AppDrawer.Navigator>

    <AppDrawer.Screen name="Histórico" component={History} />
    <AppDrawer.Screen name="Usuario" component={Profile} />
    <AppDrawer.Screen name="Detalhes" component={Detalhes} />



  </AppDrawer.Navigator>

);
export default AppRoutes;
