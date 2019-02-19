import React, { Component } from 'react'
import { StyleSheet, Text, View,TextInput, TouchableOpacity,ActivityIndicator,StatusBar, Image, Dimensions, ScrollView, AsyncStorage, Keyboard, Animated} from 'react-native'
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
      token:'', 
      inputWidth: new Animated.Value(0),
      opacity: new Animated.Value(0),
      opacity2: new Animated.Value(1),
      zIndex1: new Animated.Value(10),
      zIndex2: new Animated.Value(0),
      scrollY: new Animated.Value(0)
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

  increaseWidth =() => {
      
      
     Animated.parallel([
        
        Animated.timing(this.state.inputWidth, {
          toValue: WIDTH_MIN-40,
          duration:500
        }),
        Animated.timing(this.state.opacity, {
           toValue: 1,
           duration:200,
        }),
        Animated.timing(this.state.zIndex1, {
          toValue: 0,
          duration:100,
       }),
       Animated.timing(this.state.zIndex2, {
        toValue: 10,
        duration:100,
     }),
        Animated.timing(this.state.opacity2, {
          toValue: 0,
          duration:200,
       }),
      ]).start()
      //alert('inut')
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
   
    if(this.state.searchInput == '' || this.state.searchInput ==  null || this.state.searchInput ==  undefined){
      profileItem = ( <View style={{backgroundColor:bgcolor,flex:1, alignItems:"center", justifyContent:'center'}}><Text style={{color:textcolor, fontFamily:'Quicksand-Medium'}}>Your search result will appear here</Text></View> )
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
    
    const HEADER_FIRST_HEIGHT = HEIGHT_MIN/5
    const HEADER_LAST_HEIGHT = HEIGHT_MIN/11.5

    const headerHeight = this.state.scrollY.interpolate({
      inputRange:[0, (HEADER_FIRST_HEIGHT-HEADER_LAST_HEIGHT)],
      outputRange:[HEIGHT_MIN/6, HEIGHT_MIN/10],
      extrapolate:'clamp'
    })
    const headerRadius = this.state.scrollY.interpolate({
      inputRange:[0, HEADER_FIRST_HEIGHT-HEADER_LAST_HEIGHT],
      outputRange:[HEIGHT_MIN, HEIGHT_MIN-(HEIGHT_MIN/2)],
      extrapolate:'clamp'
    })
   
    const inputMargin = this.state.scrollY.interpolate({
      inputRange:[0, HEADER_FIRST_HEIGHT-HEADER_LAST_HEIGHT],
      outputRange:[(HEIGHT_MIN/6)-((HEIGHT_MIN/6)/1.4), (HEIGHT_MIN/10)-((HEIGHT_MIN/10)/1.3)],
      extrapolate:'clamp'
    })

    return (
      <View style={{flex:1,backgroundColor:bgcolor }}>
        <Animated.View style={{backgroundColor:'transparent', height:headerHeight , width:WIDTH_MIN, borderBottomLeftRadius:15, borderBottomRightRadius:15,overflow:'hidden'}}>
          <LinearGradient colors={[ '#00c6ff', '#0073ff']} style={{height:null, flex:1,}} start={{x: 0.2, y: 0.2}} end={{x: 0.65, y: 0.65}}>
            <Animated.View style={{alignItems:'center',flex:1, justifyContent:'center', }}>
              <Animated.View style={{opacity: this.state.opacity2,width:(HEIGHT_MIN/10)/1.5,height:(HEIGHT_MIN/10)/1.5, alignItems:'center', justifyContent:'center',backgroundColor:'#fff', elevation:10, borderRadius:30,position:'absolute', top: inputMargin }}>
              <Icon name="search" size={30} style={{}} color="#0073ff" onPress={()=> this.increaseWidth()}/>
              </Animated.View>
               <Animated.View style={{
                 
                 opacity:this.state.opacity,alignItems:"center", justifyContent:'center',  width: this.state.inputWidth, backgroundColor:'#fff',borderRadius:20, zIndex:this.state.zIndex2, height: (HEIGHT_MIN/10)/1.5,position:'absolute', top: inputMargin
                 }}>
               <Input
                  placeholder="Search Here!" 
                  value={this.state.searchInput}
                  onChangeText={this.handleSearch}
                  style={{fontFamily:'Quicksand-Medium',textAlign:'center',width:94+'%', flex:1 }}/>
               </Animated.View>
                
            </Animated.View>
          </LinearGradient>
        </Animated.View>
        <View style={{zIndex:1}}>
            <ScrollView   
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            style={{ marginTop:10, backgroundColor:bgcolor}}
              onScroll={Animated.event([{
                nativeEvent: {contentOffset:{y: this.state.scrollY}}
              }])}>
                <View style={{flex:1,flexDirection:'row', paddingBottom:HEIGHT_MIN/1, flexWrap: 'wrap', justifyContent:'space-evenly', }}>
                   {profileItem}
                </View> 
               

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



// <View style={{flex:1,backgroundColor:bgcolor,flexDirection: 'row'}}>
       
// <LinearGradient  colors={['#00c6ff', '#2B32B2']} style={{width: 100 + '%', height: 100 +'%',}}
//   start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
//  <View style={{width: 100 + '%', height: 100 +'%',alignItems:'center', justifyContent:'center'}}>
//     <View  style={{width:WIDTH_MIN/1.1,backgroundColor:'#fff', margin:'auto',height: 60+'%',borderRadius:30, alignItems:'center',  flexDirection:'row'}}>
//         <Item>
//         <Icon name={"search"} size={24} style={{paddingLeft:5, paddingRight:3}} />
       
          // <Input
          //  placeholder="Search" 
          //  value={this.state.searchInput}
          //  onChangeText={this.handleSearch}
          //  style={{fontFamily:'Quicksand-Medium'}}/>
//         </Item>
     
//     </View>
  
//  </View>

// </LinearGradient> 
// </View>

// <View  style={{flex:10, backgroundColor:bgcolor}}>
// <ScrollView style={{}}>

{/* <View style={{flex:1,flexDirection:'row',marginTop:HEIGHT_MIN/35, flexWrap: 'wrap', justifyContent:'space-evenly', }}>
      {profileItem}
</View> */}
// </ScrollView>

// </View>