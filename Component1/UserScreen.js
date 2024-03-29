
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
      scrollY: new Animated.Value(0),
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

  deletebutton() {
   
    Alert.alert(
      'Are you sure?',
      'This will delete your account and profile permanently!',
      [
        
        {text: 'Cancel', onPress: () =>{}},
        {text: 'Delete', onPress: () => this.props.deleteAuthUser(this.state.token)},
      ],
      { cancelable: true }
    )
  }

  findUserLike(likes){
    if(likes && likes.length !==undefined){
     
      if (likes.filter(like => like.userdata == this.props.auth.user._id).length >0) {
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
          ToastAndroid.show('Processing...', ToastAndroid.SHORT)
        });
       
       //
        this.props.updateProfileImage2(this.state)
        this.props.updateProfileImage(this.state)
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
      carditemcolor='#424242'

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
      <Card style={{borderRadius:10, elevation:4 , backgroundColor:carditemcolor }}>
              <CardItem  style={{height:undefined,width: undefined,borderTopLeftRadius: 10, borderTopRightRadius: 10, flexDirection:'row',backgroundColor:carditemcolor,borderBottomWidth:0.5, borderBottomColor:'#888' , backgroundColor:bgcolor}}> 
                    <View style={{flexDirection:'row'}}>
                      <View style={{ }}>
                       <Image source={{uri: item.profileImage}}  resizeMode="cover"
                    style={{height:  (HEIGHT_MIN/14) ,width: (HEIGHT_MIN/ 14), borderRadius:(HEIGHT_MIN/5), marginLeft:4, marginTop:1, marginBottom:1, borderColor:'#999', borderWidth:2}}/> 
                    </View>
                    <View style={{flexDirection:'row', width:WIDTH-(HEIGHT_MIN/14 +30)}}>
                   
                        <TouchableOpacity style={{flexDirection:'column', justifyContent:'center'}} activeOpacity={0.99} onPress={()=> {
                        this.props.getSingleUser(item.userdata, this.state.token)
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
                  this.props.deletepost(item, this.state.token )
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
  _rendernames = (item ,index)=> {
      return (
        <View>
          <Text style={{fontFamily:'Quicksand-Medium', fontSize:16,color:'#333', padding:3}}>{item}</Text>
        </View>
      )
  }
  
  _renderskills= (item ,index)=> {
    return (
      <View style={{paddingBottom:3}}>
        <Text style={{fontFamily:'Quicksand-Medium', fontSize:16,color:'#333', padding:3}}>{item.title}</Text>
        <Text style={{fontFamily:'Quicksand-Medium', fontSize:14,color:'#333', padding:1}}>{item.score}</Text>

      </View>
    )
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
    const banner = (HEIGHT/1.6)/5.5;
    const HEADER_FIRST_HEIGHT = HEIGHT/1.45;
    const HEADER_LAST_HEIGHT = HEIGHT/9
    const headerHeight1 = this.state.scrollY.interpolate({
      inputRange:[0, (HEADER_FIRST_HEIGHT-HEADER_LAST_HEIGHT)/4, (HEADER_FIRST_HEIGHT-HEADER_LAST_HEIGHT)/2],
      outputRange:[HEADER_FIRST_HEIGHT,HEADER_LAST_HEIGHT/1.3, HEADER_LAST_HEIGHT],
      extrapolate:'clamp'
    })
    const headerMargin = this.state.scrollY.interpolate({
      inputRange:[0, (HEADER_FIRST_HEIGHT-HEADER_LAST_HEIGHT)/4, (HEADER_FIRST_HEIGHT-HEADER_LAST_HEIGHT)/2],
      outputRange:[HEADER_FIRST_HEIGHT, HEADER_LAST_HEIGHT/3, HEADER_LAST_HEIGHT],
      extrapolate:'clamp'
    })
    const headerMargin2 = this.state.scrollY.interpolate({
      inputRange:[0,(HEADER_FIRST_HEIGHT-HEADER_LAST_HEIGHT)/2],
      outputRange:[(500), 0],
      extrapolate:'clamp'
    })
    const opacity1 = this.state.scrollY.interpolate({
      inputRange:[0, (HEADER_FIRST_HEIGHT-HEADER_LAST_HEIGHT)/3, (HEADER_FIRST_HEIGHT-HEADER_LAST_HEIGHT)/1.5],
      outputRange:[1,0,  0],
      extrapolate:'clamp'
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
    myPost= posts.filter(post=> post.userdata === user._id);
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
   
    let MyIns = []
    const institutes = userInfo.institution.map(institute=> {
        MyIns.push(institute.institution_name)
      
    })
   const names=( 
            <FlatList
              data={MyIns}
              keyExtractor={name=> name}
              renderItem={({item, index}) => this._rendernames(item, index)}
          />)
      const MySkill=[]
    const skills = userInfo.skills.map(skill=> {
      MySkill.push(skill)
    
  })
  const myskills=( 
          <FlatList
            data={MySkill}
            keyExtractor={name=> name.toString()}
            renderItem={({item, index}) => this._renderskills(item, index)}
        />)
              
    
   
    // const myInses = institutes.institution_name;
    // console.log(myInses)

      
    return (
     
      <Animated.View >
      <StatusBar
          backgroundColor='#2b32b2'
          barStyle="light-content"
        />
      {/******************user profile*****************/}
      {/*********************social card ***********************/} 
    
        <Animated.View style={{height: headerHeight1,position:'absolute',borderBottomLeftRadius:20, borderBottomRightRadius:20 , top:0, left:0, right:0,zIndex:100}}>
           <LinearGradient  colors={[ '#00c6ff', '#2B32B2']} style={{height:100+'%'}} start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
            <Animated.View style={{flexDirection:'row',opacity:opacity1, justifyContent:'space-between',paddingTop:30, paddingHorizontal:20}}>
               
                <View style={{alignItems:"center", justifyContent:'center'}}>
                  <FontAwesome name="bell" color="#fff" size={24}/>
                </View>
                <View style={{alignItems:"center", justifyContent:'center'}}>
                  <Icon name="cog" onPress={()=>this.props.navigation.navigate('Settings')} color="#fff" size={24}/>
                </View>
            </Animated.View>
                <Animated.View style={{flex:1,alignItems:'center', justifyContent:'center',opacity:opacity1}}>

                  <View style={{ position:'relative',  height: HEIGHT/3.6, width:HEIGHT/3.6, borderRadius:HEIGHT/2, borderColor:'white', borderWidth:2, alignContent:'center', alignItems:'center', justifyContent:'center'}}>

                    <Image source={{uri:userInfo.profileImage}} style={styles.image}/>

                      <TouchableOpacity activeOpacity={0.9}
                    onPress={()=> this.selectphoto()}
                      style={{padding:15,alignSelf:'center',position:'absolute', right:0, bottom:0, borderRadius:50, backgroundColor:'#2b32b2', elevation:8, borderColor:'#fff', borderWidth:2}}>

                      <Animated.View style={ { alignItems:'center', justifyContent:'center' } }>
                        <FontAwesome  name="camera" color="#fff" size={26} />
                      </Animated.View>

                      </TouchableOpacity>
                  </View>
                  <View style={{paddingTop:20}}>
                    <Text style={{textAlign:'center', color:'#fff', fontSize:24, fontFamily:'Quicksand-Bold'}}>
                      {user.name.toUpperCase()}
                    </Text>
                    <Text style={{textAlign:'center', color:'#fff', fontSize:17, fontFamily:'Quicksand-Bold'}}>
                      {userInfo.residence}
                    </Text>
                    <View style={{flexDirection:"row",paddingLeft:10,marginTop:7, paddingRight:10,backgroundColor:'#fff', borderRadius:10,elevation:3, alignItems:'center', justifyContent:'center'}}>
                    
                      <Icon name="star" size={26} color="#333"/>
                      <View style={{marginLeft:12,borderLeftWidth:0.7, }}>
                      <Text style={{textAlign:'center', fontFamily:'Quicksand-Bold', fontSize:20,marginLeft:12, color:'#333'}}>{userInfo.stars.length}</Text>
                      </View>
                     
                     
                    </View>
                  </View>
               
                 
                </Animated.View>
                <Animated.View style={{
         marginTop: HEADER_FIRST_HEIGHT - banner/2, borderRadius:19, elevation:4, height:banner/1.33, backgroundColor:'#fff', width:WIDTH-40,zIndex:10000,overflow:'visible', alignItems:'center',flexDirection:'row', justifyContent:'space-evenly', opacity:opacity1,marginLeft:20, marginRight:20
      }}>

     
      <Card style={{ }}>
          {
            userInfo.social.instagram == '' || userInfo.social.instagram == null ?null : (
              <View style={{width: banner/1.6, height:banner/1.6, borderRadius:banner/3.2, elevation:7, backgroundColor:'#fff', justifyContent:'center', alignItems:'center', }}> 
                  <Icon name="instagram" color="#405de6" size={25}/>
              </View>
            )
          }
          {
            userInfo.social.youtube == '' || userInfo.social.youtube == null ? null : (
              <View style={{width: banner/1.6, height:banner/1.6, borderRadius:banner/3.2, elevation:7, backgroundColor:'#fff', justifyContent:'center', alignItems:'center', }}> 
                  <Icon name="youtube" color="#ff0000" size={25}/>
              </View>
            )
          }
          {
            userInfo.social.twitter == '' || userInfo.social.twitter == null ? null : (
              <View style={{width: banner/1.6, height:banner/1.6, borderRadius:banner/3.2, elevation:7, backgroundColor:'#fff', justifyContent:'center', alignItems:'center', }}> 
                  <Icon name="twitter" color="#1da1f2" size={25}/>
              </View>
            )
          }
          
      </Card>
      </Animated.View>
                
                </LinearGradient>
          
             </Animated.View>
             <Animated.ScrollView style={{paddingTop:headerMargin, backgroundColor:bgcolor}}
              onScroll={Animated.event([{
                nativeEvent: {contentOffset:{y: this.state.scrollY}}
              }])}
             showsVerticalScrollIndicator={false}>
             


       <View style={{}}>
       <View style={{padding:5, paddingHorizontal:20}}>
         <Text style={{textAlign:'left',fontSize:18, fontFamily:'Quicksand-Bold', color:'#333'}}>About :</Text>
       </View>
       {/*********************institutions card ***********************/}        
       <Card style={{borderRadius:6, elevation:3,backgroundColor:'#fff', width:WIDTH-40,marginLeft:20,marginTop:20 }}>
                  <CardItem style={{borderBottomWidth:0.7, width:WIDTH-40, justifyContent:'space-between', paddingHorizontal:20}}>
                      <Text style={{textAlign:'left',margin:0, padding:0, fontSize:15,color:'#333', fontFamily:'Quicksand-Bold'}}>My Institutions/Groups :</Text>
                      <Text style={{textAlign:"center",fontFamily:'Quicksand-Regular', fontSize:13, color:'#2b32b2'}}>Edit</Text>
                  </CardItem>
                  <CardItem style={{}}>
                      
                      {names}
                  </CardItem>
         </Card>
         {/********************bio card ***********************/} 
         <Card style={{borderRadius:6, elevation:3,backgroundColor:'#fff', width:WIDTH-40,marginLeft:20, }}>
                  <CardItem style={{borderBottomWidth:0.7, width:WIDTH-40, justifyContent:'space-between', paddingHorizontal:20}}>
                      <Text style={{textAlign:'left',margin:0, padding:0, fontSize:15,color:'#333', fontFamily:'Quicksand-Bold'}}>Bio :</Text>
                      <Text style={{textAlign:"center",fontFamily:'Quicksand-Regular', fontSize:13, color:'#2b32b2'}}>Add bio</Text>
                  </CardItem>
                  <CardItem style={{}}>
                      {
                        userInfo.bio== '' || userInfo.bio == null ? (
                          <View style={{alignItems:'center'}}>
                            <Text style={{textAlign:"center",fontFamily:'Quicksand-Medium', fontSize:14,}}>No bio yet</Text>
                            
                          </View>
                        ): (
                          <View>
                            <Text style={{textAlign:'auto',fontFamily:'Quicksand-Medium', fontSize:17, }}>{userInfo.bio}</Text>
                          </View>
                        )
                      }
                  </CardItem>
         </Card>
           {/*********************skills card ***********************/}        
        <Card style={{borderRadius:6, elevation:3,backgroundColor:'#fff', width:WIDTH-40,marginLeft:20,marginTop:20 }}>
                  <CardItem style={{borderBottomWidth:0.7, width:WIDTH-40, justifyContent:'space-between', paddingHorizontal:20}}>
                      <Text style={{textAlign:'left',margin:0, padding:0, fontSize:15,color:'#333', fontFamily:'Quicksand-Bold'}}>My skills/hobbies :</Text>
                      <Text style={{textAlign:"center",fontFamily:'Quicksand-Regular', fontSize:13, color:'#2b32b2'}}>Edit</Text>
                  </CardItem>
                  <CardItem style={{}}>
                      
                      {myskills}
                  </CardItem>
                  
         </Card>
       
        
 
       </View> 
            
          
          <View style={{paddingTop:10, zIndex:1}}>

             {myposts}
          </View>
        {/*************ads*************/}
        {/* <View >
        <BannerView
        placementId="1911005745652403_1911143952305249"
        type="rectangle"
     
      />
        </View> */}
       
      

         <View style={{borderTopWidth:0.4, borderBottomWidth:0.4, marginBottom:HEADER_FIRST_HEIGHT, marginTop:20}}>
          
        
          <Text  style={{color:textcolor,  fontSize: TEXTSIZE/22,marginLeft:20,paddingBottom:5,paddingTop:6,fontFamily:'Quicksand-Bold'}}>Account</Text>
          <TouchableOpacity activeOpacity={0.9} onPress={()=> this.deletebutton()}>
              <Text style={{color:'red',  fontSize: TEXTSIZE/23.5,marginLeft:20,paddingBottom:5, fontFamily:'Quicksand-Medium'}}>Delete Account</Text>
          </TouchableOpacity>
        </View> 
       
        </Animated.ScrollView>
       


        
        </Animated.View>
     
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