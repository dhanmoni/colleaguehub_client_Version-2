import React, { Component } from 'react'
import { StyleSheet, Text, View ,Image,Dimensions,ScrollView,FlatList, ActivityIndicator,TouchableOpacity,StatusBar, AsyncStorage, NetInfo ,Animated , ToastAndroid, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5'

import {  Card, CardItem, Left,  } from 'native-base';
import {connect} from 'react-redux'
import {getAllUsers, getSingleUser, getAllCollegues, starProfile2,unstarProfile,unstarProfile2, starProfile} from '../redux/actions/profileAction'
import Spinner from 'react-native-spinkit'
import { withNavigation } from 'react-navigation';
import {BannerView} from 'react-native-fbads'
let HEIGHT_MIN = Dimensions.get('window').height;
let WIDTH_MIN = Dimensions.get('window').width;
const TEXTSIZE = Dimensions.get('window').width ;
const ACCESS_TOKEN = 'Access_Token'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
const WIDTH_LEFT = WIDTH_MIN -((WIDTH_MIN/2.3)*2)
const PADDING_WIDTH = WIDTH_LEFT /3.89999

class Profiles extends Component {
  

  constructor(){
    super();
    this.state={
      token:'',
     status:false,
      refreshing:false,
      myGroups:[],
      myActiveGroups:[],
      myTempActiveGroups:[]
    }
  }
  async componentDidMount() {

        const token = await AsyncStorage.getItem(ACCESS_TOKEN)
        await this.props.auth.userInfo.activeGroup.filter(name=> {
          this.state.myActiveGroups.push(name.institution_name)
        })
    if(token){
      this.setState({
        token
      })
      const names = this.props.auth.userInfo.institution.filter(name=> {
        this.state.myGroups.push(name.institution_name)
      })


      NetInfo.isConnected.addEventListener('connectionChange', await this.handleConnectionChange);

       this.props.getAllCollegues(this.state.token, this.state.myActiveGroups)
       console.log(this.state.myTempActiveGroups)
       this.props.getAllUsers()    
     
    }
  
    
 }

  
  componentWillUnmount() {
      NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }
  
  
  
  handleConnectionChange = (isConnected) => {
          if(isConnected){
            this.setState({status: true}, ()=> {
              return(
                <View>
                  <Text>You are online</Text>
                </View>
              )
            })
           
          } else if(isConnected == false ){
            this.setState({
              status: false
            }, ()=> {
              return (
                <View><Text>You are offline</Text></View>
              )
            })
            
          } else {
            this.setState({status: false}, ()=> {
              return(
                <View>
                  <Text>Opps!</Text>
                </View>
              )
            })
           
          } 
  }

  
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };

  findFollow(item){
    console.log('item', item)
    
    if(item){
     
      if (item.stars.filter(like => like.userdata == this.props.auth.user._id).length >0) {
        console.log('yes')
        return true
      } else {
        console.log('no')
        return false
      }
    }
    
   }
   deletebutton(item) {
   
    // Alert.alert(
    //   'Unfollow ?',
    //   'Are you sure to unfollow this user ?'
    //   [
        
    //     {text: 'Cancel', onPress: () =>{}},
    //     {text: 'Unfollow', onPress: () => alert(item.name)}
    //   ],
    //   { cancelable: true }
    // )
    //
    //console.log('item is ',item)
    Alert.alert(
      'Unfollow ?',
      'Do you want to unfollow '+item.name+' ?',
      [
       
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Unfollow', onPress: () => {
          ToastAndroid.show('Unfollowed', ToastAndroid.SHORT)
          this.props.unstarProfile2(item.userdata, this.state.token, this.state.myActiveGroups)
          this.props.unstarProfile(item.userdata, this.state.token, this.state.myActiveGroups)
        }},
      ],
      {cancelable: true},
    );
  }
 

  _renderItem = ({item, index})=> {
    let bgcolor;
    let textcolor;
    let cardcolor;
    let follow_color;
    let icon_color;
    if(this.props.auth.nightmode == true){
      bgcolor= '#303030'
      textcolor= '#fff'
     cardcolor='#424242'
     follow_color='#fff'
     icon_color="#fff"
    } else {
      bgcolor= '#fff'
      textcolor= '#333'
     cardcolor='#fff'
     follow_color='#323232'
     icon_color="#0073ff"
    }

    // let follow_unfollow =(
      
        
    //    )

      
    
   
    return (
     <View>
   <View>
    <TouchableOpacity 
    activeOpacity={0.9}
                
    onPress={
     async ()=>{
       await this.props.getSingleUser(item.userdata, this.state.token)
       if(this.state.token == null || undefined || ''){
         alert('Opps! Something went wrong!')
       } else {
       await this.props.navigation.navigate('ProfileItem')
       }
      }}
    style={{height:undefined,width: undefined,marginBottom:HEIGHT_MIN/50,}}
    >
                <Card style={{borderRadius:20, width:100+'%', backgroundColor:cardcolor,marginHorizontal:5, overflow:'hidden'}}>
                    
                    <CardItem cardBody style={{height:(WIDTH_MIN/2.8),width: undefined,borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor:cardcolor, flexDirection:'row',}}> 
                    <View style={{position:'absolute', bottom:4,flex:1, right:9,padding:5, zIndex:1000}}>
                      
                    <Menu
                    
                      ref={this.setMenuRef}
                      button={<Icon onPress={this.showMenu} name='ellipsis-h' size={18} style={{color:icon_color,padding:5, flex:1}}/>}
                    >
                      <MenuItem textStyle={{color:'#333' ,fontFamily:'Quicksand-Medium',fontSize: 16,}} >Report</MenuItem>
                      <MenuItem textStyle={{color:'#333', fontFamily:'Quicksand-Medium',fontSize: 16,}}>Block</MenuItem>
                      
                     
                    </Menu>
                    </View>
                    
                      <Image source={{uri: item.profileImage}}  resizeMode="cover"
                        style={{height:  (WIDTH_MIN/2.8) ,width: (WIDTH_MIN/2.8),borderTopLeftRadius: 20,borderBottomLeftRadius:20}}/> 
                        <View style={{backgroundColor:cardcolor,width:WIDTH_MIN-(WIDTH_MIN/2.7), paddingLeft:10,  }}>
                        <Text numberOfLines={2} style={ { fontSize: TEXTSIZE/24,fontFamily:'Quicksand-Bold', color:textcolor, marginRight:7}}>{item.name}</Text> 
                        <Text numberOfLines={1} style={ { fontSize: TEXTSIZE/29,fontFamily:'Quicksand-Medium', color:textcolor, marginRight:7}}>{item.residence}</Text> 
                        <View style={{}}>
                        <Text style={{fontSize:13,fontFamily:'Quicksand-Medium', color:follow_color, paddingTop:5 }}>{item.stars.length} follower(s)</Text>
                        <View>
                          {
                            item.userdata == this.props.auth.userInfo.userdata ? (
                              <View></View>
                            ): (
                              <View>
                                 {
                             this.findFollow(item) ? (
                              <TouchableOpacity activeOpacity={0.8} onPress={()=> {
                                
                                this.props.getSingleUser(item.userdata, this.state.token)
                               this.deletebutton(item)
                                
                                }} style={{ width:30+'%', paddingTop:8}}>
                          
                              <LinearGradient colors={['#c4d5d5', '#dcd4d4']} style={{borderRadius:11}}  start={{x: 0.2, y: 0.2}} end={{x: 0.6, y: 0.6}} >
                              <Text style={{color:'#fff', padding:3,fontSize:14,textAlign:'center', fontFamily:'Quicksand-Bold'}}>Following</Text>
                              </LinearGradient>
                              
                            </TouchableOpacity>
                            ):(
                              <TouchableOpacity activeOpacity={0.8} onPress={()=>
                               {
                                this.props.getSingleUser(item.userdata, this.state.token)
                                ToastAndroid.show('Following '+ item.name, ToastAndroid.SHORT)
                                this.props.starProfile2(item.userdata,  this.state.token, this.state.myActiveGroups)
                                 this.props.starProfile(item.userdata, this.state.token, this.state.myActiveGroups)}} style={{ width:30+'%', paddingTop:8}}>
                          
                              <LinearGradient colors={['#00aaff', '#0073ff']} style={{borderRadius:11}}  start={{x: 0.2, y: 0.2}} end={{x: 0.6, y: 0.6}} >
                              <Text style={{color:'#fff', padding:3,fontSize:14,textAlign:'center', fontFamily:'Quicksand-Bold'}}>Follow</Text>
                              </LinearGradient>
                              
                            </TouchableOpacity>
                            )
                        
                      
                        }
                        
                              </View>
                            )
                          }
                        </View>
                       
                        </View>
                           
                          
                        </View>
                            
                    </CardItem>
                    
                    {/* <CardItem style={{height: HEIGHT_MIN/19,backgroundColor:cardcolor, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
                        <Left style={{flex:1}}>
                           <Text numberOfLines={1} style={[styles.name, {color:textcolor}]}>{item.name}</Text> 
                        </Left>
                    </CardItem> */}
                   
                    </Card> 
    </TouchableOpacity>
    </View>
  
    </View>
   
   
  )}

      
 

      handleRefresh = ()=> {
        this.setState({
          refreshing: true,
         
        },()=> {

          this.props.getAllCollegues(this.state.token, this.state.myGroups)
         return (
           this.setState({
             refreshing:false
           })
         )
        }
        )
      }
    
    render() {
      const {user, loggedIn,allCollegues, userInfo}= this.props.auth


     
       if(this.state.status == false){
        <View style={{alignItems:'center', justifyContent:'center',flex:1}}>
        <Icon name='frown' size={44}/>
       <Text style={{textAlign:'center',marginTop:6, fontSize:22, fontFamily:'Quicksand-Medium'}}>No Internet</Text>
     </View>
      }
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

    return (
      <View style={{flex:1,backgroundColor:bgcolor }}> 
        <View style={{backgroundColor:'transparent',flexDirection: 'row', height: HEIGHT_MIN/10, width:WIDTH_MIN, borderBottomLeftRadius:15, borderBottomRightRadius:15,overflow:'hidden'}}>
         <LinearGradient  colors={['#00c6ff', '#0073ff']} style={{width: 100 + '%', height: 100 +'%',}}  start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
           <View style={{flexDirection:'row', alignItems:'center',width: 100 + '%', height: 100 +'%',justifyContent:'space-between', paddingHorizontal:20}}>
           
               <Text style={{color:'white',flex:1 ,textAlign: 'center',fontSize: 27 ,backgroundColor: 'transparent', fontFamily:'Quicksand-Bold'}}>My Colleague</Text>
               <Animated.View style={{opacity: 1 }}>
                <Icon name="filter" size={22} style={{}} color="#fff" />
                </Animated.View>
           </View>
          
 
         </LinearGradient> 
         </View>
          
       <View style={{marginTop:10, paddingBottom:70 }}>
      
          <FlatList
              data={allCollegues}
             ListEmptyComponent={()=> <View  style={{justifyContent:'center'}}>
             <Text style={{  color:'#333',
             fontSize: TEXTSIZE/28,
             flex:1,
             textAlign:'center',
             fontFamily:'Quicksand-Medium'}}>Your colleagues will appear here!</Text>
             </View>}
              renderItem={(item, index)=> this._renderItem(item, index)}
              extraData={this.props.auth}
              keyExtractor={(item, index)=> index.toString()}
              contentContainerStyle={styles.list}
              numColumns={1}
             refreshing={this.state.refreshing}
             onRefresh={this.handleRefresh}
             // onEndReached={()=> this.endreached(allCollegues, this.props.auth.allUsers)}
             // onEndReachedThreshold={0}
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

export default connect(mapStateToProps, {getAllUsers, getSingleUser, getAllCollegues, unstarProfile, unstarProfile2, starProfile, starProfile2})( withNavigation(Profiles))

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
// ListFooterComponent={()=>{
              //   if(allCollegues.length <=1){
              //     return(
                    
              //       <View style={{flexDirection:'row', marginTop:7, justifyContent:'center', paddingBottom:20, width:WIDTH_MIN}}>
              //       <View
              //        style={{marginTop:10,marginBottom:10, justifyContent:'center' }}>
                      
              //        <Text style={{fontFamily:'Quicksand-Medium',color:textcolor, fontSize:16, paddingHorizontal:10}}>No more colleagues found. Share this app with your friends to find more colleagues from your workplace</Text>
                     
              //       </View>
              //       </View>
              //     )
              //   }
               
              //     return(
              //       <View style={{flexDirection:'row', marginTop:7, justifyContent:'center', paddingBottom:20, width:WIDTH_MIN}}>
                   
              //       </View>

              //     )

                
              //   } }


//one: #5AB7EF;
//two:#5472F0