import React, { Component } from 'react'
import { StyleSheet, Text, View ,Image,Dimensions,TouchableOpacity,StatusBar, AsyncStorage, TextInput, Keyboard, ToastAndroid, NetInfo, FlatList, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux'
import { addliketocomment1, getPostComment, addcomment, deletecomment} from '../redux/actions/postAction'
let HEIGHT_MIN = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width ;
const TEXTSIZE = Dimensions.get('window').width ;
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const ACCESS_TOKEN = 'Access_Token'
import moment from 'moment'
import Spinner from 'react-native-spinkit'
import { Input } from 'native-base';



class CommentPage extends Component {
    static navigationOptions={
        title: 'Comments',
        headerStyle: {
            backgroundColor: '#4776e6',
           
          },
          headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily:'Quicksand-Bold',
      color:"#fff"
    },
    }

  constructor(props){
    super(props);
    this.state={
      token:'',
      institution:'',
      text:'',
      isLoading:false,
      refreshing:false
    }
  }
  async componentDidMount() {
   
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    if(token){
      this.setState({
        token
      })
    }
    this.setState({institution:this.props.auth.userInfo.institution})  
}

findUserLike(likes){
    if(likes && likes.length !==undefined){
     
      if (likes.filter(like => like.userdata == this.props.auth.user.id).length >0) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

_renderItem = (item)=> {
   const postdate = moment(item.date).format('D/MM, h:mm a');

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
    
    <ScrollView 
    style={{height:undefined,width: undefined, zIndex:11 ,marginBottom:HEIGHT_MIN/75,paddingHorizontal:10, marginTop:5,backgroundColor:bgcolor }}
    >
      <View style={{flexDirection:'row'}}>
      <Image source={{uri: item.avatar}}  resizeMode="cover"
                    style={{height:  (HEIGHT_MIN/15) ,width: (HEIGHT_MIN/ 15), borderRadius:(HEIGHT_MIN/8), marginLeft:4, marginTop:1, marginBottom:1, borderColor:'#999', borderWidth:1}}/> 
         <View style={{flexDirection:'column'}}>
          <View style={{flexDirection:'row', position:'relative'}}>
               <Text style={{fontSize:16,marginLeft:9, fontFamily:'Quicksand-Bold', color:textcolor, width:WIDTH-((HEIGHT_MIN/15)+90)}}>{item.name}</Text>

          </View>
        <View style={{flexDirection:"row"}}>
        <Text style={{fontSize:16,marginLeft:9,marginRight:4, fontFamily:'Quicksand-Medium', flexWrap:'wrap', color:textcolor,
        width: WIDTH - (HEIGHT_MIN/15 + 50)
    }}>
          {item.text}
      </Text>
      {
          this.props.auth.user.id !== item.userdata ? (
            <TouchableOpacity   activeOpacity={0.9} onPress={()=>{ 
              this.props.deletecomment(this.props.auth.post._id, item._id, this.state )
              ToastAndroid.show('Deleting...', ToastAndroid.SHORT)
             setTimeout(()=>  this.props.getPostComment(this.props.auth.post._id, this.state.token), 2000)
             setTimeout(()=>  this.props.getPostComment(this.props.auth.post._id, this.state.token), 3500)
              }}>
              
               <Text style={{color:'#FF0000', fontSize:18, padding:0, fontFamily:'Quicksand-Bold'}}>
              x
          </Text>
          </TouchableOpacity>
          ) : (
<View></View>
             
          )
      }
     
       
        </View>
        <View style={{flexDirection:'row',marginTop:3}}>
        <Text style={{fontSize:14, color:textcolor, position:'absolute', right:5}}>{postdate}</Text>
        <View style={{flexDirection:'row',backgroundColor:bgcolor, alignItems:'center', marginRight:15,marginLeft:0 }}>
                <TouchableOpacity onPress={()=> {
                    this.props.addliketocomment1(this.props.auth.post, item._id, this.state.token)
                    
                    setTimeout(()=> this.props.getPostComment(this.props.auth.post._id, this.state.token), 600)
                    
                      setTimeout(()=>this.props.getPostComment(this.props.auth.post._id, this.state.token), 1000)
                      setTimeout(()=>this.props.getPostComment(this.props.auth.post._id, this.state.token), 2000)

                       
                  
                    }} activeOpacity={1} style={{marginRight:0,marginLeft:8, paddingLeft:10, paddingRight:10, paddingTop:5, paddingBottom:5}}>
                    <FontAwesome  name="heart" size={17} 
                     color={this.findUserLike(item.likes) ? '#f70000':'#aaa'}
                    />
                    
                </TouchableOpacity>
                    <View>
                    <TouchableOpacity activeOpacity={1} onPress={()=> alert('likes')} style={{marginRight:10, borderColor:'#fff',marginLeft:1,padding:5, flex:1}}>
                    <View>
                    <Text style={{color:textcolor,textAlign:'center',flex:1}}>{item.likes ? (item.likes.length):(0)}</Text>

                    </View>
                    </TouchableOpacity>
                  </View>
        </View>
       
        </View>
        </View>           
     
      </View>
     
    
     </ScrollView>
   
  )}

  handleRefresh = ()=> {
    this.setState({
      refreshing: true,
     
    },()=> {

      this.props.getPostComment(this.props.auth.post._id, this.state.token)
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
            <Spinner color={'#aaa'} size={50} type={"Circle"}/>
           </View>
        )

      } 

     

    return (
      <View style={{flex:1,backgroundColor:bgcolor }}>
         <FlatList
              data={post.comments}
             ListEmptyComponent={()=> <View  style={{justifyContent:'center'}}>
             <Text style={{  color:textcolor,
             fontSize: TEXTSIZE/28,
             flex:1,
             textAlign:'center',
             fontFamily:'Quicksand-Regular'}}>No comments yet...</Text>
             </View>}
              renderItem={({item}) => this._renderItem(item)}
              keyExtractor={(item)=> item._id}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
             style={{marginBottom: 80}}
          />
          <View style={{flex:10,zIndex:1,backgroundColor:cardcolor, borderTopWidth:0.5,position:'absolute', bottom:0, left:0, right:0}}>
            <View style={{flexDirection:'row', padding:5, alignItems:'center'}}>
            <Image source={{uri: userInfo.profileImage}}  resizeMode="cover"
                    style={{height:  (HEIGHT_MIN/17) ,width: (HEIGHT_MIN/ 17), borderRadius:(HEIGHT_MIN/8), marginLeft:4, marginTop:1, marginBottom:0, borderColor:'#999', borderWidth:0.7, zIndex:10000000}}/>
            <TextInput
             style={{width:72+'%', marginLeft:10, fontFamily:'Quicksand-Regular',color:textcolor, fontSize:15}} placeholder="Add a comment..."
             placeholderTextColor={textcolor}
              underlineColorAndroid="transparent"
               multiline={true} 
               value={this.state.text}
               onChangeText={(text)=>  this.setState({text})}
               />
               {
                   this.state.text == '' ? (
                    <TouchableOpacity activeOpacity={0.9} onPress={()=> {
                       alert('Text field must not be empty!')
                    }}>
                        <Text style={{fontSize:17,marginLeft:3,opacity:0.6, fontFamily:'Quicksand-Regular', color:'#4776e6'}}>POST</Text>
                    </TouchableOpacity>
                   ) : (
                    <TouchableOpacity activeOpacity={0.9} onPress={async()=> {
                       await this.props.addcomment(post._id, this.state)
                        this.setState({text:''}, ()=> {
                           setTimeout(()=> this.props.getPostComment(post._id, this.state.token), 2000)
                           setTimeout(()=> this.props.getPostComment(post._id, this.state.token), 3500)
                            ToastAndroid.show('Posting Comment...', ToastAndroid.SHORT)
                        })
                        
                    }}>
                        <Text style={{fontSize:17,marginLeft:3, fontFamily:'Quicksand-Regular', color:'#4776e6'}}>POST</Text>
                    </TouchableOpacity>
                   )
               }
          
            </View>
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
  

export default connect(mapStateToProps, {addcomment, getPostComment, deletecomment, addliketocomment1})(CommentPage)