import React from 'react'
import { Text, View, Image } from 'react-native'
import {createMaterialTopTabNavigator,createTabNavigator,createBottomTabNavigator, createSwitchNavigator, createStackNavigator} from 'react-navigation'

import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import HomeScreen from '../Component1/HomeScreen';
import SearchScreen from '../Component1/SearchScreen';
import UserScreen from '../Component1/UserScreen';
import LoginWithFB from '../Component2/LoginWithFB'
import EditProfile from '../Component1/EditProfile'
import CreateProfile from '../Component1/CreateProfile'
import ProfileItem from '../profiles/profileItem'
import StoryScreen from '../Component1/StoryScreen'
import PostScreen from '../Component1/PostScreen'
import CommentPage from '../Component1/CommentPage'
import LikesPage from '../Component1/LikesPage'




export const UserStack = createStackNavigator(
  {
  User:{
    screen:UserScreen
  },
  EditProfile:{
    screen: EditProfile
    
  },
  
}
)

UserStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

export const StoryStack = createStackNavigator(
  {
  StoryScreen:{
    screen:StoryScreen
  },
  PostScreen:{
    screen: PostScreen
    
  },
  CommentPage:{
    screen:CommentPage
  },
  LikesPage: {
    screen: LikesPage
  }
  
}
)

StoryStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

export const LoginPage = createSwitchNavigator({
  Login: {
    screen: LoginWithFB
  },
 
})

export const CreatePropfilePage = createSwitchNavigator({
  CreateProfile: {
    screen: CreateProfile
  },
 
})


export const HomeStack = createStackNavigator(
  {
  HomeScreen:{
    screen:HomeScreen
  },
  ProfileItem:{
    screen: ProfileItem
    
  },
  
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
)
HomeStack.navigationOptions = ({ navigation }) => {
 
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};


 export const Tabs = createBottomTabNavigator(
     {

      Story: { 
        screen: StoryStack,
        navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon:
          ({ focused }) => (
            focused ?
             <View style={{alignItems:'center',borderWidth:1.5, borderColor:'#fff', justifyContent:'center',backgroundColor:'#002463', borderRadius:25, height:50, width:50,position:'absolute'}}>
                <Icon name="home"  size={32} style={{}} color='#fff' />
            </View>:
            <Icon name="home"  size={27} style={{}} color="#808080" />
          )
      },
      },
        Home: { 
            screen: HomeStack,
            navigationOptions: {
            tabBarLabel: 'User',
            tabBarIcon:
              ({ focused }) => (
                focused ?
                 <View style={{alignItems:'center',borderWidth:1.5, borderColor:'#fff', justifyContent:'center',backgroundColor:'#002463', borderRadius:25, height:50, width:50,position:'absolute'}}>
                    <FontAwesome5 name="user-friends"  size={30} style={{}} color='#fff' />
                </View>:
                (<FontAwesome5 name="user-friends"  size={27} style={{}} color="#808080" />)
              )
          },
          },
         
        
        Search:{
            screen: SearchScreen,
            navigationOptions: {
              tabBarLabel: 'Search',
              
              tabBarIcon:
              ({ focused }) => (
                focused ?
                <View style={{alignItems:'center',borderWidth:1.5, borderColor:'#fff', justifyContent:'center',backgroundColor:'#002463', borderRadius:25, height:50, width:50,position:'absolute'}}>
                <Icon name="search"  size={30} style={{}} color='#fff' />
            </View>:  <Icon name="search"  size={25} style={{}} color="#808080" />
              )
               
           },
           },
     
  
         
          User: { 
          screen:UserStack,
            navigationOptions: {
            tabBarLabel: 'User',
           
            tabBarIcon:
            ({ focused }) => (
              focused ?
              <View style={{alignItems:'center',elevation:1,borderWidth:1.5, borderColor:'#fff', justifyContent:'center',backgroundColor: '#002463', borderRadius:25, height:50, width:50,position:'absolute'}}>
              <Icon name="user"  size={30} style={{}} color='#fff' />
          </View>:
              <Icon name="user"  size={26} style={{}} color="#808080" />
            )
          },
          
          },
          
 },
 //#002463

//one #E239FC;
//two #6BBAFC
//three #FF014B;
//#3972e9
//four #FDBF3F
//#D492FF
//#96B5FF
//#931FFF
//#128EFE
//#514a9d
//#24c6dc
//#4776e6
//#8e54e9
//Quicksand_Bold
//Quicksand-Light
//Quicksand-Medium
//Quicksand-Regular

 {
        
    tabBarPosition: 'bottom',
    tabBarOptions: {
      
       showLabel: false,
       showIcon: true,
       style:{
        backgroundColor: '#fff',
       height:55,
        padding: 0, margin:0, 
        
       },
       tabStyle: {
        margin: 0,
        padding:0
      },
       iconStyle: {
        width: 50,
        height: 50,
        padding:0},
       indicatorStyle:{
           opacity:0
       }
    }
 }

 ) 



 