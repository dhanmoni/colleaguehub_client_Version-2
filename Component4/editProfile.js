
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity,ActivityIndicator,ToastAndroid, Image, Dimensions,ImageBackground,StatusBar, ScrollView, Button, Alert, AsyncStorage, FlatList, NetInfo, Easing, Animated, TextInput} from 'react-native';
import {connect} from 'react-redux'
import { Container, Header, Content, Card, CardItem, Right, Item, Input } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { deletepost, getposts, addlike, addcomment, getSinglePost} from '../redux/actions/postAction'
import { updateProfileImage,updateProfileImage2, updateSocialLinks, updateUserName, updateUserName2, updateUserLocation} from '../redux/actions/profileAction'
import {deleteAuthUser, nightmodeon, nightmodeoff} from '../redux/actions/authAction'
import Modal from 'react-native-modal'
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

import ImagePicker from 'react-native-image-picker';
const options = {
  title: 'Select Image',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallary',
  quatity:0.4
};


class editProfile extends Component {
    static navigationOptions = {
        header: null, 
      }
      constructor(props){
          super(props);
          this.state={
              name:'',
              instagram:'',
              twitter:'',
              youtube:'',
              residence:'',
              token: '',
              isNameModalVisible: false,
              isLocationModalVisible:false,
              isSocialModalVisible:false,
              response:null

          }
      }
      async componentDidMount() {
   
    
    
        const token = await AsyncStorage.getItem(ACCESS_TOKEN)
        if(token){
          this.setState({ token:token,
             name: this.props.auth.user.name,
            residence: this.props.auth.userInfo.residence,
            instagram: this.props.auth.userInfo.social.instagram ,
            twitter:this.props.auth.userInfo.social.twitter,
            youtube:this.props.auth.userInfo.social.youtube

            })
    
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
          //postImage: source,
           response: response
        }, ()=> {
          ToastAndroid.show('Processing...', ToastAndroid.LONG)
        });
       
       //
        this.props.updateProfileImage2(this.state)
        this.props.updateProfileImage(this.state)
       // console.log(this.state.postImage)
      }
    });
  }
  render() {
    const {user, loggedIn, userInfo, getposts, posts,myGroups, nightmode, myActiveGroups}= this.props.auth;

    let bgcolor;
    let textcolor;
    let textcolor2;
    let cardcolor;
    let iconcolor;
    let instagram_color
     let youtube_color
     let twitter_color
     let edit_color
    
    if(this.props.auth.nightmode == true){
      bgcolor= '#303030'
      textcolor= '#fff'
      textcolor2='#fff'
      instagram_color='#fff'
      youtube_color='#fff'
      twitter_color='#fff'
      edit_color='#fff'

    } else {
      bgcolor= '#fff'
      textcolor= '#0073ff'
      textcolor2='#333'
      instagram_color="#405de6"
      youtube_color='#ff0000'
      twitter_color="#1da1f2"
      edit_color="#0073ff"
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
             <Text numberOfLines={1} style={{fontSize:24, fontFamily:'Quicksand-Bold',textAlign:'center' ,color:'#fff',}}>Edit Profile</Text>
             </View>
           
                 
             </View>
            
   
           </LinearGradient> 
           </View>
           <View style={{backgroundColor:bgcolor}}>
           <ScrollView style={{backgroundColor:bgcolor,paddingBottom:100}} showsVerticalScrollIndicator={false}>

          
                    <View style={{alignItems:'center',paddingTop:13, justifyContent:'center', }}>
                    <View style={{height:  (WIDTH/3)+7 ,
                        width: (WIDTH/3)+7, borderRadius:(WIDTH/6),overflow:'hidden', justifyContent:"center", alignItems:'center',marginBottom:14,}}>
                    <LinearGradient  colors={['#00c6ff', '#0073ff']} style={{width:100+'%', height:100+'%', alignItems:'center', justifyContent:'center'}}  start={{x: 0.2, y: 0.2}} end={{x: 0.6, y: 0.6}}>
                    <Image source={{uri:userInfo.profileImage}} resizeMode='cover' style={{height:WIDTH/3, width:WIDTH/3,borderRadius:WIDTH/6,alignSelf:'center', justifyContent:'center' }}/>
                    </LinearGradient>
                    </View>
                    
                   <TouchableOpacity onPress={()=> this.selectphoto()} activeOpacity={0.8}>
                   <Text style={{textAlign:'center', fontSize:16, fontFamily:'Quicksand-Bold', color:textcolor}}>CHANGE PROFILE IMAGE</Text> 

                   </TouchableOpacity>
                   

                    </View>
                    <View style={{paddingHorizontal:10, marginTop:30}}>
                        <Text style={{fontFamily:'Quicksand-Bold', fontSize:16, color:textcolor,marginBottom:4}}>NAME :</Text>
                        <TouchableOpacity style={{}}  onPress={()=> this.setState({isNameModalVisible:true})}>
                        <TextInput 
                        selectionColor="#0073ff"
                        numberOfLines={1}
                        underlineColorAndroid="#0073ff"
                        value={this.props.auth.user.name}
                        editable={false}
                        multiline={true}
                        style={{fontFamily:'Quicksand-Medium',paddingRight:50, fontSize:15, color:textcolor2, width:100+'%'}}
                         />
                        <View style={{position:"absolute",alignSelf:'center', right:5,top:10,bottom:10}}>
                         <Icon name="pencil-alt" color={textcolor} size={23}/>
                         </View>
                        </TouchableOpacity>
                       
                    </View>
                    <View style={{paddingHorizontal:10, marginTop:20}}>
                        <Text style={{fontFamily:'Quicksand-Bold', fontSize:16, color:textcolor,marginBottom:4}}>LOCATION :</Text>
                        <TouchableOpacity style={{}}  onPress={()=> this.setState({isLocationModalVisible:true})}>
                        <TextInput 
                        selectionColor="#0073ff"
                        numberOfLines={1}
                        multiline={true}
                        underlineColorAndroid="#0073ff"
                        value={this.props.auth.userInfo.residence}
                        editable={false}
                        style={{fontFamily:'Quicksand-Medium',paddingRight:50, fontSize:15, color:textcolor2, width:100+'%'}}
                         />
                        <View style={{position:"absolute",alignSelf:'center', right:5,top:10,bottom:10, }}>
                         <Icon name="pencil-alt" color={textcolor} size={23}/>
                         </View>
                         
                        </TouchableOpacity>
                       
                    </View>
                    <View style={{paddingHorizontal:10, marginTop:20}}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={{fontFamily:'Quicksand-Bold',
                     fontSize:16, color:textcolor,marginBottom:4}}>SOCIAL LINKS :</Text>
                     <View style={{marginRight:5}}>
                        <Icon onPress={()=> this.setState({isSocialModalVisible:true})} name="pencil-alt" size={23} color={edit_color}/>
                     </View>
                    </View>
                  
                     
                    <TouchableOpacity style={{}}  onPress={()=> this.setState({isSocialModalVisible:true})}>
                        <View style={{position:"absolute",alignSelf:'center',left:0,marginLeft:2,  top:10,bottom:10,marginRight:5 }}>
                         <Icon name="instagram" color={instagram_color} size={23}/>
                         </View>
                        <TextInput 
                        selectionColor="#0073ff"
                        
                        multiline={true}
                        underlineColorAndroid="#0073ff"
                        value={this.props.auth.userInfo.social.instagram}
                        editable={false}
                        style={{fontFamily:'Quicksand-Medium',paddingLeft:50, fontSize:15, color:textcolor2, width:100+'%'}}
                         />
                        
                         
                        </TouchableOpacity>
                        <TouchableOpacity style={{}}  onPress={()=> this.setState({isSocialModalVisible:true})}>
                        <View style={{position:"absolute",alignSelf:'center',left:0,marginLeft:2,  top:10,bottom:10,marginRight:5 }}>
                         <Icon name="twitter" color={twitter_color} size={23}/>
                         </View>
                        <TextInput 
                        selectionColor="#0073ff"
                        
                        multiline={true}
                        underlineColorAndroid="#0073ff"
                        value={this.props.auth.userInfo.social.twitter}
                        editable={false}
                        style={{fontFamily:'Quicksand-Medium',paddingLeft:50, fontSize:15, color:textcolor2, width:100+'%'}}
                         />
                        
                         
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginBottom:100}}  onPress={()=> this.setState({isSocialModalVisible:true})}>
                        <View style={{position:"absolute",alignSelf:'center',left:0,marginLeft:2, top:10,bottom:10,marginRight:5 }}>
                         <Icon name="youtube" color={youtube_color} size={23}/>
                         </View>
                        <TextInput 
                        selectionColor="#0073ff"
                        
                        multiline={true}
                        underlineColorAndroid="#0073ff"
                        value={this.props.auth.userInfo.social.youtube}
                        editable={false}
                        style={{fontFamily:'Quicksand-Medium',paddingLeft:50, fontSize:15, color:textcolor2, width:100+'%'}}
                         />
                        
                         
                        </TouchableOpacity>
                        
                    </View>
                    </ScrollView>
           </View>

           {/**********************Name MOdal********************** */}
           <Modal isVisible={this.state.isNameModalVisible} 
          animationIn='slideInUp'
          animationOut='slideOutDown'
          hideModalContentWhileAnimating ={true}
          animationInTiming={200}
          onBackButtonPress={()=> this.setState({isNameModalVisible:false})}
        >
        <View style={{backgroundColor:bgcolor, width:WIDTH-50,alignSelf:'center',borderRadius:20, overflow:'hidden'}}>
                <View style={{backgroundColor:'#0073ff', height:50, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:18, fontFamily:'Quicksand-Medium', color:'#fff'}} >Edit Name</Text>
                </View>
                <View style={{marginTop:30, paddingHorizontal:10}}>
                <TextInput 
                        selectionColor="#0073ff"
                        numberOfLines={1}
                        underlineColorAndroid="#0073ff"
                        value={this.state.name}
                        editable={true}
                        onChangeText={(text)=> this.setState({name:text})}
                        style={{fontFamily:'Quicksand-Medium', fontSize:15, color:textcolor2}}
                         />
                </View>
                <View style={{ flexDirection:'row', marginBottom:20,marginTop:30, justifyContent:'space-around'}}>
                <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#bdc3c7'}} onPress={()=> {
                 
                  this.setState({isNameModalVisible:false})}}>
                  <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Cancel</Text>
                </TouchableOpacity>
              <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#0073ff'}} onPress={()=> {
                this.props.updateUserName(this.state)
                this.props.updateUserName2(this.state)
                 this.setState({isNameModalVisible:false})}}>
                <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Save</Text>
              </TouchableOpacity>
            </View>
        </View>
        </Modal>



 {/**********************Location Modal********************** */}
 <Modal isVisible={this.state.isLocationModalVisible} 
          animationIn='slideInUp'
          animationOut='slideOutDown'
          hideModalContentWhileAnimating ={true}
          animationInTiming={200}
          onBackButtonPress={()=> this.setState({isLocationModalVisible:false})}
        >
        <View style={{backgroundColor:bgcolor, width:WIDTH-50,alignSelf:'center',borderRadius:20, overflow:'hidden'}}>
                <View style={{backgroundColor:'#0073ff', height:50, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:18, fontFamily:'Quicksand-Medium', color:'#fff'}} >Edit Location</Text>
                </View>
                <View style={{marginTop:30, paddingHorizontal:10}}>
                <TextInput 
                        selectionColor="#0073ff"
                        numberOfLines={1}
                        underlineColorAndroid="#0073ff"
                        value={this.state.residence}
                        editable={true}
                        onChangeText={(text)=> this.setState({residence:text})}
                        style={{fontFamily:'Quicksand-Medium', fontSize:15, color:textcolor2}}
                         />
                </View>
                <View style={{ flexDirection:'row', marginBottom:20,marginTop:30, justifyContent:'space-around'}}>
                <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#bdc3c7'}} onPress={()=> {
                 
                  this.setState({isLocationModalVisible:false})}}>
                  <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Cancel</Text>
                </TouchableOpacity>
              <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#0073ff'}} onPress={()=> {
                this.props.updateUserLocation(this.state)
               
                 this.setState({isLocationModalVisible:false})}}>
                <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Save</Text>
              </TouchableOpacity>
            </View>
        </View>
        </Modal>


                 {/**********************Social links model********************** */}
           <Modal isVisible={this.state.isSocialModalVisible} 
          animationIn='slideInUp'
          animationOut='slideOutDown'
          hideModalContentWhileAnimating ={true}
          animationInTiming={200}
          onBackButtonPress={()=> this.setState({isSocialModalVisible:false})}
        >
        <View style={{backgroundColor:bgcolor, width:WIDTH-50,alignSelf:'center',borderRadius:20, overflow:'hidden'}}>
                <View style={{backgroundColor:'#0073ff', height:50, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:18, fontFamily:'Quicksand-Medium', color:'#fff'}} >Social Links</Text>
                </View>

                <View style={{marginTop:30, paddingHorizontal:10}}>

                <View>

                <View style={{position:"absolute",alignSelf:'center',left:0,marginLeft:2, top:10,bottom:10,marginRight:5,marginBottom:4 }}>
                  <Icon name="instagram" color={instagram_color} size={23}/>
                </View>
                <TextInput 
                        selectionColor="#0073ff"
                        numberOfLines={1}
                        underlineColorAndroid="#0073ff"
                        value={this.state.instagram}
                        editable={true}
                        onChangeText={(text)=> this.setState({instagram:text})}
                        style={{fontFamily:'Quicksand-Medium',paddingLeft:50, fontSize:15, color:textcolor2, width:100+'%'}}
                         />
                              </View>
                              <View>

              <View style={{position:"absolute",alignSelf:'center',left:0,marginLeft:2, top:10,bottom:10,marginRight:5,marginBottom:4  }}>
                <Icon name="twitter" color={twitter_color} size={23}/>
              </View>
              <TextInput 
                      selectionColor="#0073ff"
                      numberOfLines={1}
                      underlineColorAndroid="#0073ff"
                      value={this.state.twitter}
                      editable={true}
                      onChangeText={(text)=> this.setState({twitter:text})}
                      style={{fontFamily:'Quicksand-Medium',paddingLeft:50, fontSize:15, color:textcolor2, width:100+'%'}}
                      />
              </View>
              <View>

              <View style={{position:"absolute",alignSelf:'center',left:0,marginLeft:2, top:10,bottom:10,marginRight:5,marginBottom:4  }}>
                <Icon name="youtube" color={youtube_color} size={23}/>
              </View>
              <TextInput 
                      selectionColor="#0073ff"
                      numberOfLines={1}
                      underlineColorAndroid="#0073ff"
                      value={this.state.youtube}
                      editable={true}
                      onChangeText={(text)=> this.setState({youtube:text})}
                      style={{fontFamily:'Quicksand-Medium',paddingLeft:50, fontSize:15, color:textcolor2, width:100+'%'}}
                      />
              </View>

               
                </View>


                <View style={{ flexDirection:'row', marginBottom:20,marginTop:30, justifyContent:'space-around'}}>
                <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#bdc3c7'}} onPress={()=> {
                 
                  this.setState({isSocialModalVisible:false})}}>
                  <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Cancel</Text>
                </TouchableOpacity>
              <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#0073ff'}} onPress={()=> {
                this.props.updateSocialLinks(this.state)
                this.setState({isSocialModalVisible:false})}}>
                <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Save</Text>
              </TouchableOpacity>
            </View>
        </View>
        </Modal>

      
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

export default connect(mapStateToProps,{updateUserName, updateUserName2, updateUserLocation,updateProfileImage,updateProfileImage2, updateSocialLinks})(editProfile)