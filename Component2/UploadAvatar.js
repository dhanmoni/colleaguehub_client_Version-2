import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Image, StyleSheet ,AsyncStorage, ToastAndroid, ScrollView} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {signUp_User, clearError,loginUser} from '../redux/actions/authAction'
import { updateProfileImage2, updateProfileImage} from '../redux/actions/profileAction'

import LinearGradient from 'react-native-linear-gradient';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const TEXTSIZE = Dimensions.get('window').width;

import { Madoka } from 'react-native-textinput-effects';
import {connect } from 'react-redux'
const ACCESS_TOKEN = 'Access_Token'


const options = {
  title: 'Select Image',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallary',
  quatity:0.4
};


class UploadAvatar extends Component {
   
    constructor(){
        super();
        this.state={
        profileImage:'https://res.cloudinary.com/dmn19/image/upload/v1544203744/v1rya2hae6vnorsaseag.png',
         token:'',
         response:null
        }
      }
      
      async componentDidMount() {
   
        const token = await AsyncStorage.getItem(ACCESS_TOKEN)
        if(token){
         
          this.setState({token: token});
    
        }
    
        
      }

      selectphoto(){
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
         
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } 
           else {
            const source = { uri: 'data:image/jpeg;base64,' + response.data  };
         
           
         //console.log(response.fileName)
            this.setState({
              profileImage: source.uri,
               response: response
            }, ()=> {
              ToastAndroid.show('Processing...', ToastAndroid.SHORT)
            });
           
           //
           // this.props.updateProfileImage2(this.state)
           // console.log(this.state.postImage)
          }
        });
      }
   
       
  render() {
   
   
    return (
      <View style={{position:'relative'}}>
        <LinearGradient  colors={[ '#1488CC', '#2B32B2']} style={{width: 100 + '%', height: 100 +'%',overflow:'hidden'}} start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
        <ScrollView>
        <View style={{position:'absolute', right:-(WIDTH/1.2), top:-(WIDTH/1.2), width:WIDTH/0.7,height:WIDTH/0.7, borderRadius:WIDTH/1.4, borderColor:'#fff', opacity:0.15, backgroundColor: '#fff', }}>

</View>
<View style={{position:'absolute', left:-(WIDTH/2.6), top:-(WIDTH/2), width:WIDTH/1,height:WIDTH/1, borderRadius:WIDTH/2, borderColor:'#fff', opacity:0.101788, backgroundColor: '#fff', }}>

</View>
<View style={{position:'absolute', bottom:-(WIDTH/0.44),left:-(WIDTH/1), width:WIDTH/0.4,height:WIDTH/0.4, borderRadius:WIDTH/0.8, borderColor:'#fff', opacity:0.16, backgroundColor: '#fff', }}>

</View>
        <View style={{position:'absolute', top:10, left:10, paddingBottom:10}}>
             <Icon onPress={()=> this.props.navigation.navigate('CreateProfile2')} name="chevron-circle-left" color="#fff" size={30}/>
         </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, marginTop:30}}>

           <Text style={{fontSize:TEXTSIZE/18, 
            color:'white',
            fontFamily:'Quicksand-Bold',
            marginTop:20, marginBottom:10}}>
                Create Your Profile :
          </Text>
          <Text style={{fontSize:TEXTSIZE/22, 
            color:'white',
            fontFamily:'Quicksand-Bold',
            marginTop:20, marginBottom:10}}>3/3</Text>
           </View>

           <View style={{flex: 1,marginTop:30, paddingHorizontal:10, alignItems:'center',  }}>

           

           <Text style={{fontSize:24, 
            color:'white',
            fontFamily:'Quicksand-Bold',
            marginTop:20, marginBottom:20}}>
               Please provide a photo
          </Text>
             
          <View style={{ position:'relative',  height: HEIGHT/3.6,
                  width:HEIGHT/3.6,
                  borderRadius:HEIGHT/2,
                  borderColor:'white',
                  borderWidth:2, alignContent:'center', alignItems:'center', justifyContent:'center'}}>
              <Image source={{uri: this.state.profileImage}} style={styles.image}/>
                <TouchableOpacity activeOpacity={0.9}
               onPress={()=> this.selectphoto()}
                 style={{padding:15,alignSelf:'center',position:'absolute', right:0, bottom:0, borderRadius:50, backgroundColor:'#2B32B2', elevation:8, borderColor:'#fff', borderWidth:2}}>
                <View>
                 
                <FontAwesome  name="camera" color="#fff" size={26} 
                  
                  />
                </View>
                  
                </TouchableOpacity>
              </View>
              
            
              <View style={{marginTop:WIDTH/7,}}>
               
             {
               this.state.response == null ? (
                <View style={{flexDirection:'row', marginTop:10, justifyContent:'center', width:WIDTH}}>
                <View
                 style={{marginTop:50,paddingBottom:HEIGHT/6,width:'25%', margin:'auto', justifyContent:'center' }}>
                   <LinearGradient
                   
                       colors={['#2B32B2', '#2B32B2']} style={{margin:'auto', borderRadius:20}} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                    >
                <TouchableOpacity activeOpacity={0.8}  onPress={()=>{
                   
                 ToastAndroid.show('Please provide a photo', ToastAndroid.SHORT)
                     
                     }}  style={{ padding:3, flex:1,borderColor:'#fff',borderWidth:2,borderRadius:20}}>
                   
                   <Text 
                    style={{alignSelf:'center', color:'white', fontSize:TEXTSIZE/22, fontFamily:'Quicksand-Bold'}}>
                    Next
                    </Text>
                  
                </TouchableOpacity>
                </LinearGradient>
                </View>
                </View>
           
               ): (
                <View style={{flexDirection:'row', marginTop:10, justifyContent:'center', width:WIDTH}}>
                <View
                 style={{marginTop:50,paddingBottom:HEIGHT/2.5,width:'25%', margin:'auto', justifyContent:'center' }}>
                   <LinearGradient
                   
                       colors={['#2B32B2', '#2B32B2']} style={{margin:'auto', borderRadius:20}} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                    >
               <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                  
                  this.props.clearError()
                  this.props.updateProfileImage(this.state)
                  this.props.updateProfileImage2(this.state)
                    }}  style={{ padding:3, flex:1,borderColor:'#fff',borderWidth:2,borderRadius:20}}>
                    
                    <Text 
                    style={{alignSelf:'center', color:'white', fontSize:TEXTSIZE/22, fontFamily:'Quicksand-Bold'}}>
                    Next
                    </Text>
                  
                
               </TouchableOpacity>
           </LinearGradient>
           </View>
           </View>
           
               )
             }

              </View>
            
            
                    
          </View>
          </ScrollView>
          </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = (state)=> {
    return {
      auth: state.auth
    }
  }

export default connect(mapStateToProps, {signUp_User, clearError, loginUser, updateProfileImage2, updateProfileImage})(UploadAvatar)

const styles = StyleSheet.create({ 
     image:{
    height: HEIGHT/3.6,
    width:HEIGHT/3.6,
    borderRadius:HEIGHT/2,
    borderColor:'white',
    borderWidth:2
  },

})
