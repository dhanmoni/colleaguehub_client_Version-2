import React, { Component } from 'react'
import { StyleSheet, Text, View,TextInput, TouchableOpacity,ActivityIndicator,StatusBar, Image, Dimensions, ScrollView, AsyncStorage, Keyboard} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Content, Item, Input, Button, Card, CardItem, Left,  } from 'native-base';
import {connect} from 'react-redux'
import { getSingleUser, getSearchedUser} from '../redux/actions/profileAction'

let HEIGHT_MIN = Dimensions.get('window').height;
let WIDTH_MIN = Dimensions.get('window').width;
const TEXTSIZE = Dimensions.get('window').width ;
const ACCESS_TOKEN = 'Access_Token'
import debounce from 'lodash/debounce';
import {BannerView} from 'react-native-fbads'

class SearchScreen extends Component {
  constructor(){
    super();
    this.state={
      searchBarFocused: false,
      searchInput:'',
      token:''
    }
  }
  


  
 async componentDidMount() {

      
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    if(token){
      this.setState({
        token
      })
     
    }


    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
    this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)


  }

  keyboardDidShow = () => {
    this.setState({ searchBarFocused: true })
  }
  keyboardDidHide = () => {
    this.setState({ searchBarFocused: false })
  }

  keyboardWillShow = () => {
    this.setState({ searchBarFocused: true })
  }

  keyboardWillHide = () => {
    this.setState({ searchBarFocused: false })
  }

  async componentDidMount() {
     
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    if(token){
      this.setState({
        token
      })
     
    }
    
  }

  makeRequest = debounce(()=> {
    this.props.getSearchedUser(this.state)
  }, 250)

  handleSearch = (text)=> {
      this.setState({searchInput:text}),
      ()=> this.makeRequest()
  }

  render() {

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

    const {user, loggedIn, allUsers, loading, searchedUser}= this.props.auth
    let profileItem;
   
    if(this.state.searchInput == '' || null || undefined){
      profileItem = ( <View style={{backgroundColor:bgcolor}}><Text style={{color:textcolor, fontFamily:'Quicksand-Medium'}}>Your search result will appear here</Text></View> )
    } 
     else {

       profileItem = allUsers.filter(
        (item)=>{
           return item.name.toLowerCase().indexOf(this.state.searchInput.toLowerCase()) !== -1
        }
      ).map((itemSearched, index)=>
         {return (
            <TouchableOpacity key ={index} 
            activeOpacity={0.9}
            
            onPress={
             async ()=>{
               await this.props.getSingleUser(itemSearched.userdata, this.state.token)
               if(this.state == null || undefined || ''){
                 alert('Opps! Something went wrong!')
               } else {
               await this.props.navigation.navigate('ProfileItem')
               }
              }}
            style={{height:undefined,width: undefined,marginBottom:HEIGHT_MIN/50}}>
            <Card style={{borderRadius:20, backgroundColor:cardcolor}}>
                
            <CardItem cardBody style={{height:(HEIGHT_MIN/4),width: (WIDTH_MIN/ 2.3),borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor:cardcolor}}> 
            <Image source={{uri: itemSearched.profileImage}}  resizeMode="cover"
         style={{height:  (HEIGHT_MIN/4) ,width: (WIDTH_MIN/ 2.3),borderTopLeftRadius: 20, borderTopRightRadius: 20}}/> 
               
            </CardItem>
            
            <CardItem style={{height: HEIGHT_MIN/19, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor:cardcolor}}>
                <Left style={{flex:1}}>
                   <Text numberOfLines={1} style={[styles.name, {color:textcolor}]}>{itemSearched.name}</Text> 
                </Left>
            </CardItem>
           
            </Card>     
        </TouchableOpacity>
         )}
         )
  

    }
    
   

    return (
      <View style={{flex:1,backgroundColor:bgcolor }}>
       <View style={{flex:1,backgroundColor:'transparent',flexDirection: 'row'}}>
       <StatusBar
          backgroundColor='#2B32B2'
          barStyle="light-content"
        />
          
          <LinearGradient  colors={['#1488CC', '#2B32B2']} style={{width: 100 + '%', height: 100 +'%',}}
            start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
           <View style={{width: 100 + '%', height: 100 +'%',alignItems:'center', justifyContent:'center'}}>
              <View  style={{width:WIDTH_MIN/1.1,backgroundColor:'#fff', margin:'auto',height: 60+'%',borderRadius:30, alignItems:'center',  flexDirection:'row'}}>
                 
                 
               
                  <Item>
                  <Icon name={"search"} size={24} style={{paddingLeft:5, paddingRight:3}} />
                 
                    <Input
                     placeholder="Search" 
                     value={this.state.searchInput}
                     onChangeText={this.handleSearch}
                     style={{fontFamily:'Quicksand-Medium'}}/>
                  </Item>
               
              </View>
            
           </View>
 
         </LinearGradient> 
         </View>
         <View  style={{flex:10, backgroundColor:bgcolor}}>
        <ScrollView>
        
        <View style={{flex:1,flexDirection:'row',marginTop:HEIGHT_MIN/35, flexWrap: 'wrap', justifyContent:'space-evenly', }}>
                {profileItem}
        </View>
	   	</ScrollView>
       <View style={{position:'absolute', bottom:0}}>
       <BannerView
        placementId="1911005745652403_1926372790782365"
        type="standard"
       
      />
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

export default connect(mapStateToProps, {getSingleUser, getSearchedUser})(SearchScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  name:{
    
    fontSize: TEXTSIZE/24,
    flex:1,
    fontFamily:'Quicksand-Medium'
  }
});