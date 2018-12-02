import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView, Dimensions, TouchableOpacity,ToastAndroid, TextInput,Image, ImageBackground, AsyncStorage, NetInfo, FlatList, TouchableWithoutFeedback } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5'
const ACCESS_TOKEN = 'Access_Token'
import Spinner from 'react-native-spinkit'

import {connect} from 'react-redux'
import {getCurrentProfile, updateUserProfile, getAllCollegues} from '../redux/actions/authAction'
import { Hideo } from 'react-native-textinput-effects';
const TEXTSIZE = Dimensions.get('window').width ;
import { InterstitialAdManager } from 'react-native-fbads';

class EditProfile extends Component {

  static navigationOptions = {
    header: null, 

  }
    constructor(props){
      super(props);
      this.state={
        institution: '',
        status:'',
        residence:'',
        bio:'',
        ig_username:'',
        token:'',
        suggestions:[],
        insname:[],
        hideModel:true
      }
    }
    async componentDidMount() {

      const institutionnames = this.props.auth.allUsers.map(name=> {
        return name.institution
      })
      const unique = [ ...new Set(institutionnames) ]
      
          const token = await AsyncStorage.getItem(ACCESS_TOKEN)
          if(token){
            this.setState({
              token,
              suggestions: unique
            })
          }
          this.props.getCurrentProfile(this.state.token)
           this.setState({
             institution:this.props.auth.userInfo.institution,
             status:this.props.auth.userInfo.status,
            ig_username:this.props.auth.userInfo.ig_username,
             residence:this.props.auth.userInfo.residence,
             bio:this.props.auth.userInfo.bio,
    
           })
       
      
     
      
    }

    onTextChanged=(text)=>
    { 
      this.setState({institution:text, hideModel:false})
      let insname = []
      if(text.length > 0){
        insname = this.state.suggestions.sort().filter((item)=>{
          return item.toLowerCase().indexOf(text.toLowerCase()) !== -1
      })
      }
    this.setState(()=> ({insname}))
    }
    
    renderSuggestions = (suggestions)=> {
      if(this.state.insname && this.state.insname.length ==0) {
        return null
      }
      else if(this.state.hideModel==false){
        return(
          <View style={{flex:1}}>
            <Text style={{textAlign:'center', fontSize:13, fontFamily:'Quicksand-Regular'}}>Recommendations are based on other user inputs</Text>
          <FlatList
          style={{zIndex:10000}}
          data={suggestions}
         keyExtractor={(item)=> item.toString()}
          renderItem={({item}) => <View>{item}</View>}
      /> 
      </View>
      
        )
        
      } else {
        return null
      }
    }
    
        
  render() {
   const {user, loggedIn, userInfo, loading} = this.props.auth
   if(loading){
    return(
      <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
        <Spinner color={'rgba(255,95, 155, 1)'} size={50} type={"ThreeBounce"}/>
      </View>
    )
  }

  let suggestions =  this.state.insname.map(item=> {
    return(
    <TouchableOpacity activeOpacity={0.9} style={{flex:1}} onPress={()=> {
      this.setState({
        institution:item,
        insname:[]
      })
    }}>
       <Text style={styles.suggestions}>{item}</Text>
    </TouchableOpacity>
     
    )
   
  })

    return (
      <TouchableWithoutFeedback onPress={()=> {
        this.setState({hideModel:true})
      }}>
      
      <View style={{position:'relative', flex:1}}>
      
      <ImageBackground resizeMode='cover'  source={require('../images/Background_Login_3-min.jpg')} style={{ position:'absolute', top:0, left:0, right:0, bottom:0}}> 
      </ImageBackground>
      <ScrollView  nestedScrollEnabled={true} style={{ backgroundColor: 'transparent',}}>
      <View >
     
        
        <LinearGradient 
                 colors={['rgba(212,146, 255, 0.5)', 'rgba(150, 180, 245, 0.5)']} style={{width: 100 + '%', height: 100 +'%',paddingHorizontal:6}} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.7}}
              >

          <Text style={{fontSize:TEXTSIZE/16, color:'white', marginTop:20, marginBottom:20,marginLeft:7, fontFamily:'Quicksand-Bold'}}>Edit Profile:</Text>
          <Text style={styles.label}>Institution/Workplace</Text>
          <View  style={{position:'relative'}}>
          
          <Hideo
        iconClass={Icon}
        iconName={'user-graduate'}
        iconColor={'white'}
        
        // this is used as backgroundColor of icon container view.
        iconBackgroundColor={'#128EFE'}
        inputStyle={{ color: '#464949',fontFamily:'Quicksand-Medium', }}
        onChangeText={this.onTextChanged}
             value={this.state.institution}
      style={{marginBottom:5, borderRadius:10}}
      />
       <View style={{position:'absolute', top:48,left:0, right:0, backgroundColor:'#fff', borderBottomLeftRadius:10,
            borderBottomRightRadius:10, elevation:5, zIndex:10000, flex:1}}>
             
           {this.renderSuggestions(suggestions)}
          
          
            </View>
            </View>
      <Text style={styles.label}>Status</Text>
        <Hideo
    iconClass={Icon}
    iconName={'briefcase'}
    iconColor={'white'}
    // this is used as backgroundColor of icon container view.
    iconBackgroundColor={'#128EFE'}
    inputStyle={{ color: '#464949',fontFamily:'Quicksand-Medium',  }}
    style={{marginBottom:5, borderRadius:10}}
    value={this.state.status}
    onChangeText={(text=> this.setState({status: text}))}
  />
  <Text style={styles.label}>Residence</Text>
    <Hideo
    iconClass={Icon}
    iconName={'map-marker'}
    iconColor={'white'}
    // this is used as backgroundColor of icon container view.
    iconBackgroundColor={'#128EFE'}
    value={this.state.residence}
    onChangeText={(text=> this.setState({residence: text}))}
    inputStyle={{ color: '#464949', fontFamily:'Quicksand-Medium', }}
    style={{marginBottom:5,}}
  />

      <Text style={styles.label}>Instagram Username</Text>
    <Hideo
    iconClass={Icon}
    iconName={'instagram'}
    iconColor={'white'}
    iconBackgroundColor={'#128EFE'}
    value={this.state.ig_username}
    onChangeText={(text=> this.setState({ig_username: text}))}
    inputStyle={{ color: '#464949', fontFamily:'Quicksand-Medium', }}
    style={{marginBottom:5,}}
  />

  <Text style={{ color:'white',
    fontSize:TEXTSIZE/21.4,
    fontFamily:'Quicksand-Bold',
    marginTop:8,
    marginBottom:6,
    marginLeft:5}}>Bio</Text>
     <View style={{backgroundColor:'#fff',flexDirection:'row', }}>
      <View style={{justifyContent:'center', alignItems:'center',position:'absolute',top:0, left:0, bottom:0,backgroundColor:'#128efe', width:60, zIndex:100}}>
         <Icon name="info-circle" size={25} color='white' style={{width:60,  backgroundColor:'#128efe',textAlign:'center', zIndex:1001}}/>
      </View>
      <TextInput
      style={{color: '#464949',fontSize:22,marginLeft:66, fontFamily:'Quicksand-Medium',padding:0, flex:1, textAlignVertical:'top'}}
       multiline={true}
       numberOfLines={8}
       value={this.state.bio}
       onChangeText={(text) => this.setState({bio: text})}
         value={this.state.bio}
        editable = {true}
        
      />
  </View>
 
          
          <View style={{flexDirection:'row', marginTop:40, justifyContent:'space-around', paddingBottom:50}}>
          <View style={{width:'45%',zIndex:100}}>
          <LinearGradient 
                 colors={['rgba(255,95, 155, 1)','rgba(255, 136, 140, 1)', 'rgba(255, 174, 104, 1)']} style={{borderRadius:12, elevation:9}} start={{x: 0.2, y: 0.5}} end={{x: 1, y: 0.5}}
              >
        <TouchableOpacity activeOpacity={0.9} style={{borderRadius:12, backgroundColor:'transparent',padding:10, borderRadius:10}} 
        onPress={()=>{ 
          this.props.navigation.navigate('User')
          InterstitialAdManager.showAd('1911005745652403_1935493166536994')
          }}>
          <Text style={{alignSelf:'center', color:'white', fontSize:TEXTSIZE/21,fontFamily:'Quicksand-Bold'}}>Cancel</Text>
        </TouchableOpacity>
        </LinearGradient>
        </View>
           <View style={{width:'45%',zIndex:100}}>
            <LinearGradient 
                 colors={[ 'rgba(212, 19, 190,1)','rgba(212,146, 255, 1)', 'rgba(150, 180, 245, 1)']} style={{borderRadius:12, elevation:9}} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
              >

            <TouchableOpacity activeOpacity={0.8} style={{borderRadius:12, backgroundColor:'transparent', padding:10, borderRadius:10, flex:1}} onPress={
              ()=>{ 
               
                this.props.updateUserProfile(this.state);
               if(this.state.token == null || undefined) {
                
                 alert('Something went wrong!')
                 
               }
               else if (this.state.institution == '' && this.state.status == ''  ){
                alert('Institution and Status is required!')
               }
              
               else {
                
                this.props.navigation.navigate('User')
               ToastAndroid.show('Profile updating...', ToastAndroid.LONG)
               ToastAndroid.show('Profile is updated', ToastAndroid.SHORT)
                InterstitialAdManager.showAd('1911005745652403_1926087667477544')
            

               }
              }
              
              }>
              <Text style={{alignSelf:'center', color:'white', fontSize:TEXTSIZE/21,fontFamily:'Quicksand-Bold'}}>Save</Text>
            </TouchableOpacity>
        </LinearGradient>
        </View>
        </View> 
         
          </LinearGradient>
         
          
       </View>
       </ScrollView>
       </View>
       </TouchableWithoutFeedback>
      
    )
  }
}

const mapStateToProps = (state)=> {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps, {getCurrentProfile, updateUserProfile, getAllCollegues})(EditProfile);
const styles = StyleSheet.create({
  label:{
    color:'white',
    fontSize:TEXTSIZE/21.4,
    fontFamily:'Quicksand-Bold',
    marginTop:8,
   
    marginLeft:5
  },
  suggestions:{
    color:'black',
    fontSize:17,
    marginBottom:3,
    padding:10,
    fontFamily:'Quicksand-Meduim'}
})

















