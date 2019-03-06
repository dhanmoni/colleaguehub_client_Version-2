
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
import SlidingUpPanel from 'rn-sliding-up-panel'

const {height} = Dimensions.get('window')



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

  static defaultProps = {
    draggableRange: {
      top: height - ((HEIGHT/10)),
      bottom: height/1.8
    }
  }
 
  _draggedValue = new Animated.Value(-(height/1.8))


  constructor(){
    super();
    this.state={
      token:'',
      text:'', 
      connection: true,
    
     // profileImage: null,
      response:null,
      nightmode: false,
      scrollY: new Animated.Value(0)
    }
  }
  

  
  async componentDidMount() {
   
    
    
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    if(token){
      this.setState({
        token,
        nightmode: this.props.auth.nightmode
      })

    }
        NetInfo.isConnected.addEventListener('connectionChange', await this.handleConnectionChange);

  }

componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
}




nightmode = (nightmode)=> {
  if(nightmode == false){
    this.props.nightmodeon()
    this.setState({
      nightmode:true
    })
    
    
  } else {
    this.props.nightmodeoff()
    this.setState({
      nightmode:false
    })
   
  }}

  

  

  render() {

    const {user, loggedIn, userInfo, getposts, posts, nightmode}= this.props.auth;
    const {top, bottom} = this.props.draggableRange
    const banner = (HEIGHT/1.6)/5.5;
    const opacity = this._draggedValue.interpolate({
        inputRange: [bottom,  top-(banner*2)],
        outputRange: [1, 0],
        extrapolate: 'clamp'
      })
      const opacity2 = this._draggedValue.interpolate({
        inputRange: [bottom, top],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      })
      
      const zIndex = this._draggedValue.interpolate({
        inputRange: [bottom,  top-(banner*2)],
        outputRange: [100,0],
        extrapolate: 'clamp'
      })

      const zIndex2 = this._draggedValue.interpolate({
        inputRange: [bottom,  top-(banner*2)],
        outputRange: [0,200],
        extrapolate: 'clamp'
      })
      const profileHeight = this._draggedValue.interpolate({
        inputRange: [bottom,bottom+banner , top-(banner*2)],
        outputRange: [0, 0,banner/1.4],
        extrapolate: 'clamp'
      })


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
    
    return (
        
        
        <View style={{flex: 1,
          backgroundColor:bgcolor,
          alignItems: 'center',
          justifyContent: 'center'}}>
        
        <View style={{backgroundColor:'transparent',flexDirection: 'row', height: HEIGHT_MIN/10, width:WIDTH_MIN, borderBottomLeftRadius:15, borderBottomRightRadius:15,overflow:'hidden'}}>
         <LinearGradient  colors={['#00c6ff', '#0073ff']} style={{width: 100 + '%', height: 100 +'%',}}  start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
           <View style={{flexDirection:'row', alignItems:'center',width: 100 + '%', height: 100 +'%',justifyContent:'center', paddingHorizontal:20}}>
           <Icon style={{position:"absolute",marginTop:20, left:20, zIndex:100000}} name="chevron-circle-left" size={26} color="#fff" onPress={()=> this.props.navigation.navigate('User')}/>
           <View> 
           <Text numberOfLines={1} style={{fontSize:24, fontFamily:'Quicksand-Bold',textAlign:'center' ,color:'#fff',}}>Settings</Text>
           </View>
         
               
           </View>
          
 
         </LinearGradient> 
         </View>
       
                <View style={{ flex: 1,
                width:WIDTH,
                 backgroundColor:'transparent',
                position: 'relative'}}>
                
               
                <View style={{backgroundColor:bgcolor, paddingBottom:100, paddingTop:15}}>
                <ScrollView style={{}}>
                    
                  
                  <TouchableOpacity activeOpacity={0.9} onPress={()=> this.props.navigation.navigate('EditProfile')} style={{flexDirection:"row",borderBottomColor:'#333',borderBottomWidth:0.45, justifyContent:'space-between', alignItems:'center', padding:10}}>

                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{width: banner/2, height:banner/2, borderRadius:banner/4, elevation:7, backgroundColor:'#0073ff', justifyContent:'center', alignItems:'center',padding:2 }}>
                   <Icon name="user-edit" size={20} color='#fff'/>
                   </View>
                    <Text style={{color:textcolor,marginLeft:10,  fontFamily:'Quicksand-Bold',fontSize:18}}>Edit profile</Text>
                  </View>
                    <Icon name="chevron-right" size={20} color={textcolor}/>
                   </TouchableOpacity>

                   <TouchableOpacity activeOpacity={0.9}  onPress={()=> this.props.navigation.navigate('NotificationSetting')} style={{flexDirection:"row",borderBottomColor:'#333',borderBottomWidth:0.45, justifyContent:'space-between', alignItems:'center', padding:10}}>
                   <View  style={{flexDirection:'row', alignItems:'center'}}>
                   <View style={{width: banner/2, height:banner/2, borderRadius:banner/4, elevation:7, backgroundColor:'#0073ff', justifyContent:'center', alignItems:'center',padding:2 }}>
                   <FontAwesome name="bell" size={20} color='#fff'/>
                   </View>
                    <Text style={{color:textcolor,marginLeft:10,  fontFamily:'Quicksand-Bold',fontSize:18}}>Notification</Text>
                  </View>        
                 <Icon name="chevron-right" size={20} color={textcolor}/>
                   </TouchableOpacity>
                   <TouchableOpacity activeOpacity={0.9} onPress={()=> this.props.navigation.navigate('BlockedUser')} style={{flexDirection:"row",borderBottomColor:'#333',borderBottomWidth:0.45, justifyContent:'space-between', alignItems:'center', padding:10}}>
                   <View  style={{flexDirection:'row', alignItems:'center'}}>
                   <View style={{width: banner/2, height:banner/2, borderRadius:banner/4, elevation:7, backgroundColor:'#0073ff', justifyContent:'center', alignItems:'center',padding:2 }}>
                   <Icon name="user-alt-slash" size={20} color='#fff'/>
                   </View>
                     
                    <Text style={{color:textcolor,marginLeft:10,  fontFamily:'Quicksand-Bold',fontSize:18}}>Blocked Users</Text>

                    </View>            
                <Icon name="chevron-right" size={20} color={textcolor}/>

                   </TouchableOpacity>
                  
                   <TouchableOpacity activeOpacity={0.9} onPress={()=> this.props.navigation.navigate('UpgradetoPro')} style={{flexDirection:"row",borderBottomColor:'#333',borderBottomWidth:0.45, justifyContent:'space-between', alignItems:'center', padding:10}}>
                   <View  style={{flexDirection:'row', alignItems:'center'}}>
                   <View style={{width: banner/2, height:banner/2, borderRadius:banner/4, elevation:7, backgroundColor:'#0073ff', justifyContent:'center', alignItems:'center',padding:2 }}>
                      <Icon name="themeco" size={20} color='#fff'/>
                   </View>
                    <Text style={{color:textcolor,marginLeft:10,  fontFamily:'Quicksand-Bold',fontSize:18}}>Upgrade to PRO</Text>

                    </View>                     
                    <Icon name="chevron-right" size={20} color={textcolor}/>
                   </TouchableOpacity>
                   <View style={{flexDirection:"row",borderBottomColor:'#333',borderBottomWidth:0.45, justifyContent:'space-between', alignItems:'center', padding:10}}>
                   <View  style={{flexDirection:'row', alignItems:'center'}}>
                   <View style={{width: banner/2, height:banner/2, borderRadius:banner/4, elevation:7, backgroundColor:'#0073ff', justifyContent:'center', alignItems:'center',padding:2 }}>
                      <Icon name="moon" size={20} color='#fff'/>
                   </View>
                    <Text style={{color:textcolor,marginLeft:10, fontFamily:'Quicksand-Bold',fontSize:18}}>Dark theme</Text>

                    </View>                      
                    <Switch 
                        onValueChange={()=> this.nightmode(nightmode)}
                        backgroundActive={'#0073ff'}
                        backgroundInactive={'gray'}
                        circleActiveColor={'#fff'}
                        circleInActiveColor={'#fff'}
                        value={this.state.nightmode}
                        switchLeftPx={2} 
                        switchRightPx={2} 
                      
                       />
                   </View>
                   <View style={{flexDirection:"row",borderBottomColor:'#333',borderBottomWidth:0.45, justifyContent:'space-between', alignItems:'center',padding:10}}>
                   <View  style={{flexDirection:'row', alignItems:'center'}}>
                   <View style={{width: banner/2, height:banner/2, borderRadius:banner/4, elevation:7, backgroundColor:'#0073ff', justifyContent:'center', alignItems:'center',padding:2 }}>
                      <Icon name="file-contract" size={20} color='#fff'/>
                   </View>
                    <Text style={{color:textcolor,marginLeft:10, fontFamily:'Quicksand-Bold',fontSize:18}}>Privacy Policy</Text>

                    </View>                   
                      <Icon name="chevron-right" size={20} color={textcolor}/>

                   </View>
                   <View style={{flexDirection:"row",borderBottomColor:'#333',borderBottomWidth:0.45, justifyContent:'space-between', alignItems:'center', padding:10}}>
                   <View  style={{flexDirection:'row', alignItems:'center'}}>
                     
                      <View style={{width: banner/2, height:banner/2, borderRadius:banner/4, elevation:7, backgroundColor:'#0073ff', justifyContent:'center', alignItems:'center',padding:2 }}>
                      <Icon name="question" size={20} color='#fff'/>
                   </View>
                    <Text style={{color:textcolor,marginLeft:10,  fontFamily:'Quicksand-Bold',fontSize:18}}>FAQs</Text>

                    </View>
                     <Icon name="chevron-right" size={20} color={textcolor}/>
                   </View>
                   
                   
                  <TouchableOpacity activeOpacity={0.9} onPress={()=> this.props.navigation.navigate('AccountPage')} style={{flexDirection:"row",borderBottomColor:'#333',borderBottomWidth:0.45, justifyContent:'space-between', alignItems:'center', padding:10}}>

                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{width: banner/2, height:banner/2, borderRadius:banner/4, elevation:7, backgroundColor:'#0073ff', justifyContent:'center', alignItems:'center',padding:2 }}>
                    <Icon name="shield-alt" size={20} color='#fff'/>
                    </View>
                    <Text style={{color:textcolor,marginLeft:10,  fontFamily:'Quicksand-Bold',fontSize:18}}>Account</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color={textcolor}/>
                    </TouchableOpacity>


                  

             </ScrollView>
            </View>
          </View>
        
      </View>
            
    )}}

const mapStateToProps = (state)=> {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {deleteAuthUser, deletepost,  getSinglePost,updateProfileImage2, getSingleUser, updateProfileImage, nightmodeoff, nightmodeon})(SettingPage)

const styles = {
  
}

