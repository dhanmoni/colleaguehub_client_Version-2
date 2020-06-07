import React from 'react'
import { Text, View, Image } from 'react-native'
import {createMaterialTopTabNavigator,createTabNavigator,createBottomTabNavigator, createSwitchNavigator, createStackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import HomeScreen from '../Component1/HomeScreen';
import SearchScreen from '../Component1/SearchScreen';
import UserScreen from '../Component1/UserScreen';
import UserScreen2 from '../Component1/UserScreen2';

import ProfileItem from '../profiles/profileItem'
import StoryScreen from '../Component1/StoryScreen'

import SignUpPage from '../Component2/SignUpPage'
import CreateProfile1 from '../Component2/CreateProfile1'
import CreateProfile2 from '../Component2/CreateProfile2'

import RegisterPage from '../Component2/RegisterPage'
import UploadAvatar from '../Component2/UploadAvatar'
import LoginPage from '../Component2/LoginPage'

import PostScreen from '../Component3/PostScreen'
import CommentPage from '../Component3/CommentPage'
import LikesPage from '../Component3/LikesPage'

import EditProfile from '../Component4/editProfile'
import NotificationSetting from '../Component4/notificationSetting'
import UpgradetoPro from '../Component4/upgradetoPro'
import BlockedUser from '../Component4/BlockedUser'
import AccountPage from '../Component4/AccountPage'



import SettingPage from '../Component4/settingsPage'
import LinearGradient from 'react-native-linear-gradient';




export const UserStack = createStackNavigator(
  {
  User:{
    screen:UserScreen2
  },
  Settings:{
    screen: SettingPage
    
  },
  EditProfile:{
    screen: EditProfile
  },
  NotificationSetting:{
    screen: NotificationSetting
  },
  UpgradetoPro:{
    screen:UpgradetoPro
  },
  BlockedUser:{
    screen:BlockedUser
  },
  AccountPage:{
    screen:AccountPage
  }
  
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

export const LoginPageTab = createSwitchNavigator({
  Login: {
    screen: SignUpPage
  },
  RegisterPage:{
    screen:RegisterPage
  },
  LoginPage:{
    screen: LoginPage
  }
 
})

export const CreatePropfilePage = createSwitchNavigator({
  
  CreateProfile1: {
    screen: CreateProfile1
  },
  CreateProfile2: {
    screen: CreateProfile2
  },
  UploadAvatar:{
    screen: UploadAvatar
  }
 
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
            
            <Icon name="home"  size={33} style={{}} color="#0073ff"/>
            :
            <Icon name="home"  size={30} style={{}} color="#808080" />
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
            
            <FontAwesome5 name="user-friends"  size={29} style={{}} color='#0073ff' />
            :
            (<FontAwesome5 name="user-friends"  size={25} style={{}} color="#808080" />)
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
           
            <Icon name="search"  size={29} style={{}} color='#0073ff' />
            :  <Icon name="search"  size={25} style={{}} color="#808080" />
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
          
            <FontAwesome5 name="user-alt"  size={25} style={{}} color='#0073ff' />
            :
                <FontAwesome5 name="user-alt"  size={22} style={{}} color="#808080" />
              )
            },
            
            },
  
         
         
          
 },
 
 {
        
    tabBarPosition: 'bottom',
    tabBarOptions: {
      
       showLabel: false,
       showIcon: true,
       style:{
        backgroundColor: '#fff',
       
        padding: 0, margin:0, 
        
       },
       tabStyle: {
        margin: 0,
        padding:0
      },
       iconStyle: {
       
        padding:0},
       indicatorStyle:{
           opacity:0
       }
    }
 }

 ) 

//  <View style={{alignItems:'center',borderWidth:1.5, borderColor:'#fff', justifyContent:'center',backgroundColor:'#002463', borderRadius:25, height:50, width:50,position:'absolute'}}>
                //     
                // </View>

 