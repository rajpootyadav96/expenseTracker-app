/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Image, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ManageExpences from './src/screens/ManageExpences';
import RecentExpences from './src/screens/RecentExpences';
import AllExpences from './src/screens/AllExpences';
import { GlobalStyles } from './src/constants/styles';
import IconButton from './src/components/UI/IconButton';
import ExpenseContextProvider from './src/store/expense-context';

const Stack=createNativeStackNavigator();
const BottomTabs=createBottomTabNavigator();

const ExpenceOverview=()=>{

  return <BottomTabs.Navigator screenOptions={({navigation})=>({
    headerStyle:{
      backgroundColor:GlobalStyles.colors.primary500},
      headerTintColor:'white',
      tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
      tabBarActiveTintColor:'white',
      headerRight:()=><IconButton color={null} icon={require('./src/constants/Assets/add.png')} onPress={()=>{navigation.navigate('ManageExpence')}}/>
  })}>
    <BottomTabs.Screen name="RecentScreen" component={RecentExpences}
    options={{
      title:'Recent Expenses',
      tabBarLabel:'Recent',
      tabBarIcon:({color,size})=>(
        <Image source={require('./src/constants/Assets/hourglass.png')} style={{height:size,width:size,tintColor:color}}/>
      )
    }}/>
    <BottomTabs.Screen name="AllExpences" component={AllExpences}
    options={{
      title:'All Expenses',
      tabBarLabel:'All Expenses',
      tabBarIcon:({color,size})=>(<Image source={require('./src/constants/Assets/cal.png')}/>)
    }}/>
  </BottomTabs.Navigator>
}


function App(): JSX.Element {
  
  return (
    <>
    <StatusBar/>
    <ExpenseContextProvider> 
         <NavigationContainer>
    <Stack.Navigator initialRouteName='ExpenceOverview' screenOptions={{
      headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
      headerTintColor:'white'
    }}>
      <Stack.Screen name="ExpenceOverview" component={ExpenceOverview} options={{headerShown:false}}/>
      <Stack.Screen name="ManageExpence" component={ManageExpences}
      options={{presentation:'modal'}}/>
    </Stack.Navigator>
    </NavigationContainer>
    </ExpenseContextProvider>

    </>
  )
}

export default App;
