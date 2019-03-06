import React, { Component } from 'react'
import { Text, StyleSheet, View, AsyncStorage } from 'react-native'
import {connect} from 'react-redux'
import {Tabs, LoginPageTab, CreatePropfilePage} from '../config/routers'
const ACCESS_TOKEN = 'Access_Token'
class Layout extends Component {


    constructor(){
        super();
        this.state={
            token:''
        }
    }

    async componentDidMount() {
        
        const token = await AsyncStorage.getItem(ACCESS_TOKEN)
          if(token){
            console.log('token exists', token)
            this.setState({
              token,
             
            })
            console.log(this.state.token)
           
          } else {
            console.log('No token')
          
          }
         
      }
  


  render() {
    const {user, loggedIn, userInfo, allCollegues} = this.props.auth;
    
    if(loggedIn ===true && userInfo == null  ){
        return(
            <CreatePropfilePage/>
        )
     }
     else if(loggedIn===false && userInfo !== null && user.profileImage !== ''){
        return (
            <LoginPageTab/>
        )
     }
     else if( loggedIn===true && userInfo !== null && user.profileImage == ''){
        return (
            <CreatePropfilePage/>
        )
     }
    
     else if( loggedIn===true && userInfo !== null && user.profileImage !== '' ){
        return (
            <Tabs/>
        )
     }
    else {
        return(
            <LoginPageTab/>
        )
    }
   
  
   
  }
}

const mapStateToProps = (state)=> {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Layout)
