import React, { Component } from 'react'
import { StyleSheet, Text, View ,Image,Dimensions,ScrollView,FlatList, ActivityIndicator,TouchableOpacity,StatusBar, AsyncStorage, NetInfo } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5'

import {  Card, CardItem, Left,  } from 'native-base';
import {connect} from 'react-redux'
import {getAllUsers, getSingleUser, getAllCollegues} from '../redux/actions/authAction'
import Spinner from 'react-native-spinkit'
import { withNavigation } from 'react-navigation';
import {BannerView} from 'react-native-fbads'
let HEIGHT_MIN = Dimensions.get('window').height;
let WIDTH_MIN = Dimensions.get('window').width;
const TEXTSIZE = Dimensions.get('window').width ;
const ACCESS_TOKEN = 'Access_Token'

const WIDTH_LEFT = WIDTH_MIN -((WIDTH_MIN/2.3)*2)
const PADDING_WIDTH = WIDTH_LEFT /3.89999

class Profiles extends Component {
  

  constructor(){
    super();
    this.state={
      token:'',
     status:false,
      refreshing:false
    }
  }
  async componentDidMount() {

        const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    if(token){
      this.setState({
        token
      })
      NetInfo.isConnected.addEventListener('connectionChange', await this.handleConnectionChange);

       this.props.getAllCollegues(this.state.token, this.props.auth.userInfo.institution)
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

 
 

  _renderItem = ({item, index})=> {
   
    return (
     <View>
   <View>
    <TouchableOpacity 
    activeOpacity={0.9}
                
    onPress={
     async ()=>{
       await this.props.getSingleUser(item, this.state)
       if(this.state.token == null || undefined || ''){
         alert('Opps! Something went wrong!')
       } else {
       await this.props.navigation.navigate('ProfileItem')
       }
      }}
    style={{height:undefined,width: undefined,marginBottom:HEIGHT_MIN/50,marginLeft:PADDING_WIDTH}}
    >
                <Card style={{borderRadius:20, width:WIDTH_MIN/2.3, }}>
                    
                    <CardItem cardBody style={{height:(HEIGHT_MIN/4),width: undefined,borderTopLeftRadius: 20, borderTopRightRadius: 20}}> 
                    <Image source={{uri: item.profileImage}}  resizeMode="cover"
                 style={{height:  (HEIGHT_MIN/4) ,width: (WIDTH_MIN/ 2.3),borderTopLeftRadius: 20, borderTopRightRadius: 20}}/> 
                       
                    </CardItem>
                    
                    <CardItem style={{height: HEIGHT_MIN/19, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
                        <Left style={{flex:1}}>
                           <Text numberOfLines={1} style={styles.name}>{item.name}</Text> 
                        </Left>
                    </CardItem>
                   
                    </Card> 
    </TouchableOpacity>
    </View>
  
    </View>
   
   
  )}

      
 

      handleRefresh = ()=> {
        this.setState({
          refreshing: true,
         
        },()=> {

          this.props.getAllCollegues(this.state.token, this.props.auth.userInfo.institution)
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

    return (
      <View style={{flex:1,backgroundColor:'#ffffff' }}> 
       <View style={{flex:1,backgroundColor:'transparent',flexDirection: 'row'}}>
          
          <LinearGradient  colors={['#E239FC', '#6BBAFC']} style={{width: 100 + '%', height: 100 +'%',}} start={{x: 0, y: 0.6}} end={{x: 1, y: 0.5}}>
           <View style={{flexDirection:'row', alignItems:'center',width: 100 + '%', height: 100 +'%',alignSelf: 'center'}}>
               
               <Text style={{color:'white',flex:1 ,textAlign: 'center',fontSize: 32 ,backgroundColor: 'transparent', fontFamily:'Quicksand-Bold'}}>ColleagueHub</Text>
           </View>
 
         </LinearGradient> 
         </View>
          
       <View style={{marginTop:HEIGHT_MIN/35, flex:10 }}>
      
          <FlatList
              data={allCollegues}
             ListEmptyComponent={()=> <View  style={{justifyContent:'center'}}>
             <Text style={{  color:'#333',
             fontSize: TEXTSIZE/28,
             flex:1,
             textAlign:'center',
             fontFamily:'Quicksand-Regular'}}>No Profile!</Text>
             </View>}
              renderItem={(item, index)=> this._renderItem(item, index)}
              ListFooterComponent={()=>{
                if(allCollegues.length <=1){
                  return(
                    
                    <View style={{flexDirection:'row', marginTop:7, justifyContent:'center', paddingBottom:20, width:WIDTH_MIN}}>
                    <View
                     style={{marginTop:10,marginBottom:10, justifyContent:'center' }}>
                      
                     <Text style={{fontFamily:'Quicksand-Medium', fontSize:16, paddingHorizontal:10}}>No more colleagues found. Share this app with your friends to find more colleagues from your workplace</Text>
                     
                    </View>
                    </View>
                  )
                }
               
                  return(
                    <View style={{flexDirection:'row', marginTop:7, justifyContent:'center', paddingBottom:20, width:WIDTH_MIN}}>
                   
                    </View>

                  )

                
                } }
              keyExtractor={(item, index)=> index.toString()}
              contentContainerStyle={styles.list}
              numColumns={2}
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

export default connect(mapStateToProps, {getAllUsers, getSingleUser, getAllCollegues})( withNavigation(Profiles))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name:{
    color:'#333',
    fontSize: TEXTSIZE/24,
    flex:1,
    fontFamily:'Quicksand-Medium'
  },
  list: {
   
  
  }
});



//one: #5AB7EF;
//two:#5472F0