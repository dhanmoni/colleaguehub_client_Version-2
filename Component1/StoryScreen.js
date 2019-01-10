import React, { Component } from 'react'
import { StyleSheet, Text, View ,Image,Dimensions,FlatList,TouchableOpacity, AsyncStorage, NetInfo, TouchableWithoutFeedback, Animated, Easing, ScrollView, Share, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import base64 from 'react-native-base64'
import {  Card, CardItem, Left, Item, Input  } from 'native-base';
import {connect} from 'react-redux'
import { getposts, addpost, addlike, addcomment, getSinglePost} from '../redux/actions/postAction'
import {getAllUsers, getSingleUser, } from '../redux/actions/profileAction'
import Spinner from 'react-native-spinkit'
let HEIGHT_MIN = Dimensions.get('window').height;
let WIDTH_MIN = Dimensions.get('window').width;
const TEXTSIZE = Dimensions.get('window').width ;
const ACCESS_TOKEN = 'Access_Token'
import Moment from 'react-moment';
import moment from 'moment'
import {BannerView} from 'react-native-fbads'
//const WIDTH_LEFT = WIDTH_MIN -((WIDTH_MIN/2.3)*2)
//const PADDING_WIDTH = WIDTH_LEFT /3.89999
import axios from 'axios';
class StoryScreen extends Component {
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
     
    
    }
  }
  async componentDidMount() {
   
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    if(token){
      console.log( 'token in storyscreen is ', token)
      this.setState({token: token}, ()=> {
        this.props.getposts(this.state.token,this.props.auth.userInfo.institution)
      });

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
  _renderItem = (item, index, rot2)=> {
    const postdate = moment(item.date).format('MMM Do, h:mm a');
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
    <View style={{backgroundColor:bgcolor}}>
    <View 
    style={{height:undefined,width: undefined,marginBottom:HEIGHT_MIN/40,paddingHorizontal:10, backgroundColor:bgcolor}}
    >
      <Card style={{borderRadius:10, elevation:4 , backgroundColor:cardcolor}}>
              <CardItem  style={{height:undefined,width: undefined,borderTopLeftRadius: 10, borderTopRightRadius: 10, flexDirection:'row',backgroundColor:cardcolor,borderBottomWidth:0.5, borderBottomColor:'#888' }}> 
                    <View style={{flexDirection:'row'}}>
                      <View style={{ }}>
                       <Image source={{uri: item.profileImage}}  resizeMode="cover"
                    style={{height:  (HEIGHT_MIN/14) ,width: (HEIGHT_MIN/ 14), borderRadius:(HEIGHT_MIN/5), marginLeft:4, marginTop:1, marginBottom:1, borderColor:'#999', borderWidth:2}}/> 
                    </View>
                    <View style={{flexDirection:'row', width:79+'%',}}>
                   
                        <TouchableOpacity style={{flexDirection:'column', justifyContent:'center'}} activeOpacity={0.99} onPress={()=> {
                        this.props.getSingleUser(item.userdata, this.state.token)
                        this.props.navigation.navigate('ProfileItem')
                      }}>
                      <View style={{marginRight:20,}}> 
                        <Text numberOfLines={1} style={[styles.name, {color:textcolor}]}>{item.name}</Text>
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
                        <CardItem style={{height:undefined, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, margin:0, padding:0, backgroundColor:cardcolor}}>
                        <Text style={[styles.posttext, {color:textcolor}]}>{item.text}</Text>
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
                    <CardItem style={{borderTopWidth:0.5,borderTopColor:'#888',marginTop:3, padding:0,backgroundColor:cardcolor,flexDirection:'row',flex:1, justifyContent:'flex-start',borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
                       <View style={{flexDirection:'row',backgroundColor:cardcolor, alignItems:'center', marginRight:15,marginLeft:8 }}>
                       <TouchableOpacity onPress={()=> {
                         this._rotateLike(item)
                         this.props.addlike(item, this.state.token)
                         }} activeOpacity={1} style={{marginRight:8,marginLeft:8, paddingLeft:10, paddingRight:10, paddingTop:5, paddingBottom:5}}>

                        <Animated.View style={{transform: [{rotate: rot2}], }}>
                         <Icon  name="heart" size={18} 
                          color={this.findUserLike(item.likes) ? '#f70000':'#aaa'}
                          />
                         </Animated.View>


                       </TouchableOpacity>
                      <View>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{ 
                          this.props.getSinglePost(item._id, this.state.token)
                          this.props.navigation.navigate('LikesPage')}} 
                          style={{marginRight:10, borderColor:'#fff',marginLeft:1,padding:5, flex:1}}>
                        <View>
                        <Text style={{color:textcolor,textAlign:'center',flex:1}}>{item.likes ? (item.likes.length):(0)}</Text>

                        </View>
                       </TouchableOpacity>
                       </View>
                       </View>
                       <View style={{backgroundColor:cardcolor}}>
                       <TouchableOpacity style={{flexDirection:'row',backgroundColor:cardcolor, alignItems:'center', marginRight:15,marginLeft:8, paddingLeft:10,paddingBottom:5,paddingTop:5, paddingRight:10}} activeOpacity={1} onPress={()=>{
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

     handleRefresh = ()=> {
        this.setState({
          refreshing: true,
         
        },()=> {

          this.props.getposts(this.state.token, this.props.auth.userInfo.institution)
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
    
    render() {
      const {user, loggedIn,allCollegues, loading, userInfo, posts, post}= this.props.auth

      const rot = this.state.opvalue.interpolate({
        inputRange:[0,1],
        outputRange:['0deg', '720deg']
      })
      const rot2 = this.state.springvalue.interpolate({
        inputRange:[0,1],
        outputRange:['0deg', '720deg']
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

      if(loading){
        return(
          <View style={{flex: 1, justifyContent:'center',alignItems:'center', backgroundColor:bgcolor}}>
            <Spinner color={'#4776e6'} size={50} type={"ThreeBounce"}/>
            

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

    return (
      <View style={{flex:1,backgroundColor:bgcolor }}> 
       <View style={{flex:1,backgroundColor:'transparent',flexDirection: 'row'}}>
       <StatusBar
          backgroundColor='#2B32B2'
          barStyle="light-content"
        />
          
          <LinearGradient  colors={['#1488CC', '#2B32B2']} style={{width: 100 + '%', height: 100 +'%',}}  start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
           <View style={{flexDirection:'row', alignItems:'center',width: 100 + '%', height: 100 +'%',alignSelf: 'center'}}>
               
               <Text style={{color:'white',flex:1 ,textAlign: 'center',fontSize: 32 ,backgroundColor: 'transparent', fontFamily:'Quicksand-Bold'}}>ColleagueHub</Text>
               <View  style={{position:'absolute', right:20, alignItems:'center',}}>
             <Icon onPress={()=> this.props.navigation.navigate('Settings')} name='plus' size={29} color='white'/>
           </View>
           </View>
          
 
         </LinearGradient> 
         </View>
          
       <View style={{ flex:10,}}>
       <ScrollView style={{flex:1}}>
         <TouchableOpacity activeOpacity={0.8}  onPress={()=> this.props.navigation.navigate('PostScreen')}
          style={{alignContent:'center', justifyContent:'center',marginTop:15, borderWidth:0.7, borderRadius:30, height:50, marginBottom:20,backgroundColor:cardcolor,borderColor:bordercolor,
        marginHorizontal:10
        }}>
         <Text style={{textAlign:'left',paddingLeft:10, color:textcolor, fontFamily:'Quicksand-Medium', fontSize:16}}>Hey {user.first_name}, Post something here...</Text>
         </TouchableOpacity>
         
       
      
          <FlatList
              data={posts}
             ListEmptyComponent={()=> {
              return(
                <View  style={{backgroundColor:bgcolor, flex:1}}>
                    
                <Text style={{  color:textcolor,
                fontSize: TEXTSIZE/28,
                flex:1,
                textAlign:'center',
                fontFamily:'Quicksand-Regular'}}>No post found...</Text>
                </View>
              )     
            }}
              renderItem={({item, index}) => this._renderItem(item, index, rot2)}
              
              initialNumToRender={2}
              keyExtractor={(item, index)=> index.toString()}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            ListFooterComponent={()=> {
              return(
                <TouchableOpacity activeOpacity={0.8} onPress={()=> this.onClick(url)} style={{backgroundColor:'#2b32b2',marginTop:10, marginBottom:10,width: 40+'%',margin:'auto',alignItems:'center', justifyContent:'center', alignSelf:'center', borderRadius:10}}>
                <Text style={{color:'#fff', padding:10,fontSize:14,textAlign:'center', fontFamily:'Quicksand-Bold'}}>Share the app</Text>
              </TouchableOpacity>
              )
             
            }}
             
              onEndReached={this.handleRefresh}
              onEndReachedThreshold={0}
          />
         </ScrollView>
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

export default connect(mapStateToProps, {getAllUsers, getSingleUser,getposts, addpost, addlike, addcomment, getSinglePost})(StoryScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  name:{
    marginLeft:10,
   
    fontFamily:'Quicksand-Bold',
    fontSize:TEXTSIZE/22,
   
  },
  posttext: {
   
    fontSize: TEXTSIZE/24,
    marginLeft:3,
     padding:4,
    fontFamily:'Quicksand-Medium'
  
  }
});



//one: #5AB7EF;
//two:#5472F0