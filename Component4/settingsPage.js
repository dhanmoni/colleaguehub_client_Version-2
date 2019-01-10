
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity,ActivityIndicator,ToastAndroid, Image, Dimensions,ImageBackground,StatusBar, ScrollView, Button, Alert, AsyncStorage, FlatList, NetInfo, Easing, Animated} from 'react-native';
import {connect} from 'react-redux'
import { Container, Header, Content, Card, CardItem, Right, Item, Input } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { deletepost, getposts, addlike, addcomment, getSinglePost} from '../redux/actions/postAction'
import { updateProfileImage,updateProfileImage2, getSingleUser} from '../redux/actions/profileAction'
import {deleteAuthUser, nightmodeon, nightmodeoff} from '../redux/actions/authAction'

import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-spinkit'
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const HEIGHT_MIN = Dimensions.get('window').height;
const WIDTH_MIN = Dimensions.get('window').width;

const TEXTSIZE = Dimensions.get('window').width ;
const ACCESS_TOKEN = 'Access_Token'


import moment from 'moment'
import { BannerView } from 'react-native-fbads';

import ImagePicker from 'react-native-image-picker';
import { Switch } from 'react-native-switch';
const options = {
  title: 'Select Image',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallary',
  quatity:0.4
};

class SettingPage extends Component {
  static navigationOptions = {
    header: null, 


  }

  constructor(){
    super();
    this.state={
      token:'',
      text:'', 
      connection: true,
     opvalue: new Animated.Value(0),
      springvalue: new Animated.Value(0),
      sizevalue: new Animated.Value(0),
     // profileImage: null,
      response:null,
      nightmode: false
    }
  }
  

  
  async componentDidMount() {
   
    
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    if(token){
      this.setState({
        token
      })

    }
        NetInfo.isConnected.addEventListener('connectionChange', await this.handleConnectionChange);

  }

componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
}




nightmode = (nightmode)=> {
  if(nightmode == false){
    this.setState({
      nightmode:!this.state.nightmode
    })
    this.props.nightmodeon()
    
  } else {
    this.setState({
      nightmode:!this.state.nightmode
    })
    this.props.nightmodeoff()
  }}

  

  

  

  _rotateLike =(item)=> {
    
      //alert(item._id)
      Animated.sequence([
        Animated.timing(this.state.springvalue, { toValue: 1, duration:1400,useNativeDriver: true, easing:Easing.ease}),
        Animated.timing(this.state.springvalue, { toValue: 0, duration:0,useNativeDriver: true,easing:Easing.ease })
  
      ]).start()
    
    
  }
  

  

  render() {

    const rot = this.state.opvalue.interpolate({
      inputRange:[0,1],
      outputRange:['0deg', '720deg']
    })
    const rot2 = this.state.springvalue.interpolate({
      inputRange:[0,1],
      outputRange:['0deg', '720deg']
    })
   
  
    const {user, loggedIn, userInfo, getposts, posts, nightmode}= this.props.auth;
     if(this.state.connection == false){
      <View style={{alignItems:'center', justifyContent:'center',flex:1, backgroundColor:bgcolor}}>
      <Icon name='frown' size={44}/>
     <Text style={{textAlign:'center',marginTop:6, fontSize:22, fontFamily:'Quicksand-Medium'}}>No Internet</Text>
   </View>
    }


    

      let bgcolor;
      let textcolor;
      let cardcolor;
      let iconcolor;
      
      if(this.props.auth.nightmode == true){
        bgcolor= '#303030'
        textcolor= '#fff'
        cardcolor='#424242'
        iconcolor='#fff'
      } else {
        bgcolor= '#fff'
        textcolor= '#333'
        cardcolor='#fff'
        iconcolor='#002463'
      }
    const banner = (HEIGHT/1.6)/5.5;
      const HEADER_FIRST_HEIGHT = HEIGHT/3.1
      const IMAGE_FIRST_HEIGHT = HEADER_FIRST_HEIGHT/2
    return (
        <View style={{flex:1, }}>
        
                <Animated.View style={{height:HEADER_FIRST_HEIGHT, position:'absolute',backgroundColor:'#2b32b2', top:0, left:0, right:0}}>
                   
                </Animated.View>
                <ScrollView style={{flex:1,}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{height:IMAGE_FIRST_HEIGHT, width:IMAGE_FIRST_HEIGHT, borderRadius:IMAGE_FIRST_HEIGHT/2, borderColor:'#fff',borderWidth:1.4, marginLeft:20, overflow:'hidden', marginTop:HEADER_FIRST_HEIGHT-(IMAGE_FIRST_HEIGHT/2)}}>
                            <Image source={{uri:userInfo.profileImage}} style={{flex:1, height:null, width:null}}/>
                        
                        </View>
                     <View style={{marginTop:HEADER_FIRST_HEIGHT-(IMAGE_FIRST_HEIGHT/3),width:WIDTH-(IMAGE_FIRST_HEIGHT +30),marginRight:4}}>
                         <Text numberOfLines={1} style={{color:'#fff', fontFamily:'Quicksand-Bold', fontSize:21, marginLeft:12}}>{user.name.toUpperCase()}</Text>
                     </View>
                </View>
                   
              
                </ScrollView>    
        </View>
    )}}

const mapStateToProps = (state)=> {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {deleteAuthUser, deletepost,  getSinglePost,updateProfileImage2, getSingleUser, updateProfileImage, nightmodeoff, nightmodeon})(SettingPage)

const styles = StyleSheet.create({

})
