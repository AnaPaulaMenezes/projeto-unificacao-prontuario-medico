import React from 'react'
import {Button} from 'react-native';
import {useAuth} from '../../hooks/auth';
export default function index() {

  const {signOut} = useAuth();
  return (
    <Button title="sair" color="#ff1313"
    onPress= {()=>{signOut()}}></Button>
  )
}
