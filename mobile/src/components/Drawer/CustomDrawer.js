import React from 'react';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import Sair from '../Sair';



function Drawer(props){
  return (
    <>
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props}/>
    </DrawerContentScrollView>
    <Sair/>
    </>
  );
}

export default Drawer;

