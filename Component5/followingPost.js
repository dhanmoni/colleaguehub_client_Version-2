import React, { Component } from 'react'
import { StyleSheet, Text, View ,Image,Dimensions,FlatList,TouchableOpacity, AsyncStorage, NetInfo, TouchableWithoutFeedback, Animated, Easing, ScrollView, Share, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import {withNavigation} from 'react-navigation'
import base64 from 'react-native-base64'
import {  Card, CardItem, Left, Item, Input  } from 'native-base';
import {connect} from 'react-redux'
import { getposts, addpost, addlike, addcomment, getSinglePost} from '../redux/actions/postAction'
import {getAllUsers, getSingleUser,setMyGroups, setMyActiveGroups, setLoading } from '../redux/actions/profileAction'
import Spinner from 'react-native-spinkit'
let HEIGHT_MIN = Dimensions.get('window').height;
let WIDTH_MIN = Dimensions.get('window').width;
const TEXTSIZE = Dimensions.get('window').width ;
const ACCESS_TOKEN = 'Access_Token'
import Moment from 'react-moment';
import moment from 'moment'
 class Following extends Component {

    static navigationOptions={
        header:null,
        
    }
    
      constructor(props){
        super(props);
        this.state={
          token:'',
          
          refreshing:false,
          text:'',
          isLoading:false,
          
          connection: false,
          opvalue: new Animated.Value(0),
          springvalue: new Animated.Value(0),
          inputWidth: new Animated.Value(0),
          opacity: new Animated.Value(0),
          
          scrollY: new Animated.Value(0),
          myGroups: [],
          myActiveGroups:[]
        
        }
      }
      async componentDidMount() {
   
        const token = await AsyncStorage.getItem(ACCESS_TOKEN)
        await this.props.auth.userInfo.institution.filter(name=> {
          this.state.myGroups.push(name.institution_name)
        })
        await this.props.auth.userInfo.activeGroup.filter(name=> {
          this.state.myActiveGroups.push(name.institution_name)
        })
    
    
        
        console.log(this.state.myGroups)
        if(token){
          console.log( 'token in storyscreen is ', token)
          this.setState({token: token}, ()=> {
            this.props.getposts(this.state.token,this.state.myActiveGroups)
            this.props.setMyGroups(this.state.myGroups)
            //this.props.setMyActiveGroups(this.state.myActiveGroups, this.state.token)
    
          });
    
        }
        NetInfo.isConnected.addEventListener('connectionChange', await this.handleConnectionChange);
    
        
      }

      findUserLike(likes){
        if(likes && likes.length !==undefined){
         
          if (likes.filter(like => like.userdata == this.props.auth.userInfo.userdata).length >0) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      }
      _renderItem = (item, index)=> {
        const postdate = moment(item.date).format('D MMM, h:mma');
        let bgcolor;
          let textcolor;
          let cardcolor;
          let iconcolor;
          const rot2 = this.state.springvalue.interpolate({
            inputRange:[0,1],
            outputRange:['0deg', '720deg']
          })
          if(this.props.auth.nightmode == true){
            bgcolor= '#303030'
            textcolor= '#fff'
            cardcolor='#424242'
            iconcolor='#fff'
          } else {
            bgcolor= '#fff'
            textcolor= '#333'
            cardcolor='#fff'
            iconcolor='grey'
          }
         
        
        return (  
        <View style={{ backgroundColor:bgcolor}}>
        <View 
        style={{height:undefined,width: undefined,marginBottom:HEIGHT_MIN/40,paddingHorizontal:10, backgroundColor:bgcolor}}
        >
          <Card style={{borderRadius:10,overflow:'hidden', elevation:4 , backgroundColor:cardcolor}}>
                     
                       
                        {
                          item.postImage ? (
                            <CardItem cardBody style={{backgroundColor:'#ced6e0', borderTopLeftRadius: 10, borderTopRightRadius: 10,}}>
                           <Image style={{height:WIDTH_MIN,margin:'auto', width:WIDTH_MIN,borderWidth:1}} source={{uri: item.postImage}}/>
                          </CardItem> 
                          ) : (
                            null
                          )
                        }
                  <CardItem  style={{height:undefined,width: undefined,backgroundColor:cardcolor,borderBottomWidth:0.5, borderBottomColor:'#888',}}> 
                  <View>
                  <TouchableOpacity activeOpacity={0.9} onPress={()=> {
                            this.props.getSingleUser(item.userdata, this.state.token)
                            this.props.navigation.navigate('ProfileItem')}} style={{flexDirection:'row', alignItems:'center'}}>
                            <View style={{overflow:'hidden',alignItems:'center', justifyContent:'center' }}>
                            <LinearGradient  colors={['#00c6ff', '#0073ff']} style={{height:  (HEIGHT_MIN/14) ,width: (HEIGHT_MIN/ 14), borderRadius:(HEIGHT_MIN/5),overflow:'hidden', justifyContent:"center", alignItems:'center'}}  start={{x: 0.2, y: 0.2}} end={{x: 0.6, y: 0.6}}>
                            <Image source={{uri: item.profileImage}}  resizeMode="cover"
                                style={{height: (HEIGHT_MIN/14)-5, width: (HEIGHT_MIN/14)-5,alignSelf:'center', borderRadius: HEIGHT_MIN/5, justifyContent:'center'}}/>
                            </LinearGradient>
                               
                            </View>
                       
                       
                            <View style={{}}>
                              <Text numberOfLines={1} style={[styles.name, {color:textcolor, }]}>{item.name}</Text>
                            </View>
                          </TouchableOpacity>
                            {
                              item.text ? (
                                <View style={{height:undefined,paddingLeft:5,}}>
                                
                                <Text style={[styles.posttext, {color:textcolor, }]}>{item.text}</Text>
                            </View> 
                              ) : (
                                null
                              )
                            }
                  </View>
                        
                           
                        </CardItem>
                        
                        <View style={{marginTop:3, padding:5,backgroundColor:cardcolor,flexDirection:'row',flex:1, justifyContent:'space-around',borderBottomLeftRadius: 10,alignItems:'center', borderBottomRightRadius: 10,}}>
                           <View style={{flexDirection:'row',backgroundColor:cardcolor, alignItems:'center',  }}>
                           <TouchableOpacity onPress={()=> {
                             this._rotateLike(item)
                             this.props.addlike(item, this.state)
                             }} activeOpacity={1} style={{paddingRight:8,paddingLeft:8, paddingTop:5, paddingBottom:5}}>
    
                            <Animated.View style={{transform: [{rotate: rot2}], }}>
                             <Icon  name="heart" size={18} 
                              color={this.findUserLike(item.likes) ? '#f70000':'#aaa'}
                              />
                             </Animated.View>
    
    
                           </TouchableOpacity>
                          <View style={{alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity activeOpacity={0.8} onPress={()=>{ 
                              this.props.getSinglePost(item._id, this.state.token)
                              this.props.navigation.navigate('LikesPage')}} 
                              style={{paddingRight:10,alignItems:'center', justifyContent:'center', borderColor:'#fff',paddingLeft:1,}}>
                            <View>
                            <Text style={{color:textcolor,textAlign:'center',}}>{item.likes ? (item.likes.length):(0)}</Text>
    
                            </View>
                           </TouchableOpacity>
                           </View>
                           </View>
                           <View style={{backgroundColor:cardcolor}}>
                           <TouchableOpacity style={{flexDirection:'row',backgroundColor:cardcolor, alignItems:'center',paddingLeft:10,paddingBottom:5,paddingTop:5, paddingRight:10}} activeOpacity={1} onPress={()=>{
                            //  alert(item._id)
                             
                             this.props.getSinglePost(item._id, this.state.token)
                             this.props.navigation.navigate('CommentPage')
                             }} >
                           <Icon name="comments"  size={18} color='#aaa'/>
                           <View style={{ borderColor:'#fff',paddingLeft:10}}>
                           <Text style={{color:textcolor,textAlign:'center',}}>{item.comments ? (item.comments.length):(0)}</Text>
                           </View>
                           </TouchableOpacity>
                          
    
                           </View>
                             <View>
                          <Text style={{fontSize:TEXTSIZE/30, color:textcolor,}}>{postdate}</Text>
    
                          </View> 
                          <View>
                          <Icon name="ellipsis-v" size={20} color={iconcolor}/>
    
                          </View> 
                        
                          </View>                  
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
    
         handleRefresh = ()=> {
            this.setState({
              refreshing: true,
             
            },()=> {
    
              this.props.getposts(this.state.token, this.state.myActiveGroups)
             return (
               this.setState({
                 refreshing:false
               })
             )
            }
            )
          }
    

      
      onClick =(url)=> {
        Share.share({
          message: `Your friend ${this.props.auth.user.name} from ${this.props.auth.userInfo.institution} has invited you to join colleaguehub.Download the app now. \n` + url,
          
          title: 'Join Colleaguehub!'
        })
      }

     
      onTextChange =(text)=> {
        this.setState({text})
      }


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

      _rotateRefresh =()=> {
        
        Animated.sequence([
          Animated.timing(this.state.opvalue, { toValue: 1, duration:1800, useNativeDriver: true, }),
          Animated.timing(this.state.opvalue, { toValue: 0, duration:0,useNativeDriver: true, })
       ]).start()
      
      }

  render() {

    const {user, loggedIn,allCollegues, loading, userInfo, posts, post}= this.props.auth

    const rot = this.state.opvalue.interpolate({
      inputRange:[0,1],
      outputRange:['0deg', '1080deg']
    })
    
    
    let bgcolor;
    let textcolor;
    let cardcolor;
    let bordercolor;
    if(this.props.auth.nightmode == true){
      bgcolor= '#303030'
      textcolor= '#fff'
     cardcolor='#424242'
     bordercolor='#fff'
    } else {
      bgcolor= '#fff'
      textcolor= '#333'
     cardcolor='#fff'
     bordercolor='#333'
    }
    const HEADER_FIRST_HEIGHT = HEIGHT_MIN/5
  const HEADER_LAST_HEIGHT = HEIGHT_MIN/10

  const opacity = this.state.scrollY.interpolate({
    inputRange:[0, ( HEADER_FIRST_HEIGHT-HEADER_LAST_HEIGHT)],
    outputRange:[0, 1],
    extrapolate:'clamp'
  })
  const headerRadius = this.state.scrollY.interpolate({
    inputRange:[0, HEADER_FIRST_HEIGHT-HEADER_LAST_HEIGHT],
    outputRange:[HEIGHT_MIN, HEIGHT_MIN-(HEIGHT_MIN/2)],
    extrapolate:'clamp'
  })
 
  const inputMargin = this.state.scrollY.interpolate({
    inputRange:[0, HEADER_FIRST_HEIGHT-HEADER_LAST_HEIGHT],
    outputRange:[-(HEIGHT_MIN*2/1.06), -(HEIGHT_MIN*2/1.0455)],
    extrapolate:'clamp'
  })

    if(loading){
      return(
        <View style={{flex: 1, justifyContent:'center',alignItems:'center', backgroundColor:bgcolor}}>
          <Spinner color={'#0073ff'} size={50} type={"ThreeBounce"}/>
          

        </View>
      )

    } 
    else if(this.state.connection == false){
      <View style={{alignItems:'center', justifyContent:'center',flex:1}}>
      <FontAwesomeIcon name='frown' size={44}/>
     <Text style={{textAlign:'center',marginTop:6, fontSize:22, fontFamily:'Quicksand-Medium'}}>No Internet</Text>
   </View>
    }

    const  url= 'https://play.google.com/store/apps/details?id=com.colleaguehub_client'

    let followingPost;
    if(posts && posts.length !== undefined){
    followingPost= posts.filter(post=> {
      
      followingUserdata = userInfo.following.map(data=> {
        console.log('data is ',data)
        return data.userdata
      })
      console.log('following userdata=', followingUserdata)

        if(followingUserdata.includes(post.userdata) ){
          console.log('post exists!')
            return true
        } else {
          console.log('no post exists!')
            return false
        }
    });
    }  else {
     followingPost = null
    }

    // let myposts;
    // if(followingPost == null || 0){
    //   myposts = null
    // } else {
    //   if(followingPost.length>0){
    //     myposts = (
    //       <FlatList
    //         data={followingPost}
    //         keyExtractor={post=> post.date}
    //         renderItem={({item, index}) => this._renderItem(item, index)}
    //       />
    //     )
    //   }  else{
    //     <Text>No post</Text>
    //   }
    // } 


    return (
      <View style={{flex:1, backgroundColor:bgcolor}}>
         <View style={{flexDirection:'row',alignContent:'center', justifyContent:'space-around',marginTop:15,
        }}>
              <TouchableOpacity activeOpacity={0.8}  onPress={()=> {
                this.props.navigation.navigate('PostScreen')
              this.props.setLoading()
              }}
                 style={{borderColor:bordercolor, borderWidth:0.7, borderRadius:30, height:50, marginBottom:20,backgroundColor:cardcolor,alignContent:'center', justifyContent:'center',marginHorizontal:10,}}>
                <Text style={{textAlign:'left',paddingLeft:20,paddingRight:20, color:textcolor, fontFamily:'Quicksand-Medium', fontSize:16}}>Hey {user.first_name}, Post something here...</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.88}
                onPress={()=> {
                  this._rotateRefresh()
                  this.props.getposts(this.state.token, this.state.myActiveGroups)
                }}
                 style={{alignItems:'center',height:50, width:50, justifyContent:'center', borderRadius:25,}}>
                <LinearGradient colors={['#00aaff', '#0073ff']} style={{width:100+'%', height:100+'%', borderRadius:25, alignItems:'center', justifyContent:'center'}}  start={{x: 0.2, y: 0.2}} end={{x: 0.6, y: 0.6}} >
                <Animated.View  style={{transform: [{rotate: rot}], }}>
                <FontAwesomeIcon name="redo-alt" color="#fff" size={25}/>
                </Animated.View>
               
                </LinearGradient>
          
              </TouchableOpacity>
              </View>
       
      
        <FlatList
              data={followingPost}
             ListEmptyComponent={()=> {
              return(
                <View  style={{backgroundColor:bgcolor, flex:1}}>
                    
                <Text style={{  color:textcolor,
                fontSize: TEXTSIZE/28,
                flex:1,
                textAlign:'center',
                fontFamily:'Quicksand-Regular'}}>No post found...</Text>
                 <TouchableOpacity activeOpacity={0.8} onPress={()=> this.onClick(url)} style={{marginTop:10, marginBottom:HEIGHT_MIN*2,margin:'auto',alignItems:'center', justifyContent:'center',padding:3, alignSelf:'center', overflow:'hidden',}}>
                <LinearGradient colors={['#00aaff', '#0073ff']} style={{borderRadius:11}}  start={{x: 0.2, y: 0.2}} end={{x: 0.6, y: 0.6}} >
                <Text style={{color:'#fff', padding:6,fontSize:14,textAlign:'center', fontFamily:'Quicksand-Bold'}}>Share the app</Text>
                </LinearGradient>
                
              </TouchableOpacity>
                </View>
              )     
            }}
              renderItem={({item, index}) => this._renderItem(item, index)}
              
              initialNumToRender={2}
              keyExtractor={(item, index)=> index.toString()}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            
             
              onEndReached={this.handleRefresh}
              onEndReachedThreshold={0}
          />
      </View>
    )
  }
}

const mapStateToProps = (state)=> {
    return {
      auth: state.auth
    }
  }
  
  export default connect(mapStateToProps, {getAllUsers,setLoading, getSingleUser,getposts,setMyActiveGroups, addpost, addlike,setMyGroups, addcomment, getSinglePost})(withNavigation(Following))
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      alignItems: 'center',
      justifyContent: 'center',
    },
    name:{
     
      fontFamily:'Quicksand-Bold',
      fontSize:TEXTSIZE/23,
      paddingLeft:8
     
    },
    posttext: {
     
      fontSize: TEXTSIZE/27,
      
       paddingLeft:1,
      fontFamily:'Quicksand-Medium'
    
    }
  });