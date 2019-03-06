
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity,ActivityIndicator,ToastAndroid, Image, Dimensions,ImageBackground,StatusBar, ScrollView, Button, Alert, AsyncStorage, FlatList, NetInfo, Easing, Animated} from 'react-native';
import {connect} from 'react-redux'
import { Container, Header, Content, Card, CardItem, Right, Item, Input } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import AwesomeAlert from 'react-native-awesome-alerts';
import {deleteAuthUser,logoutUser } from '../redux/actions/authAction'

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
class accountPage extends Component {
    static navigationOptions = {
        header: null, 
    
      }


      
  constructor(){
    super();
    this.state={
      token:'',
      showAlert1:false,
      showAlert2:false

    }
  }
  

  
  async componentDidMount() {
   
    
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    if(token){
      this.setState({
        token
      })
  }
}

hideAlert1 = () => {
  this.setState({
    showAlert1: false
  });
};
hideAlert2 = () => {
  this.setState({
    showAlert2: false
  });
};

    deletebutton() {

    Alert.alert(
        'Are you sure?',
        'This will delete your account and profile permanently!',
        [
        
        {text: 'Cancel', onPress: () =>{}},
        {text: 'Delete', onPress: () => {
          ToastAndroid.show('Account deleted successfully!', ToastAndroid.SHORT)
          this.props.deleteAuthUser(this.state.token)}},
        ],
        { cancelable: true }
    )
    }

    logoutbutton() {
   
        Alert.alert(
          'Are you sure?',
          'Do you want to log out?',
          [
            
            {text: 'Cancel', onPress: () =>{}},
            {text: 'Logout', onPress: async() => {
                 try {
                  ToastAndroid.show('Logging you out...', ToastAndroid.SHORT)
                  this.props.logoutUser()
                  await AsyncStorage.removeItem(ACCESS_TOKEN);
                  }
                catch(exception) {
                  ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT)
                    
                }
                  
            }},
          ],
          { cancelable: true }
        )
      }


  render() {
    let bgcolor;
    let textcolor;
    let cardcolor;
    let iconcolor;
    const banner = (HEIGHT/1.6)/5.5;
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
           }}>
          
          <View style={{backgroundColor:'transparent',flexDirection: 'row', height: HEIGHT_MIN/10, width:WIDTH_MIN, borderBottomLeftRadius:15, borderBottomRightRadius:15,overflow:'hidden'}}>
           <LinearGradient  colors={['#00c6ff', '#0073ff']} style={{width: 100 + '%', height: 100 +'%',}}  start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
             <View style={{flexDirection:'row', alignItems:'center',width: 100 + '%', height: 100 +'%',justifyContent:'center', paddingHorizontal:20}}>
             <Icon style={{position:"absolute",marginTop:20, left:20, zIndex:100000}} name="chevron-circle-left" size={26} color="#fff" onPress={()=> this.props.navigation.navigate('Settings')}/>
             <View> 
             <Text numberOfLines={1} style={{fontSize:24, fontFamily:'Quicksand-Bold',textAlign:'center' ,color:'#fff',}}>Account</Text>
             </View>
           
                 
             </View>
            
   
           </LinearGradient> 
           </View>
           <View style={{backgroundColor:bgcolor, flex:1, paddingTop:10}}>

                    <TouchableOpacity activeOpacity={0.9} onPress={()=> this.setState({showAlert1:true})} style={{flexDirection:"row",borderBottomColor:'#333',borderBottomWidth:0.45, justifyContent:'space-between', alignItems:'center', padding:10}}>

                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{width: banner/2, height:banner/2, borderRadius:banner/4, elevation:7, backgroundColor:'#0073ff', justifyContent:'center', alignItems:'center',padding:2 }}>
                    <Icon name="sign-out-alt" size={20} color='#fff'/>
                    </View>
                    <View>
                    <Text style={{color:textcolor, fontSize: 18,marginLeft:10,fontFamily:'Quicksand-Medium'}}>Log out</Text>
                    </View>
                   
                    </View>
                   
                    </TouchableOpacity>

                 <TouchableOpacity activeOpacity={0.9} onPress={()=> this.setState({showAlert2:true})} style={{flexDirection:"row",borderBottomColor:'#333',borderBottomWidth:0.45, justifyContent:'space-between', alignItems:'center', padding:10}}>

                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{width: banner/2, height:banner/2, borderRadius:banner/4, elevation:7, backgroundColor:'#0073ff', justifyContent:'center', alignItems:'center',padding:2 }}>
                    <Icon name="user-minus" size={19} color='#fff'/>
                    </View>
                    <View>
                    <Text style={{color:textcolor,  fontSize: 18,marginLeft:10, fontFamily:'Quicksand-Medium'}}>Delete Account</Text>
                    </View>
                   
                    </View>
                   
                    </TouchableOpacity>



                    <AwesomeAlert
          show={this.state.showAlert1}
          showProgress={false}
          contentContainerStyle={{padding:10, width:WIDTH-100, backgroundColor:bgcolor}}
         
          title="Are you sure?"
          titleStyle={{fontFamily:'Quicksand-Bold', color:textcolor}}
          message="Do you want to log out?"
          messageStyle={{fontFamily:'Quicksand-Medium', color:textcolor}}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="LogOut"
          confirmButtonStyle={{padding:5, marginLeft:10}}
          cancelButtonStyle={{padding:5, marginRight:10}}
          cancelButtonColor="#0073ff"
          confirmButtonColor="#f4f4f4"
          cancelButtonTextStyle={{fontFamily:'Quicksand-Bold', color:'#fff'}}
          confirmButtonTextStyle={{fontFamily:'Quicksand-Bold', color:'#333'}}
          onCancelPressed={() => {
            this.hideAlert1();
          }}
          onConfirmPressed={async() => {
            this.hideAlert1();
            try {
              ToastAndroid.show('Logging you out...', ToastAndroid.SHORT)
              this.props.logoutUser()
              await AsyncStorage.removeItem(ACCESS_TOKEN);
              }
            catch(exception) {
              ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT)
                
            }
          }}
        />


<AwesomeAlert
          show={this.state.showAlert2}
          showProgress={false}
          contentContainerStyle={{padding:10, width:WIDTH-100, backgroundColor:bgcolor}}
         
          title="Are you sure?"
          titleStyle={{fontFamily:'Quicksand-Bold', color:textcolor}}
          message= 'This will delete your account and profile permanently!'
          messageStyle={{fontFamily:'Quicksand-Medium', color:textcolor}}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Delete"
          confirmButtonStyle={{padding:5, marginLeft:10}}
          cancelButtonStyle={{padding:5, marginRight:10}}
          cancelButtonColor="#0073ff"
          confirmButtonColor="#f4f4f4"
          cancelButtonTextStyle={{fontFamily:'Quicksand-Bold', color:'#fff'}}
          confirmButtonTextStyle={{fontFamily:'Quicksand-Bold', color:'#f70000'}}
          onCancelPressed={() => {
            this.hideAlert2();
          }}
          onConfirmPressed={async() => {
            this.hideAlert2();
            ToastAndroid.show('Account deleted successfully!', ToastAndroid.SHORT)
            this.props.deleteAuthUser(this.state.token)
          }}
        />


           </View>
      </View>
    )
  }
}
const mapStateToProps = (state)=> {
    return {
      auth: state.auth
    }
  }
  

const styles = StyleSheet.create({})

export default connect(mapStateToProps,{deleteAuthUser, logoutUser})(accountPage)