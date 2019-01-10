import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Text, StyleSheet, View,ScrollView, Dimensions, TouchableOpacity,ActivityIndicator, TextInput,ImageBackground, AsyncStorage, Image, ToastAndroid } from 'react-native'
//import {  LoginManager,LoginButton,AccessToken,GraphRequest,GraphRequestManager } from 'react-native-fbsdk';
import LinearGradient from 'react-native-linear-gradient';


import { clearError} from '../redux/actions/authAction'
import {getAllGroups, getAllUsers} from '../redux/actions/profileAction'

import Spinner from 'react-native-spinkit'

const ACCESS_TOKEN = 'Access_Token'

const HEIGHT = Dimensions.get('window').height
const TEXTSIZE = Dimensions.get('window').width ;
const WIDTH = Dimensions.get('window').width ;

class LoginWithFB extends Component {
    
  constructor(props){
    super(props);
    this.state={
      name: '',
      id:'',
     profile:'',
     first_name:'',
     token:'',
    
    };
    //this.logintoFacebook = this.logintoFacebook.bind(this)
  }

  async componentDidMount(){
    this.props.getAllGroups()
    this.props.getAllUsers()
  }
   
//  setdata = async() => {
         
   
//     await AsyncStorage.setItem(ACCESS_TOKEN, this.state.token)
//     const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    
  
// }
  render() {
    const {user, loggedIn, loading} = this.props.auth;
    if(loading){
      return (
     
        <View style={styles.container}>
         {/* <ImageBackground resizeMode='cover' blurRadius={0}  source={require('../images/Background_Login_3-min.jpg')}
          style={{flex:1, position:'absolute', top:0, left:0, right:0, bottom:0, }}> 
             </ImageBackground> */}
             <View style={{flex: 1,
                  backgroundColor: 'transparent',
                  paddingHorizontal:10,
                  alignItems:'center',
                  justifyContent:'center',
                }}>
        
           <View style={{padding:10}}>
          
             <View style={{flex: 1,alignItems:'center',justifyContent:'center' }}>
             <Text style={styles.welcomeText}>Welcome To ColleagueHub</Text>
            <Spinner color={'#fff'} size={44} type={"Circle"}/>

          </View>
            </View>
            </View>
        </View>
      )
    }
    return (
     
      <View style={styles.container}>
        <LinearGradient  colors={[ '#1488CC', '#2B32B2']} style={{width: 100 + '%', height: 100 +'%',overflow:'hidden'}} start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
           <View style={{flex: 1,
              
                paddingHorizontal:10,
                alignItems:'center',
                justifyContent:'center',
              }}>
        <Text style={styles.welcomeText}>Welcome To ColleagueHub</Text>
        
         <View style={{padding:10,marginTop:30, width:75+'%'}}>
         <Text style={{color:'#fff',paddingBottom:5,fontSize:15,textAlign:'center', fontFamily:'Quicksand-Medium'}}>New user?</Text>
              <TouchableOpacity activeOpacity={0.8} style={{alignItems:'center',borderRadius:9, justifyContent:'center', width:100+'%', borderColor:'#fff', borderWidth:1.7}} onPress={()=> {
                this.props.clearError()
                this.props.navigation.navigate('RegisterPage')}}>
                <Text style={{textAlign:'center',padding:10, color:'#fff',fontSize:18, fontFamily:'Quicksand-Bold'}}>Register</Text>
              </TouchableOpacity>
          </View>
          <View style={{padding:10,marginTop:10, width:75+'%'}}>
          <Text style={{color:'#fff',paddingBottom:5,fontSize:15,textAlign:'center', fontFamily:'Quicksand-Medium'}}>Already have an account?</Text>
              <TouchableOpacity activeOpacity={0.8} style={{alignItems:'center',borderRadius:9, justifyContent:'center', width:100+'%',borderColor:'#fff', borderWidth:1.7 }} onPress={()=> {
                this.props.clearError()
                this.props.navigation.navigate('LoginPage')}}>
                <Text style={{textAlign:'center',padding:10, color:'#fff',fontSize:18, fontFamily:'Quicksand-Bold'}}>Login</Text>
              </TouchableOpacity>
          </View>
          </View>
          </LinearGradient>
      </View>
    )
  }
}


const mapStateToProps = (state)=> {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps, {getAllGroups, clearError, getAllUsers})(LoginWithFB)


const styles = StyleSheet.create({
    container: {
        flex: 1,
      
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    welcomeText:{
        fontSize: TEXTSIZE/10,
        color:'#fff',
        fontFamily:'Pacifico',
      paddingBottom:10,
        textAlign:'center',
        paddingTop:10
    },
    descText:{
      fontSize: TEXTSIZE/18,
      color:'#fff',
      fontFamily:'Quicksand-Bold',
      
      textAlign:'center'
  },
    para:{
        fontSize:TEXTSIZE/22,
        color:'#fff',
        marginBottom:30,
        marginTop:30,
        fontFamily:'Quicksand-Medium',
        flexWrap:'wrap',
        textAlign:'center'
    }
})

{/* <LoginButton
readPermissions={["public_profile"]}   */}

// onLoginFinished={
//   (error, result) => {
//     if (error) {
//       alert("login has error: " + result.error);
//     } else if (result.isCancelled) {
//       alert("login is cancelled.");
//     } else {
//       AccessToken.getCurrentAccessToken().then(
//         (data) => {
          
//           this.setState({token: data.accessToken.toString()})

         
//           _responseInfoCallback  = (error, result) => {
//              if (error) {
//               alert('Error fetching data: ' + error.toString());
//             } else {
             
//              this.setdata()
//              return this.props.loggInUserWithFb(this.state)
               
//              }
//            }

//           const infoRequest = new GraphRequest(
//             '/me?fields=name,picture.type(large),first_name',
//             null,
//             _responseInfoCallback
//           );
         
//           new GraphRequestManager().addRequest(infoRequest).start();
//         }
//       )
      
//     }
//   }
// }
// onLogoutFinished={() => {
  
// }}/>  


          


   