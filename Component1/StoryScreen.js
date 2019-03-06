import React, { Component } from 'react'
import { StyleSheet, Text, View ,Image,Dimensions,FlatList,TouchableOpacity, AsyncStorage, NetInfo, TouchableWithoutFeedback, Animated, Easing, ScrollView, Share, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'

import base64 from 'react-native-base64'
import {  Card, CardItem, Left, Item, Input , Tab, TabHeading, Tabs, } from 'native-base';
import {connect} from 'react-redux'
import { getposts, addpost, addlike, addcomment, getSinglePost} from '../redux/actions/postAction'
import {getAllUsers, getSingleUser,setMyGroups, setMyActiveGroups , setLoading} from '../redux/actions/profileAction'
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
import AllPosts from '../Component5/allPosts'
import Following from '../Component5/followingPost'

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
    console.log('token..',token)


    
    console.log(this.state.myGroups)
    if(token){
      console.log( 'token in storyscreen is ', token)
      this.setState({token: token}, ()=> {
        //this.props.getposts(this.state.token,this.state.myActiveGroups)
       // this.props.setMyGroups(this.state.myGroups)
        //this.props.setMyActiveGroups(this.state.myActiveGroups, this.state.token)

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
 


     handleRefresh = ()=> {
        this.setState({
          refreshing: true,
         
        },()=> {

          this.props.getposts(this.state.token, this.props.auth.myActiveGroups)
         return (
           this.setState({
             refreshing:false
           })
         )
        }
        )
      }

    
    
    render() {
      const {user, loggedIn,allCollegues, loading, userInfo, posts, post}= this.props.auth

      const rot = this.state.opvalue.interpolate({
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

    return (
      <View style={{flex:1,backgroundColor:bgcolor,  }}> 
        <StatusBar
          backgroundColor='#0073ff'
          barStyle="light-content"
        />
       <View style={{backgroundColor:'transparent',flexDirection: 'row', height: HEIGHT_MIN/10, width:WIDTH_MIN, borderBottomLeftRadius:15, borderBottomRightRadius:15,overflow:'hidden'}}>
         <LinearGradient  colors={['#00c6ff', '#0073ff']} style={{width: 100 + '%', height: 100 +'%',}}  start={{x: 0.2, y: 0.2}} end={{x: 0.6, y: 0.6}} >
           <View style={{flexDirection:'row', alignItems:'center',width: 100 + '%', height: 100 +'%',justifyContent:'space-between', paddingHorizontal:20}}>
           <Animated.View style={{opacity: 1 }}>
              <Icon name="filter" size={24} style={{}} color="#fff" />
              </Animated.View>
               <Text style={{color:'white',flex:1 ,textAlign: 'center',fontSize: 27 ,backgroundColor: 'transparent', fontFamily:'Quicksand-Bold'}}>ColleagueHub</Text>
               <Animated.View style={{opacity:opacity, }}>
              <Icon name="plus" size={24} style={{}} color="#fff" onPress={()=> {
                this.props.navigation.navigate('PostScreen')
                this.props.setLoading()
                }}/>
              </Animated.View>
           </View>
          
 
         </LinearGradient> 
         </View>
        
          
       <View style={{ }}>
       <ScrollView 
            scrollEventThrottle={16}
            style={{ marginTop:10,backgroundColor:bgcolor, paddingBottom:HEIGHT_MIN/3,}}
              onScroll={Animated.event([{
                nativeEvent: {contentOffset:{y: this.state.scrollY}}
              }])}>
             
              <Tabs style={{marginBottom:30}}
              
              tabBarUnderlineStyle={{ backgroundColor:'#0073ff',height:3 }}>
          <Tab  heading={
                  <TabHeading style={{backgroundColor:bgcolor}}>
                    <Text style={{ fontFamily: 'Quicksand-Bold', color:textcolor,fontSize:18 }}>All</Text>
                  </TabHeading>} >
            <AllPosts />
          </Tab>
          <Tab  heading={
                  <TabHeading style={{backgroundColor:bgcolor}}>
                    <Text style={{ fontFamily: 'Quicksand-Bold', color:textcolor,fontSize:18 }}>Following</Text>
                  </TabHeading>} >
            <Following />
           
          </Tab>
         
        </Tabs>
         
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

export default connect(mapStateToProps, {getAllUsers, getSingleUser,getposts,setMyActiveGroups, addpost, addlike,setMyGroups, addcomment, getSinglePost, setLoading})(StoryScreen)

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



//one: #5AB7EF;
//two:#5472F0