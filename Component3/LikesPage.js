import React, { Component } from 'react'
import { StyleSheet, Text, View ,Image,Dimensions,TouchableOpacity,StatusBar, AsyncStorage, TextInput, Keyboard, ToastAndroid, NetInfo, FlatList, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux'
import { getPostComment} from '../redux/actions/postAction'
let HEIGHT_MIN = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width ;
const TEXTSIZE = Dimensions.get('window').width ;
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const ACCESS_TOKEN = 'Access_Token'
import Spinner from 'react-native-spinkit'



class LikesPage extends Component {
    static navigationOptions={
        title: 'Likes',
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



_renderItem = (item)=> {
  let bgcolor;
  let textcolor;
  
  
  if(this.props.auth.nightmode == true){
    bgcolor= '#303030'
    textcolor= '#fff'
   
  } else {
    bgcolor= '#fff'
    textcolor= '#333'
    
  }

   
    return (  
    
    <ScrollView 
    style={{height:undefined,width: undefined, zIndex:11 ,marginBottom:HEIGHT_MIN/75,paddingHorizontal:10, marginTop:5, }}
    >
      <View style={{flexDirection:'row',backgroundColor:bgcolor, alignItems:'center'}}>
      <Image source={{uri: item.profileImage}}  resizeMode="cover"
                    style={{height:  (HEIGHT_MIN/15) ,width: (HEIGHT_MIN/ 15), borderRadius:(HEIGHT_MIN/8), marginLeft:4, marginTop:1, marginBottom:1, borderColor:'#999', borderWidth:1}}/> 
       
       <Text style={{fontSize:16,marginLeft:9, fontFamily:'Quicksand-Bold', color:textcolor, width:WIDTH-((HEIGHT_MIN/15)+90)}}>{item.name}</Text>
        
        
                  
     
      </View>
     
    
     </ScrollView>
   
  )}

  

  render() {
    const {user, loggedIn,allCollegues, loading, userInfo, posts, post}= this.props.auth

    let bgcolor;
    let textcolor;
    
    
    if(this.props.auth.nightmode == true){
      bgcolor= '#303030'
      textcolor= '#fff'
     
    } else {
      bgcolor= '#fff'
      textcolor= '#333'
      
    }

    if(loading){
        return(
          <View style={{flex: 1, justifyContent:'center',alignItems:'center', backgroundColor:bgcolor}}>
            <Spinner color={'#aaa'} size={50} type={"Circle"}/>
           </View>
        )

      } 
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
     
     

    return (
      <View style={{flex:1,backgroundColor:bgcolor }}>
       <StatusBar
          backgroundColor='#002463'
          barStyle="light-content"
        />
         <FlatList
              data={post.likes}
             ListEmptyComponent={()=> <View  style={{justifyContent:'center'}}>
             <Text style={{  color:textcolor,
             fontSize: TEXTSIZE/28,
             flex:1,
             textAlign:'center',
             fontFamily:'Quicksand-Regular'}}>No likes yet...</Text>
             </View>}
              renderItem={({item}) => this._renderItem(item)}
              keyExtractor={(item)=> item._id}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
             style={{marginBottom: 80}}
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
  

export default connect(mapStateToProps, {getPostComment})(LikesPage)