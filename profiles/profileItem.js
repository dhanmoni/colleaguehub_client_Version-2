import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity,ActivityIndicator, Image, Dimensions,Linking, ImageBackground,StatusBar, ScrollView, Button, Alert, AsyncStorage, FlatList } from 'react-native';
import {connect} from 'react-redux'
import { Container, Header, Content, Card, CardItem, Right } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';
import {getAllUsers, getSingleUser} from '../redux/actions/profileAction'
import {getposts, addlike} from '../redux/actions/postAction'

import Spinner from 'react-native-spinkit'
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const TEXTSIZE = Dimensions.get('window').width ;
const ACCESS_TOKEN = 'Access_Token'
import { withNavigation } from 'react-navigation';

import {BannerView, InterstitialAdManager} from 'react-native-fbads'
import moment from 'moment'

class ProfileItem extends Component {

  constructor(){
    super();
    this.state={
      token:'',
      text:'', 
      connection: true
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

  findUserLike(likes){
    
    if (likes.filter(like => like.userdata ===this.props.auth.user.id).length >0) {
      return true
    } else {
      return false
    }
  }

  
 
  

  // _renderItem = ({item})=> {
  //   const postdate = moment(item.date).format('MMM Do, h:mm a');

  
  //   return (
  //   <View
  //   style={{height:undefined,width: undefined,marginBottom:HEIGHT/50,paddingHorizontal:10}} >
  //     <Card style={{borderRadius:10,  }}>    
  //                   <CardItem  style={{height:undefined,width: undefined,borderTopLeftRadius: 10, borderTopRightRadius: 10, flexDirection:'row',backgroundColor:'rgba(212, 19, 160,1)', alignItems:'center' }}> 
  //                   <View style={{flexDirection:'row'}}>
  //                   <View style={{ }}>
  //                      <Image source={{uri: item.profileImage}}  resizeMode="cover"
  //                   style={{height:  (HEIGHT/14) ,width: (HEIGHT/ 14), borderRadius:(HEIGHT/5), marginLeft:4, marginTop:4, marginBottom:2, borderColor:'#fff', borderWidth:2}}/> 
  //                   </View>
  //                   <View style={{ width:65+'%', }}> 
  //                   <View style={{flexDirection:'column', width:100+'%'}}>
  //                     <View style={{}}> 
  //                       <Text numberOfLines={1} style={{  marginLeft:10,
  //                       color:'#fff',
  //                       fontFamily:'Quicksand-Bold',
  //                       fontSize:TEXTSIZE/24,
  //                     }}>{item.name}</Text>
  //                     </View>
  //                     <View style={{}}>
  //                     <Text style={{fontSize:TEXTSIZE/30, color:'#fff', marginLeft:10}}>{postdate}</Text>
  //                     </View>
  //                     </View>
  //                    </View>
  //                     </View>
  //                      <View style={{position:'absolute',flexDirection:'row', right:27, alignItems:'center'}}>
  //                      <View style={{borderRadius:120,marginRight:7, borderWidth:0.4, borderColor:'#fff'}}>
  //                      <Text style={{borderRadius:120,color:'#fff',textAlign:'center', backgroundColor:'rgba(0, 0, 0, 0.4)', paddingLeft:5, paddingRight:5}}>{item.likes ? (item.likes.length):(0)}</Text>
  //                      </View>
  //                      <View>
  //                        <TouchableOpacity 
  //                        activeOpacity={0.7}
  //                         onPress={()=> {
  //                           this.rotateIcon
  //                           this.props.addlike(item, this.state.token)
  //                            setTimeout(()=>this.props.getposts(this.state.token, this.props.auth.userInfo.institution), 2000)
  //                         }} 
  //                        >
  //                      <FontAwesome
                       
  //                       name="heart" size={23} color={this.findUserLike(item.likes) ? '#f50002':'#fff'}/>
  //                     </TouchableOpacity>
  //                      </View>
                       
  //                      </View>

  //                   </CardItem>
  //                   <CardItem cardBody style={{height:undefined, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginLeft:4}}>
  //                      <Text style={styles.posttext}>{item.text}</Text>
  //                   </CardItem>                   
  //       </Card> 
  //    </View>
    
  // )}


  render() {
    const {user, loggedIn, allUsers, loading, profile, posts}= this.props.auth

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

    if(loading){
        return(
          <View style={{flex: 1, justifyContent:'center',alignItems:'center', backgroundColor:bgcolor}}>
            <Spinner color={'#002463'} size={50} type={"Circle"}/>
            
          </View>
        )
      }
      else if (profile == undefined || null){
        return (
          <View style={{alignItems:'center',backgroundColor:bgcolor, justifyContent:'center',flex:1}}>
         
         <Text style={{textAlign:'center',marginTop:6,color:textcolor, fontSize:22, fontFamily:'Quicksand-Medium'}}>No profile found</Text>
       </View>
        )
      }


  //     let hisPost;
  //  if(posts && posts.length !== undefined){
  //   hisPost= posts.filter(post=> post.facebookId === profile.facebookId);
  //  }  else {
  //    return hisPost = null
  //  }

  //     let hisposts;
  //     if(hisPost == null || 0){
  //       hisposts = null
  //     } else {
  //       if(hisPost.length>0){
  //        hisposts = (
  //          <FlatList
  //             data={hisPost}
  //             keyExtractor={post=> post.date}
  //             renderItem={this._renderItem}
  //          />
  //        )
  //       }  else{
  //         <Text>No post</Text>
  //       }
  //     }


      return (
     
        <ScrollView style={{flex:1, backgroundColor:bgcolor}} showsVerticalScrollIndicator={false}>
        <View style={{flex:1}}>
        {/******************user profile*****************/}
        
          <View style={{height: HEIGHT/2, borderBottomLeftRadius:20, borderBottomRightRadius:20 }}>
          <View style={{alignItems:'center',flexDirection:'row', position:'absolute', top:13, left:15, zIndex:100}}>
            
            
          </View>
          
            <ImageBackground blurRadius={2.3} resizeMode='cover' source={{uri:profile.profileImage}} style={{flex:1, overflow:'hidden', borderBottomLeftRadius:20, borderBottomRightRadius:20}}>
                <Icon
                onPress={() =>{ 
                  this.props.navigation.goBack()
                  InterstitialAdManager.showAd('1911005745652403_1935495603203417')
                }}
                name='arrow-left' size={30} color="#fff" style={{position:'absolute', top:20, left:20, padding:10,zIndex:1000 }}/>
                <LinearGradient  colors={[ '#00c6ff', '#0073ff']} style={{width: 100 + '%', height: 100 +'%',overflow:'hidden'}} start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} ><View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                  <Image source={{uri:profile.profileImage}} style={styles.image}/> 
                  </View>
                  </LinearGradient>
             </ImageBackground>
          </View>
          {/******************* user details*******************/}
        
                  
  
          
                 <View style={{marginTop:10,marginLeft:3, marginRight:3,}}>
                 <View style={{}}>
  
                 
             <Card style={{ margin:0,elevation:8,borderRadius:20, paddingBottom:0,backgroundColor:cardcolor  }}>
                
               
  
               <CardItem style={{borderTopLeftRadius:20, borderTopRightRadius:20,backgroundColor:cardcolor}}>
                 <Text style={[styles.name, {color:textcolor}]}>{profile.name}</Text> 
               </CardItem>
              
              <CardItem style={{backgroundColor:cardcolor}}>
              <Icon name="user-graduate" size={22}   color= {iconcolor} style={{width: WIDTH/10,alignSelf:'center'}}/>
              <Text style={[styles.institute, {color:textcolor}]}>{profile.institution}</Text>  
               </CardItem>
               <CardItem  style={{backgroundColor:cardcolor}}>
               <Icon name="briefcase" size={22}   color= {iconcolor} style={{width: WIDTH/10,alignSelf:'center'}}/>
              <Text style={[styles.institute, {color:textcolor}]}>{profile.status}</Text>
                
               </CardItem>
               
               {profile.residence == '' || null || undefined ? ( <View></View>) :
            (<CardItem  style={{backgroundColor:cardcolor}}>
            <Icon name="map-marker"   color= {iconcolor} size={25} style={{width: WIDTH/10,alignSelf:'center'}}/>
            <Text style={[styles.institute, {color:textcolor}]}>{profile.residence}</Text>
            </CardItem>)
            
              }  

                 {profile.ig_username == '' || null || undefined ? ( <View></View>) :
              (<CardItem  style={{backgroundColor:cardcolor}}>
              <Icon name="instagram"   color= {iconcolor} size={25} style={{width: WIDTH/10,alignSelf:'center'}}/>
              <Text style={[styles.institute, {color:textcolor}]}>{profile.ig_username}</Text>
              </CardItem>)
              
              }

               {profile.bio == '' || null ||undefined ? (
                 <View></View>
              ) :
               (<CardItem  style={{backgroundColor:cardcolor}}>
                  <Icon name="info-circle" color= {iconcolor} size={22} style={{width: WIDTH/10,alignSelf:'center'}}/>
                  <Text style={[styles.bio, {color:textcolor}]}>{profile.bio}</Text>
                </CardItem>)
              }
              <CardItem style={{borderBottomLeftRadius:20, borderBottomRightRadius:20, backgroundColor:bgcolor}}>
                 
              </CardItem>
             </Card>
             </View>
             </View>
             {
               profile.ig_username == ''|| profile.ig_username == null || profile.ig_username == undefined || profile.userdata == user.id ? (<View></View>):(
                <View style={{flexDirection:'row', marginTop:7, justifyContent:'center', paddingBottom:20, width:WIDTH}}>
                <View
                 style={{marginTop:10,marginBottom:10,width:'65%', margin:'auto', justifyContent:'center', backgroundColor:bgcolor }}>
                   <LinearGradient
                       colors={[ '#833ab4', '#fd1d1d', '#fcb045']} style={{borderRadius:30, elevation:7, margin:'auto'}} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                    >
                  <TouchableOpacity  activeOpacity={0.7}
                  style={{ padding:9, flex:1, borderRadius:10}}
                       onPress={()=> {
                        Linking.canOpenURL('https://instagram.com/'+profile.ig_username).then(supported => {
                          if (!supported) {
                            return Linking.openURL('https://instagram.com/'+profile.ig_username)
                          } else {
                            return Linking.openURL('https://instagram.com/'+profile.ig_username);
                          }
                        }).catch(err => console.error('An error occurred', err));
                      
                         }}>
                    <Text 
                    style={{alignSelf:'center', color:'white', fontSize:TEXTSIZE/24, fontFamily:'Quicksand-Bold'}}>
                    View Instagram Profile
                    </Text>
                  </TouchableOpacity>
                  </LinearGradient>
                </View>
               
                </View>
               )
             }
             
            
           
         
         
             {/* <View style={{marginBottom:20}}>
                  <BannerView
                placementId="1911005745652403_1918573884895589"
                type="rectangle"
              onPress={()=> console.log('clicked')}
              onError={(err)=> console.log(err)}
              />
                </View> */}

                 {/* <View style={{paddingTop:10, paddingBottom:30}}>
             {hisposts}
        
              </View> */}
  
          
          </View>
        </ScrollView>
    )
  }
}

const mapStateToProps = (state)=> {
    return {
      auth: state.auth
    }
  }

export default connect(mapStateToProps, {getSingleUser, addlike, getposts})(withNavigation(ProfileItem)) 

const styles = StyleSheet.create({
  image:{
    height: HEIGHT/3.6,
    width:HEIGHT/3.6,
    borderRadius:HEIGHT/2,
    borderColor:'white',
    borderWidth:2
  },
 
  name:{
    color:'#333',
    fontSize: TEXTSIZE/18,
    textAlign:'left',
    paddingTop:3,
    paddingBottom:3,
    fontFamily:'Quicksand-Bold',
   
    flexWrap:'wrap'
  },
  bio:{
    color:'black',
    fontSize:TEXTSIZE/23,
    paddingLeft:5,
    paddingRight:5,
    marginRight:10,
    width:90+'%',
    flexWrap:'wrap',
    fontFamily:'Quicksand-Medium'
  },
  institute:{
    color:'#333333',
    fontSize: TEXTSIZE/22,
    paddingLeft:5,
    fontFamily:'Quicksand-Medium'
  },
  posttext: {
    color:'#333333',
    fontSize: TEXTSIZE/24,
    marginLeft:10,
     padding:15,
    fontFamily:'Quicksand-Medium'
  
  }
  
})