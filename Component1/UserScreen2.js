
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity,ActivityIndicator,ToastAndroid, Image, Dimensions,ImageBackground,StatusBar, ScrollView,TextInput, Button, Alert, AsyncStorage, FlatList, NetInfo, Easing, Animated,TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux'
import { Container, Header, Content, Card, CardItem, Right, Item, Input, CheckBox, Tab, Tabs , TabHeading} from 'native-base';
import SelectMultiple from 'react-native-select-multiple'

import Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { deletepost, getposts, addlike, addcomment, getSinglePost} from '../redux/actions/postAction'
import { updateProfileImage,updateProfileImage2, getSingleUser,updateUserBio,setMyGroups, setMyActiveGroups, hideBio, hideSkills, showBio, deleteInstitution, addPublicInstitution, setCurrentProfileWithPrivateInstitution, setCurrentProfileWithPublicInstitution } from '../redux/actions/profileAction'
import {deleteAuthUser, nightmodeon, nightmodeoff} from '../redux/actions/authAction'
import Modal from 'react-native-modal'
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-spinkit'
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const HEIGHT_MIN = Dimensions.get('window').height;
const WIDTH_MIN = Dimensions.get('window').width;
import MultiSelect from 'react-native-multiple-select';
import PublicGroup from '../Component3/PublicGroup';
import PrivateGroup from '../Component3/PrivateGroup'
import { Madoka } from 'react-native-textinput-effects';

const TEXTSIZE = Dimensions.get('window').width ;
const ACCESS_TOKEN = 'Access_Token'


import moment from 'moment'
import { BannerView } from 'react-native-fbads';

import ImagePicker from 'react-native-image-picker';
import { Switch } from 'react-native-switch';
import SlidingUpPanel from 'rn-sliding-up-panel'

const {height} = Dimensions.get('window')



class UserScreen2 extends Component {
  static defaultProps = {
    draggableRange: {
      top: height - ((HEIGHT/1.6)/7),
      bottom: height/2.7
    }
  }
  static navigationOptions = {
    header: null, 
  }

  _draggedValue = new Animated.Value(-(height/2.7))

  constructor(props) {
    super(props)
    this.state = {
        allowDragging: true,
        token:'',
        text:'', 
        public_institution_name:'',
         private_institution_name:'',
         password:'',
         public_description:'',
         private_description:'',
        connection: true,
        bio:'',
        hideBio: true,
        springvalue: new Animated.Value(0),
        scrollY: new Animated.Value(0),
        response:null,
        nightmode: false,
        isModal1Visible: false,
        isModalVisibleBio: false,
        isModalVisibleAddGroup:false,
        myGroups:[],
        myActiveGroups:[],
        groupsNames:[],
        selectColor:"#fff",
        suggestions:[],
       insname:[],
       hideModel:true
       
    }
    //this._renderFavoriteIcon = this._renderFavoriteIcon.bind(this)
    
  }

  async componentDidMount() {
   
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
     this.props.auth.userInfo.institution.filter(name=> {
      this.state.myGroups.push(name)
    })

    await this.props.auth.userInfo.activeGroup.filter(name=> {
      this.state.myActiveGroups.push(name)
    })
   
     this.props.auth.userInfo.activeGroup.filter(name=> {
      this.state.groupsNames.push(name.institution_name)
      console.log('grp= ',this.state.groupsNames)
     })
     const institutions = this.props.auth.allGroups.map(group=> {
      return group.institution_name
    })
    

    if(token){
      console.log( 'token in user screen is ', token)
      
      this.setState({token: token, suggestions: institutions}, ()=> {
       // this.setState({myActiveGroups: this.props.auth.userInfo.activeGroup})
      this.props.setMyActiveGroups(this.state.myGroups, this.state.token)
       // this.props.setMyGroups(this.state.myGroups)
        console.log('state .. ',this.state)
        this.props.getposts(this.state.token,this.state.myActiveGroups )
        this.setState({bio: this.props.auth.userInfo.bio, hideBio: this.props.auth.hideBio})
        
      });
   

    }
    NetInfo.isConnected.addEventListener('connectionChange', await this.handleConnectionChange);

    
  }

  
  onTextChanged=(text)=>
  { 
    this.setState({public_institution_name:text, hideModel:false})
    let insname = []
    if(text == null){
      return null
    } else {
      if(text.length > 0){
        insname = this.state.suggestions.sort().filter((item)=>{
          return item.toLowerCase().indexOf(text.toLowerCase()) !== -1
      })
      }
    this.setState(()=> ({insname}))
   
    }
    
  }

    renderSuggestions = (suggestions)=> {
    if(this.state.insname && this.state.insname.length ==0) {
      return null
    }
    else if(this.state.hideModel==false){
      return(
        <FlatList
        
        data={suggestions}
      keyExtractor={(item)=> item.toString()}
        renderItem={({item}) => <View>{item}</View>}
    /> 
      )
      
    } else {
      return null
    }
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
 

  hideBio = (hideBio)=> {
    if(hideBio == false){
      this.props.hideBio()
      this.setState({
        hideBio:true
      })
      
      
    } else {
      this.props.showBio()
      this.setState({
        hideBio:false
      })
     
    }}
  


  _renderItem = (item, index)=> {

    
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
    const rot2 = this.state.springvalue.interpolate({
      inputRange:[0,1],
      outputRange:['0deg', '720deg']
    })
    const postdate = moment(item.date).format('D MMM, h:mma');
    return (  
    <View>
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
            <CardItem  style={{height:undefined,width: undefined, flexDirection:'row',backgroundColor:cardcolor,borderBottomWidth:0.5, borderBottomColor:'#888' }}> 
            <View>
            <TouchableOpacity activeOpacity={0.9} onPress={()=> {}} style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={{overflow:'hidden',alignItems:'center', justifyContent:'center' }}>
                        <LinearGradient  colors={['#00c6ff', '#0073ff']} style={{height:  (HEIGHT_MIN/14) ,width: (HEIGHT_MIN/ 14), borderRadius:(HEIGHT_MIN/5),overflow:'hidden', justifyContent:"center", alignItems:'center'}}  start={{x: 0.2, y: 0.2}} end={{x: 0.6, y: 0.6}}>
                        <Image source={{uri: this.props.auth.userInfo.profileImage}}  resizeMode="cover"
                            style={{height: (HEIGHT_MIN/14)-5, width: (HEIGHT_MIN/14)-5,alignSelf:'center', borderRadius: HEIGHT_MIN/5, justifyContent:'center'}}/>
                        </LinearGradient>
                           
                        </View>
                   
                   
                        <View style={{}}>
                                <Text numberOfLines={1} style={{color:textcolor, fontFamily:'Quicksand-Bold',
                                  fontSize:TEXTSIZE/23,
                                  paddingLeft:8 }}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                        {
                          item.text ? (
                            <View style={{height:undefined,paddingLeft:5,}}>
                            
                            <Text style={ {color:textcolor, fontSize: TEXTSIZE/27, paddingLeft:1,fontFamily:'Quicksand-Medium'}}>{item.text}</Text>
                        </View> 
                          ) : (
                            null
                          )
                        }
              </View>
                      
                     
                  </CardItem>
                  
                
                        <View style={{marginTop:3, padding:5,backgroundColor:cardcolor,flexDirection:'row',flex:1, justifyContent:'space-around',borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
                            <View style={{flexDirection:'row', alignItems:'center',justifyContent:"center", paddingLeft:10,paddingBottom:2,paddingTop:2, paddingRight:10 }}>
                            <TouchableOpacity onPress={()=> {
                              this._rotateLike(item)
                              this.props.addlike(item, this.state.token)
                              }} activeOpacity={1} style={{ paddingRight:15,paddingLeft:8,}} >
                              
                              <Animated.View style={{transform: [{rotate: rot2}], }}>
                              <FontAwesome  name="heart" size={18} 
                                color={this.findUserLike(item.likes) ? '#f70000':'#aaa'}
                                />
                              </Animated.View>


                            </TouchableOpacity>
                            <View style={{alignItems:'center', justifyContent:'center'}}>
                                  <TouchableOpacity activeOpacity={0.8} onPress={()=>{ 
                                    this.props.getSinglePost(item._id, this.state.token)
                                    this.props.navigation.navigate('LikesPage')}} 
                                    style={{paddingRight:10, borderColor:'#fff',paddingLeft:1,alignItems:'center',justifyContent:'center',}}>
                                        <View>
                                        <Text style={{color:textcolor,textAlign:'center'}}>{item.likes ? (item.likes.length):(0)}</Text>

                                        </View>
                                  </TouchableOpacity>
                            </View>
                       </View>
                       <View style={{alignItems:'center', justifyContent:'center'}}>
                       <TouchableOpacity style={{flexDirection:'row', alignItems:'center', paddingBottom:2,paddingTop:2, paddingRight:10}} activeOpacity={1} onPress={()=>{
                        //  alert(item._id)
                         
                         this.props.getSinglePost(item._id, this.state.token)
                         this.props.navigation.navigate('CommentPage')
                         }} >
                       <FontAwesome name="comments"  size={18} color='#aaa'/>
                       <View style={{ borderColor:'#fff',paddingLeft:5}}>
                       <Text style={{color:textcolor,textAlign:'center',}}>{item.comments ? (item.comments.length):(0)}</Text>
                       </View>
                       </TouchableOpacity>
                      

                       </View>
                         <View style={{alignItems:'center', justifyContent:'center', padding:2}}>
                      <Text style={{fontSize:TEXTSIZE/30, color:textcolor, marginLeft:10}}>{postdate}</Text>

                      </View> 
                      <View style={{alignItems:'center', justifyContent:'center', paddingRight:10}}>
                       <TouchableOpacity style={{}}  activeOpacity={0.9} onPress={()=>{ 
                  this.props.deletepost(item, this.state )
                  ToastAndroid.show('Deleting...', ToastAndroid.SHORT)
                  
                  }}>
                  
                   <Icon name="trash-alt" size={15} color="#ff0000"/>
              </TouchableOpacity>
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
      
    let bgcolor;
    let textcolor;
    let cardcolor;
    let iconcolor;
    let inputColor;
    
    if(this.props.auth.nightmode == true){
      bgcolor= '#303030'
      textcolor= '#fff'
      cardcolor='#424242'
      iconcolor='#fff'
      inputColor="#303030"
    } else {
      bgcolor= '#fff'
      textcolor= '#333'
      cardcolor='#fff'
      iconcolor='#002463'
      inputColor="#dcdfe4"
    }
    return (
      <View style={{flexDirection:"row", alignItems:'center'}}>
        <View style={{backgroundColor:textcolor, width:6, height:6,marginRight:5, borderRadius:3}}></View>
        <Text style={{fontFamily:'Quicksand-Medium',width:99+'%', fontSize:16,color:textcolor, padding:3}}>{item}</Text>
      </View>
    )
}

_renderskills= (item ,index)=> {
  
  return (
    <View style={{paddingBottom:3}}>
      <Text style={{fontFamily:'Quicksand-Medium', fontSize:16,color:'#333', padding:3}}>{item.title}</Text>
    </View>
  )
}
_renderGroups = (item, index)=> {
  return (
    <View style={{alignItems:'center',marginBottom:2, paddingHorizontal:10,padding:5, flexDirection:'row'}}>
     <View style={{marginRight:8}}>
    
    </View>
   
      <Text style={{fontFamily:'Quicksand-Bold',marginLeft:10, fontSize:19,}}>{item}</Text>
   
    </View>
  )
}

selectActiveGroup = (selectedItems) => {

   // this.state.myActiveGroups.push(selectedItems)
    console.log('selected..',selectedItems)
   //this.setState({myActiveGroups: value}, ()=> console.log(this.state.myActiveGroups))
 }
 

 _renderselectedGroups=(item, index)=> {
   
    <View style={{alignItems:'center'}}>
         <Text style={{fontSize:30, color:'#333'}}>{item}</Text>
    </View>
 }
 changeColor = ()=> {
   this.setState({
     selectColor: "#0073ff"
   })
 }
 
 

  render() {
    const {user, loggedIn, userInfo, getposts, posts,myGroups, nightmode, myActiveGroups}= this.props.auth;
    const {top, bottom} = this.props.draggableRange
    const banner = (HEIGHT/1.6)/5.5;
    const opacity = this._draggedValue.interpolate({
        inputRange: [bottom,  top-(banner*2)],
        outputRange: [1, 0],
        extrapolate: 'clamp'
      })
      const opacity3 = this._draggedValue.interpolate({
        inputRange: [bottom,  top-(banner*4)],
        outputRange: [1, 0],
        extrapolate: 'clamp'
      })
      const opacity2 = this._draggedValue.interpolate({
        inputRange: [bottom,bottom+banner, top-(banner*1.6)],
        outputRange: [0,0, 1],
        extrapolate: 'clamp'
      })
      const zIndex = this._draggedValue.interpolate({
        inputRange: [bottom,  top-(banner*2)],
        outputRange: [100,0],
        extrapolate: 'clamp'
      })
      const zIndex2 = this._draggedValue.interpolate({
        inputRange: [bottom,  top-(banner*2)],
        outputRange: [0,200],
        extrapolate: 'clamp'
      })
      const profileHeight = this._draggedValue.interpolate({
        inputRange: [bottom,bottom+banner , top-(banner*2)],
        outputRange: [0, 0,banner/1.4],
        extrapolate: 'clamp'
      })
      const widthOfName = this._draggedValue.interpolate({
        inputRange: [bottom, top-(banner*2)],
        outputRange: [WIDTH-banner/1.3,WIDTH-banner/0.7],
        extrapolate: 'clamp'
      })
      const marginRight = this._draggedValue.interpolate({
        inputRange: [bottom,bottom+banner , top-(banner*2)],
        outputRange: [0,2, 20],
        extrapolate: 'clamp'
      })
      const marginTop = this._draggedValue.interpolate({
        inputRange: [bottom, top-(banner*2)],
        outputRange: [height/2.7+40,0],
        extrapolate: 'clamp'
      })

      const icon = this._draggedValue.interpolate({
        inputRange: [bottom, top-(banner*2)],
        outputRange: [0,1],
        extrapolate: 'clamp'
      })
      const icon2 = this._draggedValue.interpolate({
        inputRange: [bottom, top-(banner*2)],
        outputRange: [1,0],
        extrapolate: 'clamp'
      })
      
const styles = {
  container: {
    flex: 1,
   // backgroundColor: '#fff',
    
  },
 
  panel: {
    flex: 1,
    zIndex:1000,
    backgroundColor: 'white',
    position: 'relative',
    borderTopLeftRadius:20,
    
    borderTopRightRadius:20
  },
  panelHeader: {
   
  },
  suggestions:{
    color:'black',
    fontSize:17,
    marginBottom:3,
    padding:10,
    fontFamily:'Quicksand-Meduim'},
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
 }
     
      const removeByAttr = function(arr, attr, value){
        let i = arr.length;
        while(i--){
           if( arr[i] 
               && arr[i].hasOwnProperty(attr) 
               && (arguments.length > 2 && arr[i][attr] === value ) ){ 
      
               arr.splice(i,1);
      
           }
        }
        return arr;
      }
      // const removeByAttr2 = function(arr, attr, value){
      //   let i = arr.length;
      //   while(i--){
      //      if( arr[i] 
      //          && arr[i].hasOwnProperty(attr) 
      //          && (arguments.length > 2 && arr[i][attr] === value ) ){ 
      
      //          arr.splice(i,1);
      
      //      }
      //   }
      //   return arr;
      // }

      let myPost;
      if(posts && posts.length !== undefined){
      myPost= posts.filter(post=> post.userdata == userInfo.userdata);
      }  else {
      return myPost = null
      }

      let myposts;
      if(myPost == null || myPost == 0){
        myposts = null
      } else {
        if(myPost.length>0){
          myposts = (
            <FlatList
              data={myPost}
              keyExtractor={post=> post.date}
              renderItem={({item, index}) => this._renderItem(item, index)}
            />
          )
        }  else{
          <Text>No post</Text>
        }
      }
      const myGroups2 = (
        <FlatList
              data={this.props.auth.myGroups}
              keyExtractor={group=> group}
              renderItem={({item, index}) => this._renderGroups(item, index)}
            />
           
      )
     
      let suggestions =  this.state.insname.map(item=> {
        return(
        <TouchableOpacity  style={{flex:1,}} onPress={()=> {
          this.setState({
            public_institution_name:item,
            insname:[]
          }, ()=> ToastAndroid.show(item, ToastAndroid.SHORT))
        }}>
           <Text style={styles.suggestions}>{item}</Text>
        </TouchableOpacity>
         
        )
       
      })
      
      let bgcolor;
      let textcolor;
      let cardcolor;
      let iconcolor;
      let inputColor
      
      if(this.props.auth.nightmode == true){
        bgcolor= '#303030'
        textcolor= '#fff'
        cardcolor='#424242'
        iconcolor='#fff'
        inputColor="#303030"
      } else {
        bgcolor= '#fff'
        textcolor= '#333'
        cardcolor='#fff'
        iconcolor='#888'
        inputColor="#dcdfe4"
      }
   
      let MyIns = []
      
      userInfo.activeGroup.map(institute=> { MyIns.push(institute.institution_name) })
      const names=( 
        <View style={{width:100+'%', backgroundColor:cardcolor}}>
          <View style={{}}>
                  <Text style={{fontSize:15,color:textcolor, fontFamily:'Quicksand-Medium', fontStyle:'italic'}}>Active :</Text>
          </View>
          <FlatList
                data={MyIns}
                keyExtractor={name=> name}
                renderItem={({item, index}) => this._rendernames(item, index)}
            />
            <TouchableOpacity style={{alignItems:'center',backgroundColor:'#0073ff', padding:2, justifyContent:'center', borderRadius:7,elevation:6, marginTop:8,width:30+'%'}} onPress={()=> this.setState({isModalVisibleAddGroup: true})}>
                    <Text  style={{textAlign:"center",fontFamily:'Quicksand-Medium', fontSize:15, color:'#fff',paddingLeft:3, paddingRight:3,}}>Add more</Text>
            </TouchableOpacity>
        </View>
            )
      const MySkill=[]
      const skills = userInfo.skills.map(skill=> {
      MySkill.push(skill)
      })
  const myskills=( 
          <FlatList
            data={MySkill}
            keyExtractor={(item, index)=> index.toString()}
            renderItem={({item, index}) => this._renderskills(item, index)}
        />)
//   const SelectedGroup =[]
//  const selectedgrp= userInfo.institution.map(name=> {SelectedGroup.push(name.institution_name)})
//  console.log('selected',SelectedGroup)
   


    return (
      <View style={styles.container}>
      <StatusBar 
      backgroundColor="#0073ff"
      barStyle="light-content"
      />
        <View style={{height:HEIGHT, width:WIDTH}}>
            <Animated.View style={{flexDirection:'row',backgroundColor:'transparent', justifyContent:'space-between',height:banner,paddingTop:20, paddingHorizontal:20,zIndex:100}}>
                
                <View style={{width: banner/1.99, height:banner/1.99, borderRadius:banner/4, elevation:7, backgroundColor:'#fff', justifyContent:'center', alignItems:'center',padding:2 }}> 
                    <FontAwesome name="bell" color="#0073ff" size={23} style={{}}/>
                </View>
               
                <View style={{width: banner/1.99, height:banner/1.99, borderRadius:banner/4, elevation:7, backgroundColor:'#fff', justifyContent:'center', alignItems:'center',padding:2 }}> 
                <Icon name="cog" onPress={()=>this.props.navigation.navigate('Settings')}  color="#0073ff" style={{}}  size={23}/>
                </View>
               
            </Animated.View>
           
            <Animated.View style={{opacity:opacity2, position:'absolute',width:66+'%', top:20,height:banner, left:17+'%', right:17+'%' ,zIndex:zIndex2}}>
                  <Text numberOfLines={1} style={{fontSize:24, fontFamily:'Quicksand-Bold',textAlign:'center' ,color:'#fff'}}>My Profile</Text>
                </Animated.View>
            <Image source={{uri:userInfo.profileImage}} resizeMode='cover' style={{height:HEIGHT-(height/2.9),position:'absolute', top:0, left:0, right:0, width:WIDTH, }}/> 
           <Animated.View style={{zIndex:zIndex}}>
      
      <Animated.View style={{paddingHorizontal:20,opacity:opacity3, flexDirection:'row', justifyContent:'space-around',alignItems:'center', zIndex:100,  height:60,marginTop:marginTop, marginLeft:WIDTH/2,  width:WIDTH/2, }}>
           
           {
               userInfo.social.instagram == '' || userInfo.social.instagram ==  null ?null : (
                 <View style={{width: banner/1.9, height:banner/1.9, borderRadius:banner/4, elevation:7, backgroundColor:'rgba(255, 255, 255, 1)', justifyContent:'center', alignItems:'center', }}> 
                     <Icon name="instagram" color="#405de6" size={22}/>
                 </View>
               )
             }
             {
               userInfo.social.youtube == '' || userInfo.social.youtube == null ? null : (
                 <View style={{width: banner/1.9, height:banner/1.9, borderRadius:banner/4, elevation:7, backgroundColor:'#fff', justifyContent:'center', alignItems:'center', }}> 
                     <Icon name="youtube" color="#ff0000" size={22}/>
                 </View>
               )
             }
             {
               userInfo.social.twitter == '' || userInfo.social.twitter ==  null ? null : (
                 <View style={{width: banner/1.9, height:banner/1.9, borderRadius:banner/4, elevation:7, backgroundColor:'#fff', justifyContent:'center', alignItems:'center', }}> 
                     <Icon name="twitter" color="#1da1f2" size={22}/>
                 </View>
               )
             }
          
           </Animated.View>
      
            
            </Animated.View>
            <Animated.View style={{position:'absolute',height:HEIGHT-(height/2.4), top:0,left:0, right:0,opacity:opacity2}}>
              <LinearGradient  colors={['#00c6ff', '#0073ff']} style={{height:100+'%'}} start={{x: 0.1, y: 0.1}} end={{x: 0.4, y: 0.45}} >
              </LinearGradient>
            </Animated.View>
           
        </View>
       
        <SlidingUpPanel
          visible
          startCollapsed
          showBackdrop={false}
          ref={c => this._panel = c}
          allowDragging={this.state.allowDragging}
          draggableRange={this.props.draggableRange}
          onDrag={v => this._draggedValue.setValue(v)}>
          <View style={styles.panel}>
          
            <View style={{
               
               backgroundColor:bgcolor,
               paddingHorizontal:20,
               paddingTop:20,
               paddingBottom:20,
               borderTopLeftRadius:20,
               borderTopRightRadius:20,
              
            }}>
            
            <View style={{alignItems:'center',padding:0, margin:0, justifyContent:'center'}}>
            <Animated.View style={{opacity: icon}}>
            <Icon name="angle-double-down" color={iconcolor}/>
            </Animated.View>
            <Animated.View style={{opacity: icon2}}>
            <Icon name="angle-double-up" color={iconcolor}/>
            </Animated.View>
            </View>
           
            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between' }}>
            
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Animated.View style={{height:profileHeight,marginRight:marginRight, width:profileHeight,backgroundColor:bgcolor,   }}>
            <Image source={{uri:userInfo.profileImage}} resizeMode='cover' style={{flex:1,borderRadius:300,borderColor:'#0073ff', height:null, width:null, borderWidth:1.5, borderColor:'#fff'}}/> 
            </Animated.View>
            <Animated.View style={{width:widthOfName,}}>
            <Text style={{color: textcolor, fontFamily:'Quicksand-Bold', fontSize:22}}>{user.name}</Text>
              {
                userInfo.residence == ''|| userInfo.residence == null ? (
                      null
                ) :(
                    <Text style={{color: textcolor,fontFamily:'Quicksand-Medium', fontSize:18}}>{userInfo.residence}</Text>
                )
               }
            </Animated.View>
            </View>

            </View>
            
             
                 
            </View>
            <View style={{backgroundColor:bgcolor}}>
            <ScrollView
            showsVerticalScrollIndicator={false}
              onTouchEnd={() => {  this.setState({allowDragging: true}) }}
              onTouchCancel={() => this.setState({allowDragging: true})}
              onTouchStart={() => this.setState({allowDragging: false})}>
              
              <View style={{flexDirection:'row',alignItems:'center',marginTop:10, justifyContent:'space-evenly',padding:12,borderRadius:10, elevation:2, width:WIDTH-40,marginLeft:20, backgroundColor:cardcolor}}>

                <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-around', }}>
                  <Text style={{fontFamily:'Quicksand-Bold', fontSize:16, color:textcolor}}>Followers</Text>
                  <Text  style={{fontFamily:'Quicksand-Bold', fontSize:15, color:textcolor}}>{this.props.auth.userInfo.stars.length}</Text>
                </View>
                <View style={{height:80+'%', width:0.5,alignSelf:'center', backgroundColor:textcolor}}></View>
                <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-around'}}>
                  <Text style={{fontFamily:'Quicksand-Bold', fontSize:16, color:textcolor}}>Following</Text>
                  <Text  style={{fontFamily:'Quicksand-Bold', fontSize:15, color:textcolor}}>{this.props.auth.userInfo.following.length}</Text>
                </View>
                </View>  
                <View style={{padding:5, paddingHorizontal:20}}>
         <Text style={{textAlign:'left',fontSize:18, fontFamily:'Quicksand-Bold', color:textcolor}}>About :</Text>
       </View>
      
       {/*********************institutions card ***********************/}        
      
        
         
               <Card style={{borderRadius:10, elevation:5.5,backgroundColor:cardcolor, width:WIDTH-40,marginLeft:20,marginTop:20 }}>
                  <CardItem style={{borderBottomWidth:0.7, width:WIDTH-40, justifyContent:'space-between', paddingHorizontal:20, borderTopLeftRadius:10, borderTopRightRadius:10, backgroundColor:bgcolor}}>
                      <Text style={{textAlign:'left',margin:0, padding:0, fontSize:15,color:textcolor, fontFamily:'Quicksand-Bold'}}>My Institutions/Groups :</Text>
                      <TouchableOpacity onPress={()=> this.setState({isModal1Visible: true})}>
                      <Text style={{textAlign:"center",fontFamily:'Quicksand-Medium', fontSize:13, color:'#0073ff'}}>Edit</Text>
                      </TouchableOpacity>
                     
                  </CardItem>
                  <CardItem style={{borderBottomLeftRadius:10,backgroundColor:cardcolor, borderBottomRightRadius:10, }}>
                  
                     <View style={{width:100+'%'}}>
                     {names}
                     </View>
                    
                  
                  
                     
                  </CardItem>
                  
              </Card>
              {/********************bio card ***********************/} 
              {
                this.state.hideBio ? (
                  null
                ) : (

               
             <Card style={{borderRadius:10, elevation:5.5,backgroundColor:cardcolor, width:WIDTH-40,marginLeft:20,marginTop:20  }}>
                  <CardItem style={{borderBottomWidth:0.7, width:WIDTH-40, justifyContent:'space-between', paddingHorizontal:20,  borderTopLeftRadius:10, borderTopRightRadius:10, backgroundColor:bgcolor}}>
                      <Text style={{textAlign:'left',margin:0, padding:0, fontSize:15,color:textcolor, fontFamily:'Quicksand-Bold'}}>Bio :</Text>
                      {
                        userInfo.bio == null || userInfo.bio=='' ?(
                          <TouchableOpacity style={{alignItems:'center'}} onPress={()=> {
                            this.hideBio(this.state.hideBio)
                          }}>
                          <Text style={{textAlign:"center",fontFamily:'Quicksand-Medium', fontSize:13, color:'#0073ff'}}>Hide</Text>
                          </TouchableOpacity>
                        ): (
                          <TouchableOpacity style={{alignItems:'center'}} onPress={()=> this.setState({isModalVisibleBio: true})}>
                          <Text style={{textAlign:"center",fontFamily:'Quicksand-Medium', fontSize:13, color:'#0073ff'}}>Edit bio</Text>
                          </TouchableOpacity>
                        )
                      }
                     
                     
                  </CardItem>
                  <CardItem style={{borderBottomLeftRadius:10, borderBottomRightRadius:10, backgroundColor:cardcolor}}>
                      {
                        userInfo.bio== '' || userInfo.bio == null ? (
                          <View style={{alignItems:'center', justifyContent:'center'}}>
                            <Text style={{textAlign:"center",fontFamily:'Quicksand-Medium',paddingBottom:8, fontSize:14,fontStyle:'italic', color:textcolor}}>No bio yet</Text>
                            <TouchableOpacity style={{alignItems:'center',elevation:6,backgroundColor:'#0073ff', padding:2, justifyContent:'center', borderRadius:7}} onPress={()=> this.setState({isModalVisibleBio: true})}>
                              <Text  style={{textAlign:"center",fontFamily:'Quicksand-Medium', fontSize:15, color:'#fff',paddingLeft:3, paddingRight:3}}>Add Bio</Text>
                            </TouchableOpacity>
                          </View>
                        ): (
                          <View>
                            <Text style={{textAlign:'auto',fontFamily:'Quicksand-Medium', fontSize:17,color:textcolor }}>{userInfo.bio}</Text>
                          </View>
                        )
                      }
                  </CardItem>
             </Card>
              )
            }
        
            
           <View style={{marginTop:10,borderTopWidth:0.7}}>
              <View>
                {myposts !==null ? (
                 <View style={{padding:5, paddingHorizontal:20}}>
                 <Text style={{textAlign:'left',fontSize:16, fontFamily:'Quicksand-Bold', color:textcolor}}>My Posts :</Text>
               </View>
                ): (
                  null
                )}
              </View>
              <View style={{paddingTop:10}}>
              {myposts}
              </View>
           
          </View> 
          <View style={{paddingBottom:HEIGHT/2}}>

        </View> 
        {/*************ads*************/}
        {/* <View >
        <BannerView
        placementId="1911005745652403_1911143952305249"
        type="rectangle"
     
      />
        </View> */}
       
      

         {/* <View style={{borderTopWidth:0.4, borderBottomWidth:0.4, marginBottom:HEADER_FIRST_HEIGHT, marginTop:20}}>
          
        
          <Text  style={{color:textcolor,  fontSize: TEXTSIZE/22,marginLeft:20,paddingBottom:5,paddingTop:6,fontFamily:'Quicksand-Bold'}}>Account</Text>
          <TouchableOpacity activeOpacity={0.9} onPress={()=> this.deletebutton()}>
              <Text style={{color:'red',  fontSize: TEXTSIZE/23.5,marginLeft:20,paddingBottom:5, fontFamily:'Quicksand-Medium'}}>Delete Account</Text>
          </TouchableOpacity>
        </View> */}
            
            </ScrollView>
            </View>
          </View>
        </SlidingUpPanel>
        {/******************Modal for institution editing**************** */}
        <View>
        <Modal isVisible={this.state.isModal1Visible} 
          animationIn='slideInUp'
          animationOut='slideOutDown'
          hideModalContentWhileAnimating ={true}
          animationInTiming={200}
          onBackButtonPress={()=> this.setState({isModal1Visible:false})}
        >
          <View style={{ width: WIDTH_MIN-(WIDTH/10),height: HEIGHT_MIN, backgroundColor:bgcolor, alignItems:'center', justifyContent:'center', borderRadius:20,flex:1  }}>
          <View style={{position:'absolute',backgroundColor:'#0073ff', top:0, left:0, right:0, height:50,  borderTopLeftRadius:20, borderTopRightRadius:20, alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'#fff', fontFamily:'Quicksand-Bold', fontSize:20, paddingLeft:10}}>Edit Groups :</Text>
          </View>
          <View style={{marginTop:80, width:95+'%', flex:1,}}>
         
           <FlatList
                data={this.state.myGroups}
                key={item=> item.institution_name}
                extraData={this.state}
                renderItem={({item}) => {
                  return (
                  <View style={{flexDirection:'row',paddingBottom:3, alignItems:'center',width:100+'%' }}>
                        <TouchableOpacity activeOpacity={0.88}  style={{width:100+'%'}}
                         onPress={
                          this.state.groupsNames.includes(item.institution_name)? (
                            ()=> {
                              removeByAttr(this.state.myActiveGroups, 'institution_name', item.institution_name);
                              let index = this.state.groupsNames.indexOf(item.institution_name);
                              if (index > -1) {
                                this.state.groupsNames.splice(index, 1);
                              }

                            console.log('1=', this.state.myActiveGroups)
                            console.log('11=', this.state.groupsNames)

                              this.setState({selectColor:'#fff'})
                            }
                          ): (
                          ()=> {
                            this.state.myActiveGroups.push(item)
                            this.state.groupsNames.push(item.institution_name)
                            console.log('2=', this.state.myActiveGroups)
                            console.log('22=', this.state.groupsNames)

                            this.setState({selectColor:'#0073ff'})
                          }  
                            
                          )
                        } >
                        
                        {
                          this.state.groupsNames.includes(item.institution_name)? (
                            <View style={{backgroundColor:'#0073ff', width:100+'%', borderRadius:8, flexDirection:'row', alignItems:"center"}}>
                                <View style={{marginLeft:5,marginRight:5, alignItems:'center', justifyContent:'center'}}>
                                <Icon name="check" size={18} color="#fff"/>
                                </View>

                                  <Text style={{fontSize:19,color:'#fff', fontFamily:'Quicksand-Bold',paddingLeft:10, padding:2,}}>{item.institution_name}</Text> 
                                
                            </View>
                          
                          ): (
                            <View style={{backgroundColor:bgcolor, width:100+'%', borderRadius:8, flexDirection:'row', alignItems:'center',borderWidth:1, borderColor:'#0073ff'}}>
                            <View style={{marginLeft:5,marginRight:5, alignItems:'center', justifyContent:'center'}}>
                                <Icon name="circle" size={18} color={textcolor}/>
                                </View>
                            <View>
                            <Text style={{fontSize:19,color:textcolor, fontFamily:'Quicksand-Bold',paddingLeft:10, padding:2,}}>{item.institution_name}</Text>
                            </View>
                              
                            <TouchableOpacity activeOpacity={0.7} onPress={()=> {
                              this.props.deleteInstitution(item._id, this.state.token)
                              ToastAndroid.show(`Removing ${item.institution_name}...`, ToastAndroid.SHORT)
                              let index = this.state.myGroups.indexOf(item);
                                    if (index > -1) {
                                      this.state.myGroups.splice(index, 1);
                                    }
                            }} 
                            style={{marginLeft:5,marginRight:5, alignItems:'center',zIndex:101, position:'absolute', right:8}}>
                              <Icon name="minus-circle" size={18} color="#ff0000"/>
                              </TouchableOpacity >
                        </View>
                          )
                        // this.props.auth.userInfo.activeGroup.includes(item) ? (
                        //   <Text>Exists</Text>
                        // ): (
                        //   <Text>Not exists</Text>
                        // )
                        }
                       
                        </TouchableOpacity>
                  </View>
                          
                ) 
              }} />
          
          <View style={{ flexDirection:'row', marginBottom:10,marginTop:10, justifyContent:'space-around'}}>
             
              <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#0073ff'}} onPress={()=> {
                this.props.setMyActiveGroups(this.state.myActiveGroups, this.state.token)
                this.setState({isModal1Visible:false})}}>
                <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
            
          </View>
        </Modal>
        </View>


         {/******************Modal for bio editing**************** */}
         <View>
        <Modal isVisible={this.state.isModalVisibleBio} 
          animationIn='slideInUp'
          animationOut='slideOutDown'
          hideModalContentWhileAnimating ={true}
          animationInTiming={200}
          onBackButtonPress={()=> this.setState({isModalVisibleBio:false})}
        >
          <View style={{ width: WIDTH_MIN-(WIDTH/10),backgroundColor:bgcolor, alignItems:'center', justifyContent:'center', borderRadius:20,flex:1  }}>
          <View style={{position:'absolute',backgroundColor:'#0073ff', top:0, left:0, right:0, height:50,  borderTopLeftRadius:20, borderTopRightRadius:20, alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'#fff', fontFamily:'Quicksand-Bold', fontSize:20, paddingLeft:10}}>Edit Bio :</Text>
          </View>
          <View style={{marginTop:80, width:95+'%', flex:1}}>
          <TextInput
          underlineColorAndroid="#0073ff"
          selectionColor="#0073ff"
            style={{color: textcolor,fontSize:18,backgroundColor:inputColor, borderRadius:10,borderWidth:0.4, fontFamily:'Quicksand-Medium',padding:4, flex:1, textAlignVertical:'top'}}
            multiline={true}
            numberOfLines={8}
            value={this.state.bio}
            onChangeText={(text) => this.setState({bio: text})}
            editable = {true}
      />
          <View style={{ flexDirection:'row', marginBottom:10,marginTop:10, justifyContent:'space-around'}}>
                <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#bdc3c7'}} onPress={()=> {
                  this.setState({bio:''})
                  this.setState({isModalVisibleBio:false})}}>
                  <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Cancel</Text>
                </TouchableOpacity>
              <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#0073ff'}} onPress={()=> {
                this.props.updateUserBio(this.state)
                console.log(this.state.bio)
                this.setState({isModalVisibleBio:false})}}>
                <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
            
          </View>
        </Modal>
       </View>

        {/******************Modal for adding more groups**************** */}
        <View>
        <Modal isVisible={this.state.isModalVisibleAddGroup} 
          animationIn='slideInUp'
          animationOut='slideOutDown'
          hideModalContentWhileAnimating ={true}
          animationInTiming={200}
          onBackButtonPress={()=> this.setState({isModalVisibleAddGroup:false})}
          style={{}}
        >
          <View style={{ width: WIDTH_MIN-(WIDTH/10), backgroundColor:'#fff', alignItems:'center', justifyContent:'center', borderRadius:20,flex:1, zIndex:100  }}>
          <View style={{position:'absolute',backgroundColor:'#0073ff', top:0, left:0, right:0, height:50,  borderTopLeftRadius:20, borderTopRightRadius:20, alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'#fff', fontFamily:'Quicksand-Bold', fontSize:20, paddingLeft:10}}>Add Group :</Text>
          </View>
          <View style={{width:100+'%', flex:1, marginTop:50,borderBottomLeftRadius:20, borderBottomRightRadius:20, backgroundColor:'transparent' }}>
          
              <Tabs 
              style={{marginBottom:30}}
              tabBarUnderlineStyle={{ backgroundColor:'#fff',height:3 }}>
              <Tab
              
              heading={
                  <TabHeading style={{backgroundColor:'#0073ff'}}>
                    <Text style={{ fontFamily: 'Quicksand-Bold', color:'#fff',fontSize:18 }}>Public</Text>
                  </TabHeading>} 
                    >
                    <TouchableWithoutFeedback onPress={()=> {
        this.setState({hideModel:true})
      }}>
                <View style={{backgroundColor:bgcolor,  height:100+'%', borderBottomLeftRadius:20, borderBottomRightRadius:20}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                
                <View style={{paddingHorizontal:10,}}>
                    <Text style={{marginBottom:2,marginTop:5, fontFamily:'Quicksand-Medium', fontSize:18,color:'#333'}}>Group Name :</Text>
                    <Madoka
                      label={'Group/Institution name'}
                      onChangeText={this.onTextChanged}
                      borderColor={'#0073ff'}
                      labelStyle={{ color: '#333', fontFamily:'Quicksand-Regular' }}
                      inputStyle={{ color: '#333',fontFamily:'Quicksand-Regular' }}
                      value={this.state.public_institution_name}
                  />
                  <View style={{position:'relative'}}>
                  <View style={{position:'absolute', top:0,left:1, right:1,zIndex:100, backgroundColor:bgcolor, borderBottomLeftRadius:10,  borderBottomRightRadius:10, elevation:5}}>
                      {this.renderSuggestions(suggestions)}
                 </View>
                  </View>
                   
                </View>
               
                 
                <View style={{backgroundColor:'#fff',paddingHorizontal:10,position:'relative'}}>
                     <Text style={{marginBottom:3,marginTop:3, fontFamily:'Quicksand-Medium', fontSize:18,color:'#333'}}>Short description :</Text> 
                   <TextInput
                   selectionColor="#0073ff"
                   underlineColorAndroid="#0073ff"
                        style={{color: '#333',fontSize:17,backgroundColor:'#fff', fontFamily:'Quicksand-Medium',padding:4, textAlignVertical:'top', borderWidth:0.5, borderRadius:10}}
                       multiline={true}
                       numberOfLines={4}   
                       value={this.state.description}
                       onChangeText={(text) => this.setState({public_description: text,})}
                />
                      
                </View>
               
                <View style={{ backgroundColor:'#fff'}}>
                <View style={{ flexDirection:'row',marginTop:40, justifyContent:'space-around'}}>
                  <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#bdc3c7'}} onPress={()=> {
                    this.setState({public_institution_name:'', public_description:'',isModalVisibleAddGroup:false})

                    }}>
                    <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Cancel</Text>
                  </TouchableOpacity>
                <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#0073ff'}} onPress={async()=> {
                  
                await this.props.addPublicInstitution(this.state)
                console.log('state 1 =', this.state)
                  
               
                
                 setTimeout(()=> {
                  const institutionnames = this.props.auth.userInfo.activeGroup.filter(name=> {
                    return name.institution_name
                  })
               // const unique = [ ...new Set(institutionnames) ]
                 this.props.auth.userInfo.activeGroup.filter(name=> {
                   this.setState({groupsNames: institutionnames})
                  //this.state.groupsNames.push(name.institution_name)
                  console.log('grp 2= ',this.state.groupsNames)
                 })
                 this.setState({myActiveGroups:institutionnames}, ()=> {
                  // this.setState({myActiveGroups: this.props.auth.userInfo.activeGroup})
                  //  this.props.setMyActiveGroups(this.state.myActiveGroups, this.state.token)
                  //  this.props.setMyGroups(this.state.myGroups)
                    console.log('active 2.. ',this.state.myActiveGroups)
                   
                 });
                 }, 10000)
                //  setTimeout(()=> {
                //   console.log('state 2=',this.state.myActiveGroups)
                //  console.log('3=', this.state.myGroups)
                //  console.log('4=', this.state.groupsNames)
                //  }, 5000)
                 
                  this.setState({isModalVisibleAddGroup:false})}}>
                  <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Save</Text>
                </TouchableOpacity>
              </View>
                </View>
                </ScrollView>

                   </View>
                   </TouchableWithoutFeedback>

              </Tab>
              <Tab  heading={
                 <TabHeading style={{backgroundColor:'#0073ff'}}>
                 <Text style={{ fontFamily: 'Quicksand-Bold', color:'#fff',fontSize:18}}>Private</Text>
               </TabHeading>}  
                   
              >
                <View style={{backgroundColor:'#fff',  height:100+'%', borderBottomLeftRadius:20, borderBottomRightRadius:20}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{paddingHorizontal:10,}}>
                    <Text style={{marginBottom:2,marginTop:5, fontFamily:'Quicksand-Medium', fontSize:18,color:'#333'}}>Group Name :</Text>
                    <Madoka
                      label={'Group/Institution name'}
                      onChangeText={(text)=> this.setState({private_institution_name:text})}
                      borderColor={'#0073ff'}
                      labelStyle={{ color: '#333', fontFamily:'Quicksand-Regular' }}
                      inputStyle={{ color: '#333',fontFamily:'Quicksand-Regular' }}
                  />
                </View>
                <View style={{paddingHorizontal:10,}}>
                    <Text style={{marginBottom:2,marginTop:5, fontFamily:'Quicksand-Medium', fontSize:18,color:'#333'}}>Password :</Text>
                    <Madoka
                      label={'Password'}
                      onChangeText={(text)=> this.setState({password:text})}
                      borderColor={'#0073ff'}
                      labelStyle={{ color: '#333', fontFamily:'Quicksand-Regular' }}
                      inputStyle={{ color: '#333',fontFamily:'Quicksand-Regular' }}
                  />
                </View>
                <View style={{backgroundColor:'#fff',paddingHorizontal:10,}}>
                     <Text style={{marginBottom:3,marginTop:3, fontFamily:'Quicksand-Medium', fontSize:18,color:'#333'}}>Short description :</Text> 
                   <TextInput
                        style={{color: '#333',fontSize:17,backgroundColor:'#fff', fontFamily:'Quicksand-Medium',padding:4, textAlignVertical:'top', borderWidth:0.5, borderRadius:10}}
                       multiline={true}
                       numberOfLines={4}
                       value={this.state.description}
                       onChangeText={(text) => this.setState({private_description: text,})}
                      />
                   
                 
                    
                </View>
                <View style={{ backgroundColor:'#fff'}}>
                <View style={{ flexDirection:'row',marginTop:40, justifyContent:'space-around'}}>
                <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#bdc3c7'}} onPress={()=> {
                    this.setState({private_institution_name:'', private_description:'',isModalVisibleAddGroup:false})

                    }}>
                    <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Cancel</Text>
                  </TouchableOpacity>
                <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#0073ff'}} onPress={()=> {
                  
                 this.props.setCurrentProfileWithPrivateInstitution(this.state)
                  this.setState({isModalVisibleAddGroup:false})}}>
                  <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Save</Text>
                </TouchableOpacity>
              </View>
                </View>
                </ScrollView>

                   </View>
              </Tab>
            
            </Tabs>
        
          
          </View>
          
            
          </View>
          <View style={{borderBottomLeftRadius:20, borderBottomRightRadius:20, backgroundColor:'transparent'}}>

          </View>
        </Modal>
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
  
export default connect(mapStateToProps, 
    {deleteAuthUser, deletepost, getposts, addlike, addcomment, getSinglePost,updateProfileImage2, getSingleUser, updateProfileImage, nightmodeoff,setMyActiveGroups, nightmodeon, updateUserBio, setMyGroups, hideBio, hideSkills, showBio, deleteInstitution, addPublicInstitution, setCurrentProfileWithPrivateInstitution, setCurrentProfileWithPublicInstitution
    })(UserScreen2)



