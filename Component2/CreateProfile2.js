import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView, Dimensions, TouchableOpacity,FlatList, TextInput,ImageBackground, AsyncStorage, Image, NetInfo, TouchableWithoutFeedback } from 'react-native'
import Spinner from 'react-native-spinkit'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5'

import { Sae, Hoshi,Hideo } from 'react-native-textinput-effects';
import { withNavigation } from 'react-navigation';
import {BannerView} from 'react-native-fbads'


import {connect} from 'react-redux'
import { clearError} from '../redux/actions/authAction'
import {setCurrentProfileWithPublicInstitution, getAllUsers, getAllCollegues} from '../redux/actions/profileAction'

const ACCESS_TOKEN = 'Access_Token'
const HEIGHT = Dimensions.get('window').height
const TEXTSIZE = Dimensions.get('window').width ;
const WIDTH = Dimensions.get('window').width ;

class CreateProfile2 extends Component {

    static navigationOptions={
        header:null
    }
   constructor(props){
      super(props);
      this.state={
       institution_name:'',
       description:'',
        token: '',
       suggestions:[],
       insname:[],
       hideModel:true
      }
    }
    
  
   
    async componentDidMount() {
    
      const institutions = this.props.auth.allGroups.map(group=> {
        return group.institution_name
      })

      const token = await AsyncStorage.getItem(ACCESS_TOKEN)
        if(token){
          console.log('token in createprofile is', token)
          this.setState({
            token,
           suggestions:institutions
          })
          console.log(this.state.token)
         
        } else {
          console.log('No token')
        
        }
       
    }

    onTextChanged=(text)=>
        { 
          this.setState({institution_name:text, hideModel:false})
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
    render() {
      const {user, loading,errors } = this.props.auth
      if(loading){
       return(
         <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
          <LinearGradient  colors={[ '#00c6ff', '#0073ff']} start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
            <Spinner color={'#fff'} size={50} type={"Circle"}/>
           </LinearGradient>
         </View>
       )
     }
   
    
     let suggestions =  this.state.insname.map(item=> {
       return(
       <TouchableOpacity activeOpacity={0.9} style={{flex:1}} onPress={()=> {
         this.setState({
           institution_name:item,
           insname:[]
         })
       }}>
          <Text style={styles.suggestions}>{item}</Text>
       </TouchableOpacity>
        
       )
      
     })

    return (
      <ScrollView style={{flex:1}}>
      <TouchableWithoutFeedback onPress={()=> {
        this.setState({hideModel:true})
      }}>
           

      <View  style={{ flex:1,}}>
      <LinearGradient style={{flex:1,}}  colors={['#00c6ff', '#0073ff']} start={{x: 0.2, y: 0.2}} end={{x: 0.65, y: 0.65}} >
     
     
        <View style={{flex: 1,
           backgroundColor: 'transparent',
           paddingHorizontal:10,
           
           
          }}>
          <View style={{position:'absolute', right:-(WIDTH/1.2), top:-(WIDTH/1.2), width:WIDTH/0.7,height:WIDTH/0.7, borderRadius:WIDTH/1.4, borderColor:'#fff', opacity:0.15, backgroundColor: '#fff', }}>

</View>
<View style={{position:'absolute', left:-(WIDTH/2.6), top:-(WIDTH/2), width:WIDTH/1,height:WIDTH/1, borderRadius:WIDTH/2, borderColor:'#fff', opacity:0.101788, backgroundColor: '#fff', }}>

</View>
<View style={{position:'absolute', bottom:-(WIDTH/0.48),left:-(WIDTH/1), width:WIDTH/0.4,height:WIDTH/0.4, borderRadius:WIDTH/0.8, borderColor:'#fff', opacity:0.16, backgroundColor: '#fff', }}>

</View>
         <View style={{position:'absolute', top:10, left:10, paddingBottom:10}}>
             <Icon onPress={()=> this.props.navigation.navigate('CreateProfile1')} name="chevron-circle-left" color="#fff" size={30}/>
         </View>
         <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:30}}>
           <Text style={{fontSize:TEXTSIZE/18, 
            color:'white',
            fontFamily:'Quicksand-Bold',
            marginTop:20, marginBottom:10}}>
                Create Your Profile :
          </Text>
          <Text style={{fontSize:TEXTSIZE/22, 
            color:'white',
            fontFamily:'Quicksand-Bold',
            marginTop:20, marginBottom:10}}>2/3</Text>
           </View>



           <View style={{marginBottom:10}}>
          <Hoshi
            onChangeText={this.onTextChanged}
             value={this.state.institution_name}
              label={'Institution/Group Name'}
              borderColor={'#fff'}
              autoCorrect={false}
              
            />
            <View style={{position:'relative'}}>
            <Text   style={{marginTop:4,fontFamily:'Quicksand-Medium' , fontSize: 14, color:'white'}}>
               *Name of your group/institution/company (required).
            </Text>
            {
                errors.institution == null ? (
                  <View></View>
                ): (
                  <View style={{width:100+'%', backgroundColor: 'rgba(255, 0, 0, 0.6)', borderRadius:5}}>
                    <Text style={{color:'#fff',padding:10, textAlign:'center'}}>{errors.institution}</Text>
                  </View>
                )
              }
            <View style={{position:'absolute', top:0,left:0, right:0, backgroundColor:'#fff',zIndex:100, borderBottomLeftRadius:10,
            borderBottomRightRadius:10, elevation:5}}>
             
           {this.renderSuggestions(suggestions)}
       
          
            </View>
            </View>
            
          </View> 


 
          <View style={{marginBottom:10}}>
           
          <Hoshi
             onChangeText={(text) => this.setState({description: text})}
             label={'Short Description'}
             borderColor={'#fff'}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
     
          
            <Text  style={{marginTop:4,fontFamily:'Quicksand-Medium' , fontSize: 14, color:'white'}}>
            *What do you do there? e.g, student, teacher, manager etc. (optional)
             </Text>
          </View> 
          
          <View style={{marginTop:10, backgroundColor:'rgba(0,255,0, 0.4)', borderRadius:10}}>
           
         
             <Text  style={{padding:8,fontFamily:'Quicksand-Bold' , fontSize: 16, color:'white'}}>
             *You will be able to add more institutions/groups later!
              </Text>
           </View> 
          
          
          
         
          
          {/* {
            this.state.institution == '' || null && this.state.status == '' || null ? (
              <View style={{flexDirection:'row', marginTop:10, justifyContent:'center', paddingBottom:50, width:WIDTH}}>
              <View
               style={{marginTop:30,marginBottom:HEIGHT,width:'65%', margin:'auto', justifyContent:'center', opacity:0.6 }}>
                 <LinearGradient
                     colors={[ '#0073ff', '#0073ff']} style={{ margin:'auto'}} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                  >
                <TouchableOpacity  activeOpacity={0.7}
                style={{ padding:8, flex:1,borderColor:'#fff',borderWidth:2,borderRadius:20}}
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
            ):( */}
               <View style={{flexDirection:'row', marginTop:50, justifyContent:'center', width:WIDTH}}>
              <View
               style={{marginTop:50,paddingBottom:HEIGHT/2.5,width:'25%', margin:'auto', justifyContent:'center' }}>
                 <LinearGradient
                 
                     colors={['#0073ff', '#0073ff']} style={{margin:'auto', borderRadius:20}} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                  >
                <TouchableOpacity  activeOpacity={0.7}
                style={{ padding:3, flex:1,borderColor:'#fff',borderWidth:2,borderRadius:20}}
                     onPress={async()=> {
                       
                      
                   this.props.clearError()
                  await this.props.setCurrentProfileWithPublicInstitution(this.state)
                    this.props.navigation.navigate('UploadAvatar')
                   
                    }}>
                  <Text 
                  style={{alignSelf:'center', color:'white', fontSize:TEXTSIZE/22, fontFamily:'Quicksand-Bold'}}>
                 
                    <Text 
                    style={{alignSelf:'center', color:'white',fontSize:TEXTSIZE/22, fontFamily:'Quicksand-Bold'}}>
                    Next
                    </Text>
                   
                 
                  </Text>
                </TouchableOpacity>
                </LinearGradient>
              </View>
              </View>
            
         
       </View>
     
      
     
       </LinearGradient>
      </View>
     
      </TouchableWithoutFeedback>
      </ScrollView>
      
    )
  }
}

const mapStateToProps = (state)=> {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps, {setCurrentProfileWithPublicInstitution, getAllUsers, getAllCollegues, clearError})(withNavigation(CreateProfile2));
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

