
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity,ActivityIndicator,ToastAndroid, Image, Dimensions,ImageBackground,StatusBar, ScrollView, Button, Alert, AsyncStorage, FlatList, NetInfo, Easing, Animated} from 'react-native';
import {connect} from 'react-redux'
import { Container, Header, Content, Card, CardItem, Right, Item, Input } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {deleteAuthUser, deletepost, getposts, addlike, addcomment,nightmodeon, nightmodeoff, getSinglePost, updateProfileImage,updateProfileImage2, getSingleUser} from '../redux/actions/authAction'
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-spinkit'
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const HEIGHT_MIN = Dimensions.get('window').height;
const WIDTH_MIN = Dimensions.get('window').width;

const TEXTSIZE = Dimensions.get('window').width ;
const ACCESS_TOKEN = 'Access_Token'
import {  LoginManager,LoginButton,AccessToken,GraphRequest,GraphRequestManager } from 'react-native-fbsdk';


import moment from 'moment'
import { BannerView } from 'react-native-fbads';

import ImagePicker from 'react-native-image-picker';
const Switch = require('react-native-material-switch')

const options = {
  title: 'Select Image',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallary',
  quatity:0.4
};

class UserScreen extends Component {
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
      nightmode: true
    }
  }
  

  
  async componentDidMount() {
   
    //Animated.timing(this.state.opvalue, { toValue: 1,delay:1000, duration:600 }).start();


        const token = await AsyncStorage.getItem(ACCESS_TOKEN)
        if(token){
          this.setState({
            token
          })

        }
        NetInfo.isConnected.addEventListener('connectionChange', await this.handleConnectionChange);

       // Animated.timing(this.state.opvalue, { toValue: 1,delay:6000, duration:1000 }).start();


  
  }




componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
}



handleConnectionChange = (isConnected) => {
        if(isConnected){
          this.setState({connection: true})
         
        } else if(isConnected == false ){
          this.setState({
            connection: false
          })
          
        } else {
          this.setState({connection: false}, ()=> {
            return(
              <View>
                <Text>Opps!</Text>
              </View>
            )
          })
         
        } 
}

  deletebutton(token) {
   
    Alert.alert(
      'Are you sure?',
      'This will delete your account and profile permanently!',
      [
        
        {text: 'Cancel', onPress: () =>{}},
        {text: 'Delete', onPress: () => this.props.deleteAuthUser(token)},
      ],
      { cancelable: true }
    )
  }

  findUserLike(likes){
    if(likes && likes.length !==undefined){
     
      if (likes.filter(like => like.facebookId == this.props.auth.user.facebookId).length >0) {
        return true
      } else {
        return false
      }
    } else {
      return false
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
          ToastAndroid.show('Profile image updating...Please wait', ToastAndroid.LONG)
        });
        this.props.updateProfileImage(this.state)
       //
        this.props.updateProfileImage2(this.state)
       // console.log(this.state.postImage)
      }
    });
  }

 

  _renderItem = (item, index, rot2)=> {

    
    // const size = this.state.sizevalue.interpolate({
    //   inputRange:[0,0.5,1],
    //   outputRange:[18,22,18]
    // })

    
    let bgcolor;
    let textcolor;
    let cardcolor;
    let iconcolor;
    let carditemcolor;
    if(this.props.auth.nightmode == true){
      bgcolor= '#303030'
      textcolor= '#fff'
      cardcolor='#424242'
      iconcolor='#fff'
      carditemcolor='#212121'

    } else {
      bgcolor= '#fff'
      textcolor= '#333'
      cardcolor='#fff'
      iconcolor='#002463'
      carditemcolor='#fff'
    }
    const postdate = moment(item.date).format('MMM Do, h:mm a');
    return (  
    <View>
    <View 
    style={{height:undefined,width: undefined,marginBottom:HEIGHT_MIN/40,paddingHorizontal:10}}
    >
      <Card style={{borderRadius:10, elevation:4 , backgroundColor:cardcolor }}>
              <CardItem  style={{height:undefined,width: undefined,borderTopLeftRadius: 10, borderTopRightRadius: 10, flexDirection:'row',backgroundColor:carditemcolor,borderBottomWidth:0.5, borderBottomColor:'#888' , backgroundColor:bgcolor}}> 
                    <View style={{flexDirection:'row'}}>
                      <View style={{ }}>
                       <Image source={{uri: item.profileImage}}  resizeMode="cover"
                    style={{height:  (HEIGHT_MIN/14) ,width: (HEIGHT_MIN/ 14), borderRadius:(HEIGHT_MIN/5), marginLeft:4, marginTop:1, marginBottom:1, borderColor:'#999', borderWidth:2}}/> 
                    </View>
                    <View style={{flexDirection:'row', width:WIDTH-(HEIGHT_MIN/14 +30)}}>
                   
                        <TouchableOpacity style={{flexDirection:'column', justifyContent:'center'}} activeOpacity={0.99} onPress={()=> {
                        this.props.getSingleUser(item, this.state)
                        this.props.navigation.navigate('ProfileItem')
                      }}>
                      <View style={{marginRight:20,}}> 
                        <Text numberOfLines={1} style={[styles.name1, {color: textcolor}]}>{item.name}</Text>
                      </View>
                         <View style={{}}>
                         
                         <Text style={{fontSize:TEXTSIZE/30, color:textcolor, marginLeft:10}}>{postdate}</Text>
                         </View>
                        
                            
                        </TouchableOpacity>
                       
                      
                    </View>
                     
                        
                   
                       
                       </View>
                       
                       
                    </CardItem>
                    
                    {
                      item.text ? (
                        <CardItem style={{height:undefined, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, margin:0, padding:0, backgroundColor:bgcolor}}>
                        <Text style={[styles.posttext, {color: textcolor}]}>{item.text}</Text>
                     </CardItem> 
                      ) : (
                        <View></View>
                      )
                    }
                   
                    {
                      item.postImage ? (
                        <CardItem cardBody style={{backgroundColor:'#ced6e0', borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
                       <Image style={{height:WIDTH_MIN,margin:'auto', width:WIDTH_MIN,borderWidth:1}} source={{uri: item.postImage}}/>
                      </CardItem> 
                      ) : (
                        <View></View>
                      )
                    }
                    <CardItem style={{borderTopWidth:0.5,borderTopColor:'#888',marginTop:3, padding:0,backgroundColor:bgcolor,flexDirection:'row',flex:1, justifyContent:'flex-start',borderBottomLeftRadius: 10, borderBottomRightRadius: 10,position:'relative'}}>
                       <View style={{flexDirection:'row',backgroundColor:bgcolor, alignItems:'center', marginRight:15,marginLeft:8 }}>


                       <TouchableOpacity onPress={()=> {
                        this._rotateLike(item)
                         this.props.addlike(item, this.state.token)
                         
                         }} activeOpacity={1} style={{marginRight:8,marginLeft:8, paddingLeft:10, paddingRight:10, paddingTop:5, paddingBottom:5}}>


                         <Animated.View style={{transform: [{rotate: rot2}], }}>
                         <FontAwesome  name="heart" size={18} 
                          color={this.findUserLike(item.likes) ? '#f70000':'#aaa'}
                          />
                         </Animated.View>
                       
                       </TouchableOpacity>


                      <View>
                        <TouchableOpacity activeOpacity={1} onPress={()=>{ 
                          this.props.getSinglePost(item._id, this.state.token)
                          this.props.navigation.navigate('LikesPage')}}  style={{marginRight:10, borderColor:'#fff',marginLeft:1,padding:5, flex:1}}>
                        <View>
                        <Text style={{color:'#333',textAlign:'center',flex:1}}>{item.likes ? (item.likes.length):(0)}</Text>

                        </View>
                       </TouchableOpacity>
                       </View>
                       </View>
                       <View style={{}}>
                       <TouchableOpacity style={{flexDirection:'row',backgroundColor:bgcolor, alignItems:'center', marginRight:15,marginLeft:8, paddingLeft:10,paddingBottom:5,paddingTop:5, paddingRight:10}} activeOpacity={1} onPress={()=>{
                        //  alert(item._id)
                         
                         this.props.getSinglePost(item._id, this.state.token)
                         this.props.navigation.navigate('CommentPage')
                         }} >
                       <Icon name="comments"  size={18} color='#aaa'/>
                       <View style={{marginRight:11, borderColor:'#fff',marginLeft:10}}>
                       <Text style={{color:textcolor,textAlign:'center',}}>{item.comments ? (item.comments.length):(0)}</Text>
                       </View>
                       </TouchableOpacity>
                      

                       </View>
                       <View style={{position:'absolute', right:40}}>
                       <TouchableOpacity style={{}}  activeOpacity={0.9} onPress={()=>{ 
                  this.props.deletepost(item._id, this.state )
                  ToastAndroid.show('Deleting...', ToastAndroid.SHORT)
                  setTimeout(()=>   this.props.getposts(this.state.token, this.props.auth.userInfo.institution), 800)
                  setTimeout(()=>   this.props.getposts(this.state.token, this.props.auth.userInfo.institution), 1200)
                  }}>
                  
                   <Text style={{color:'#FF0000', fontSize:23, padding:5, fontFamily:'Quicksand-Bold'}}>
                  x
              </Text>
              </TouchableOpacity>
                       </View>
                       
                    
                      </CardItem>                  
        </Card> 
       
     </View>
    <View>
       {/* {
         
         index % 3 == 2  ? (<View>
            <BannerView
                placementId="1911005745652403_1918639781555666"
                type="rectangle"
              onPress={()=> console.log('clicked')}
              onError={(err)=>console.log(err)}
              />
         </View>):(<View></View>)
       } */}
    </View>
    </View>
  )}

  _rotateIcon =()=> {
    //alert('yeah')
    Animated.sequence([
      Animated.timing(this.state.opvalue, { toValue: 1,delay:200, duration:1200, useNativeDriver: true, }),
      Animated.timing(this.state.opvalue, { toValue: 0, duration:0,useNativeDriver: true, })

    ]).start()
   //alert('yeah')
  }

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

    let myPost;
   if(posts && posts.length !== undefined){
    myPost= posts.filter(post=> post.facebookId === user.facebookId);
   }  else {
     return myPost = null
   }

      let myposts;
      if(myPost == null || 0){
        myposts = null
      } else {
        if(myPost.length>0){
         myposts = (
           <FlatList
              data={myPost}
              keyExtractor={post=> post.date}
              renderItem={({item, index}) => this._renderItem(item, index, rot2)}
           />
         )
        }  else{
          <Text>No post</Text>
        }
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
     
      <ScrollView style={{flex:1, backgroundColor: bgcolor}} showsVerticalScrollIndicator={false}>
      <Animated.View >
      {/******************user profile*****************/}
      
        <View style={{height: HEIGHT/2, borderBottomLeftRadius:20, borderBottomRightRadius:20 }}>
        <StatusBar
          backgroundColor='#002463'
          barStyle="light-content"
        />
          <ImageBackground blurRadius={2.3} resizeMode='cover' source={{uri:user.profile}} style={{flex:1, overflow:'hidden', borderBottomLeftRadius:20, borderBottomRightRadius:20}}>
            
              <LinearGradient 
                 colors={[ '#000', '#0b61bd']} style={{width: 100 + '%', height: 100 +'%',overflow:'hidden'}} start={{x: 0, y: 0.5}} end={{x: 1, y: 1}}
              >
              <View style={{flex:1,alignItems:'center', justifyContent:'center',}}>
             <View style={{ position:'relative',  height: HEIGHT/3.6,
                  width:HEIGHT/3.6,
                  borderRadius:HEIGHT/2,
                  borderColor:'white',
                  borderWidth:2, alignContent:'center', alignItems:'center', justifyContent:'center'}}>
              <Image source={{uri:user.profile}} style={styles.image}/>
                <TouchableOpacity activeOpacity={0.9}
               onPress={()=> this.selectphoto()}
                 style={{padding:15,alignSelf:'center',position:'absolute', right:0, bottom:0, borderRadius:50, backgroundColor:'#002463', elevation:8, borderColor:'#fff', borderWidth:2}}>
                <Animated.View style={
                  
                    {
                      //transform: [{rotate: rot}],
                       alignItems:'center', justifyContent:'center' }
                    
                  }>
                 
                <FontAwesome  name="camera" color="#fff" size={26} 
                  
                  />
                </Animated.View>
                  
                </TouchableOpacity>
              </View>
                 
                </View>
                
                </LinearGradient>
           </ImageBackground>
        </View>
       
               <View style={{marginTop:10,marginLeft:3, marginRight:3,}}>
               <View style={{}}>

               
           <Card style={{ margin:0,elevation:8,borderRadius:20, paddingBottom:0, marginBottom:0,backgroundColor:cardcolor }}>
              
              <TouchableOpacity activeOpacity={0.9} onPress={()=> this.props.navigation.navigate('EditProfile')} style={{position:'absolute', height:HEIGHT/11, width:HEIGHT/11, top:10, right:10, zIndex:100000, elevation:10}}>
                    <LinearGradient
                    colors={[ '#000', '#0b61bd']} style={{alignItems:'center', justifyContent:'center', height:HEIGHT/12, width:HEIGHT/12, backgroundColor:'#c4a5f5', borderRadius:HEIGHT/24, elevation:5}} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.9}}>
                  <Icon name='pen' size={24} color='white' style={{}}/>
                  </LinearGradient>
               </TouchableOpacity>

             <CardItem style={{borderTopLeftRadius:20, borderTopRightRadius:20,backgroundColor:cardcolor}}>
               <Text style={[styles.name, {color:textcolor, width:'80%', flexWrap:'wrap'}]}>{user.name}</Text> 
             </CardItem>
            
            <CardItem style={{backgroundColor:cardcolor}}>
            <Icon name="user-graduate" size={22}  color={ iconcolor} style={{width: WIDTH/10,alignSelf:'center'}}/>
            <Text style={[styles.institute, {color: textcolor}]}>{userInfo.institution}</Text>  
             </CardItem>
             <CardItem style={{backgroundColor:cardcolor}}>
             <Icon name="briefcase" size={22}  color={ iconcolor} style={{width: WIDTH/10,alignSelf:'center'}}/>
            <Text style={[styles.institute, {color: textcolor}]}>{userInfo.status}</Text>
              
             </CardItem >
             {userInfo.residence == '' || null || undefined ? ( <View></View>) :
            (<CardItem style={{backgroundColor:cardcolor}}>
            <Icon name="map-marker"  color={ iconcolor }size={25} style={{width: WIDTH/10,alignSelf:'center'}}/>
            <Text style={[styles.institute, {color: textcolor}]}>{userInfo.residence}</Text>
            </CardItem>)
            
              }  
                 {userInfo.ig_username == '' || null || undefined ? (
               <View></View>
             ) :
            (<CardItem style={{backgroundColor:cardcolor}}>
            <Icon name="instagram"  color= {iconcolor} size={25} style={{width: WIDTH/10,alignSelf:'center'}}/>
            <Text style= {[styles.institute, {color: textcolor}]}>{userInfo.ig_username}</Text>
            </CardItem>)
            
            }
             {userInfo.bio == '' || null ||undefined ? (
              <View></View>
            ) :
             (<CardItem style={{backgroundColor:cardcolor}} >
                <Icon name="info-circle" color= {iconcolor}size={22} style={{width: WIDTH/10,alignSelf:'center'}}/>
                <Text style={[styles.bio, {color: textcolor}]}>{userInfo.bio}</Text>
              </CardItem>)
            }
            <CardItem style={{borderBottomLeftRadius:20, borderBottomRightRadius:20, backgroundColor:cardcolor}}>
               
            </CardItem>
           </Card>
           </View>
           </View>
           
          
          <View style={{paddingTop:10}}>
    {myposts}
        
        </View>
        {/*************ads*************/}
        <View >
        <BannerView
        placementId="1911005745652403_1911143952305249"
        type="rectangle"
     
      />
        </View>
       
        <View style={{borderTopWidth:0.4,alignItems:'center', borderBottomWidth:0.4,flexDirection:'row', marginBottom:10, marginTop:10}}>
          <Text style={{color:textcolor,  fontSize: TEXTSIZE/22,marginLeft:20,paddingBottom:5,paddingTop:6,fontFamily:'Quicksand-Medium'}}>Night mode</Text>
          {/* <Switch 
          style={{position:'absolute', right:20}}
          //onChangeState={()=> this.nightmode(nightmode)}
          activeButtonColor="#002463"
          // onActivate={()=> {
           
          //   this.props.nightmodeon()
          // }}
          // onDeactivate={()=> {
          //   this.props.nightmodeoff()
          // }}
          /> */}

           {/* nightmode = (nightmode)=> {
    if(nightmode == true){
      this.setState({
        nightmode:!this.state.nightmode
      })
      
    } else {
      this.setState({
        nightmode:!this.state.nightmode
      }) */}
      
    }
  }
  


        </View>

        <View style={{borderTopWidth:0.4, borderBottomWidth:0.4, marginBottom:20, marginTop:20}}>
          
        
          <Text  style={{color:textcolor,  fontSize: TEXTSIZE/22,marginLeft:20,paddingBottom:5,paddingTop:6,fontFamily:'Quicksand-Bold'}}>Account</Text>
          <TouchableOpacity activeOpacity={0.9} onPress={()=> this.deletebutton(this.state.token)}>
              <Text style={{color:'red',  fontSize: TEXTSIZE/23.5,marginLeft:20,paddingBottom:5, fontFamily:'Quicksand-Medium'}}>Delete Account</Text>
          </TouchableOpacity>
        </View>
       

       


        
        </Animated.View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state)=> {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {deleteAuthUser, deletepost, getposts, addlike, addcomment, getSinglePost,updateProfileImage2, getSingleUser, updateProfileImage, nightmodeoff, nightmodeon})(UserScreen)

const styles = StyleSheet.create({
  image:{
    height: HEIGHT/3.6,
    width:HEIGHT/3.6,
    borderRadius:HEIGHT/2,
    borderColor:'white',
    borderWidth:2
  },
  userinformation:{
    
  

  },
  name:{
   
    fontSize: TEXTSIZE/18,
    textAlign:'left',
    paddingTop:3,
    paddingBottom:3,
    fontFamily:'Quicksand-Bold'
  },
  bio:{
   
    fontSize:TEXTSIZE/23,
    paddingLeft:5,
    paddingRight:5,
    marginRight:10,
    width:90+'%',
    flexWrap:'wrap',
    fontFamily:'Quicksand-Medium'
  },
  institute:{
   
    fontSize: TEXTSIZE/22,
    paddingLeft:5,
    paddingRight:5,
    marginRight:20,
   
    flexWrap:'wrap',
    fontFamily:'Quicksand-Medium'
  },
  posttext: {
   
    fontSize: TEXTSIZE/24,
    marginLeft:3,
     padding:4,
    fontFamily:'Quicksand-Medium'
  
  },
  
  name1:{
    marginLeft:10,
    color:'#333',
    fontFamily:'Quicksand-Bold',
    fontSize:TEXTSIZE/22,
   
  },
  
  
  
})
//Medium rectangle
//1911005745652403_1911143952305249

/*<View style={{ borderTopLeftRadius:30,
   borderTopRightRadius:30, borderTopWidth:3, zIndex:100}}>
        
           <View style={{padding:7,backgroundColor:'transparent'}}>
          
            <Text style={styles.name}>{user.name}</Text>
           </View>
          <View style={styles.about}>
           <Icon name="user-graduate" size={22} style={{width: WIDTH/10,padding:3,alignSelf:'center'}}/>
            <Text style={styles.institute}>{userInfo.institution}</Text>
           </View>
           
            <View style={styles.about}>
            <Icon name="briefcase" size={22} style={{width: WIDTH/10,padding:3,alignSelf:'center',}}/>
            <Text style={styles.institute}>{userInfo.status}</Text>
            </View>
            {userInfo.residence=== '' ? (<View></View>) :
            (<View style={styles.about}>
            <Icon name="map-marker" size={25} style={{width: WIDTH/10,padding:3,alignSelf:'center',}}/>
            <Text style={styles.institute}>{userInfo.residence}</Text>
            </View>)
            
            }
            {userInfo.bio === '' ? (<View></View>) :
             (<View style={styles.about}>
                <Icon name="info-circle" size={22} style={{width: WIDTH/10,padding:3,alignSelf:"flex-start"}}/>
                <Text style={styles.bio}>{userInfo.bio}</Text>
              </View>)
            }
            
          </View>*/