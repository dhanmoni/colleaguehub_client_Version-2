import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView, Dimensions, TouchableOpacity,FlatList, TextInput,ImageBackground, AsyncStorage, Image, NetInfo, TouchableWithoutFeedback } from 'react-native'
import Spinner from 'react-native-spinkit'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae, Hoshi } from 'react-native-textinput-effects';
import { withNavigation } from 'react-navigation';
import {BannerView} from 'react-native-fbads'


import {connect} from 'react-redux'
import {setCurrentUserWithProfile, getAllUsers, getAllCollegues} from '../redux/actions/authAction'
const ACCESS_TOKEN = 'Access_Token'
const HEIGHT = Dimensions.get('window').height
const TEXTSIZE = Dimensions.get('window').width ;
const WIDTH = Dimensions.get('window').width ;

class CreateProfile extends Component {

    static navigationOptions={
        header:null
    }
   constructor(props){
      super(props);
      this.state={
        institution:'',
        status:'',
        residence:'',
        bio:'',
        ig_username:'',
        token: '',
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
    render() {
      const {user, loading, } = this.props.auth
      if(loading){
       return(
         <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
           <Spinner color={'#E239FC'} size={50} type={"Wave"}/>
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
      <View  style={{position:'relative', flex:1}}>
      
      <ImageBackground resizeMode='cover' blurRadius={3}  source={require('../images/bg_image.jpg')} style={{flex:1, position:'absolute', top:0, left:0, right:0, bottom:0, }}> 
      </ImageBackground>
     
      <ScrollView style={{flex:1,backgroundColor:'rgba(212,146, 255, 0.3)'}}>
      
        <View style={{flex: 1,
           backgroundColor: 'transparent',
           paddingHorizontal:10
          }}>
         
           <Text style={{fontSize:TEXTSIZE/13,
               color:'white',fontFamily:'Quicksand-Bold',
                marginTop:20,marginBottom:9}}>
                Welcome {user.first_name}

           </Text>
          <Text style={{fontSize:TEXTSIZE/16, 
            color:'white',
            fontFamily:'Quicksand-Bold',
            marginTop:20, marginBottom:20}}>
                Create Your Profile:
          </Text>



          <View style={{marginBottom:10}}>
          <Hoshi
             onChangeText={this.onTextChanged}
             value={this.state.institution}
              label={'Institution/Workplace'}
              borderColor={'#5472F0'}
              autoCorrect={false}
              
            />
            <View style={{position:'relative'}}>
            <Text   style={{marginTop:4,fontFamily:'Quicksand-Medium' , fontSize: 14, color:'white'}}>
               *Name of your school/college or work-place (required).
            </Text>
            <View style={{position:'absolute', top:0,left:0, right:0, backgroundColor:'#fff', borderBottomLeftRadius:10,
            borderBottomRightRadius:10, elevation:5}}>
             
           {this.renderSuggestions(suggestions)}
       
          
            </View>
            </View>
            
          </View>



          <View style={{marginBottom:10}}>
           
          <Hoshi
             onChangeText={(text) => this.setState({status: text})}
             label={'Status'}
             // this is used as active border color
             borderColor={'#5472F0'}
             
              autoCapitalize={'none'}
              autoCorrect={false}
              
            />
     
          
            <Text  style={{marginTop:4,fontFamily:'Quicksand-Medium' , fontSize: 14, color:'white'}}>
            *What do you do there? e.g, student, teacher, manager etc. (required)
             </Text>
          </View>
          {/* <BannerView
                placementId="1003442513171119_1003443479837689"
                type="rectangle"
              
              /> */}
          <View style={{marginBottom:10}}>
          <Hoshi
             onChangeText={(text) => this.setState({residence: text})}
              label={'Residence'}
              borderColor={'#5472F0'}
              autoCorrect={false}
            />
            <Text  style={{marginTop:4,fontFamily:'Quicksand-Medium' , fontSize: 14, color:'white'}}>
            *Your current location. (Optional)
             </Text>
         
            
          </View>
          <View style={{marginBottom:10}}>
           
          <Hoshi
             onChangeText={(text) => this.setState({ig_username: text})}
              label={'Instagram username'}
              borderColor={'#5472F0'}
              autoCorrect={false}
              
            />
          
            <Text  style={{marginTop:4,fontFamily:'Quicksand-Medium' , fontSize: 14, color:'white'}}>
            *Add your IG account if you have any.(Optional)
             </Text>
          </View>
          <View style={{marginBottom:10, marginTop:10}}>
            <Text style={styles.text}>Your Bio:</Text>
            <TextInput
              onChangeText={(text)=>{this.setState({bio:text})}}
              underlineColorAndroid="#fff"
              multiline={true}
              numberOfLines={3}
              style={{color:'white',fontFamily:'Quicksand-Medium',fontSize:22, textAlignVertical:'top'}}
              />
              <Text  style={{marginTop:4,fontFamily:'Quicksand-Medium' , fontSize: 14, color:'white'}}>*Tell us about yourself.</Text>
          </View>
          {
            this.state.institution == '' || null && this.state.status == '' || null ? (
              <View style={{flexDirection:'row', marginTop:10, justifyContent:'center', paddingBottom:50, width:WIDTH}}>
              <View
               style={{marginTop:30,marginBottom:120,width:'65%', margin:'auto', justifyContent:'center', opacity:0.6 }}>
                 <LinearGradient
                     colors={[ 'rgba(212, 19, 190,1)','rgba(212,146, 255, 1)', 'rgba(25, 181, 254, 1)']} style={{borderRadius:30, elevation:7, margin:'auto'}} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                  >
                <TouchableOpacity  activeOpacity={0.7}
                style={{ padding:15, flex:1, borderRadius:10}}
                     onPress={()=> {
                       alert('Workplace/institution and status is required!')
                       }}>
                  <Text 
                  style={{alignSelf:'center', color:'white', fontSize:TEXTSIZE/17, fontFamily:'Quicksand-Bold'}}>
                  Next
                  </Text>
                </TouchableOpacity>
                </LinearGradient>
              </View>
              </View>
            ):(
              <View style={{flexDirection:'row', marginTop:10, justifyContent:'center', paddingBottom:50, width:WIDTH}}>
              <View
               style={{marginTop:30,marginBottom:120,width:'65%', margin:'auto', justifyContent:'center' }}>
                 <LinearGradient
                     colors={[ 'rgba(212, 19, 190,1)','rgba(212,146, 255, 1)', 'rgba(25, 181, 254, 1)']} style={{borderRadius:30, elevation:7, margin:'auto'}} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                  >
                <TouchableOpacity  activeOpacity={0.7}
                style={{ padding:15, flex:1, borderRadius:10}}
                     onPress={()=> {
                       
                      
                       this.props.setCurrentUserWithProfile(this.state)
                       this.props.getAllUsers()
                     
                       }}>
                  <Text 
                  style={{alignSelf:'center', color:'white', fontSize:TEXTSIZE/17, fontFamily:'Quicksand-Bold'}}>
                  Next
                  </Text>
                </TouchableOpacity>
                </LinearGradient>
              </View>
              </View>
            )
          }
         
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

export default connect(mapStateToProps, {setCurrentUserWithProfile, getAllUsers, getAllCollegues})(withNavigation(CreateProfile));
const styles = StyleSheet.create({
  text:{
    color:'white',
    fontSize:20,
    marginBottom:5,
    fontFamily:'Quicksand-Bold'
  },
  suggestions:{
      color:'black',
      fontSize:17,
      marginBottom:3,
    padding:10,
   
      fontFamily:'Quicksand-Meduim'}
})

