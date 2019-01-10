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
import {setCurrentUserWithProfile, getAllUsers, getAllCollegues, } from '../redux/actions/profileAction'

const ACCESS_TOKEN = 'Access_Token'
const HEIGHT = Dimensions.get('window').height
const TEXTSIZE = Dimensions.get('window').width ;
const WIDTH = Dimensions.get('window').width ;

class CreateProfile1 extends Component {

    static navigationOptions={
        header:null
    }
   constructor(props){
      super(props);
      this.state={
        instagram:'',
        twitter:'',
        youtube:'',
        whatsapp:'',
        residence:'',
        token: '',
      //  suggestions:[],
      //  insname:[],
       hideModel:true
      }
    }
    
  
   
    async componentDidMount() {
      console.log('component did mount')
      // const institutionnames = this.props.auth.allUsers.map(name=> {
      //   return name.institution
      // })
     // const unique = [ ...new Set(institutionnames) ]
     
      const token = await AsyncStorage.getItem(ACCESS_TOKEN)
        if(token){
          console.log('token in createprofile is', token)
          this.setState({
            token,
            //suggestions: unique
          })
         
        } else {
          async()=> {
            const token2 = await AsyncStorage.getItem(ACCESS_TOKEN)
            console.log('No Token')
            console.log('Token2 is ', token2)
          }
        
        }
       
    }

    // onTextChanged=(text)=>
    //     { 
    //       this.setState({institution:text, hideModel:false})
    //       let insname = []
    //       if(text == null){
    //         return null
    //       } else {
    //         if(text.length > 0){
    //           insname = this.state.suggestions.sort().filter((item)=>{
    //             return item.toLowerCase().indexOf(text.toLowerCase()) !== -1
    //         })
    //         }
    //       this.setState(()=> ({insname}))
    //       }
          
    //     }
     
    // renderSuggestions = (suggestions)=> {
    //   if(this.state.insname && this.state.insname.length ==0) {
    //     return null
    //   }
    //   else if(this.state.hideModel==false){
    //     return(
    //       <FlatList
          
    //       data={suggestions}
    //      keyExtractor={(item)=> item.toString()}
    //       renderItem={({item}) => <View>{item}</View>}
    //   /> 
    //     )
        
    //   } else {
    //     return null
    //   }
    // }
    render() {
      const {user, loading, } = this.props.auth
      if(loading){
       return(
         <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
          <LinearGradient  colors={[ '#1488CC', '#2B32B2']} start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
            <Spinner color={'#fff'} size={50} type={"Circle"}/>
           </LinearGradient>
         </View>
       )
     }
   
    
    //  let suggestions =  this.state.insname.map(item=> {
    //    return(
    //    <TouchableOpacity activeOpacity={0.9} style={{flex:1}} onPress={()=> {
    //      this.setState({
    //        institution:item,
    //        insname:[]
    //      })
    //    }}>
    //       <Text style={styles.suggestions}>{item}</Text>
    //    </TouchableOpacity>
        
    //    )
      
    //  })

    return (
      <ScrollView style={{flex:1}}>
      <TouchableWithoutFeedback onPress={()=> {
        this.setState({hideModel:true})
      }}>
      <View  style={{ flex:1,}}>
     
     
      <LinearGradient style={{flex:10,}}  colors={[ '#1488CC', '#2B32B2']} start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
     
     <View style={{position:'absolute', right:-(WIDTH/1.2), top:-(WIDTH/1.2), width:WIDTH/0.7,height:WIDTH/0.7, borderRadius:WIDTH/1.4, borderColor:'#fff', opacity:0.15, backgroundColor: '#fff', }}>

     </View>
     <View style={{position:'absolute', left:-(WIDTH/2.6), top:-(WIDTH/2), width:WIDTH/1,height:WIDTH/1, borderRadius:WIDTH/2, borderColor:'#fff', opacity:0.101788, backgroundColor: '#fff', }}>

     </View>
     <View style={{position:'absolute', bottom:-(WIDTH/0.48),left:-(WIDTH/1), width:WIDTH/0.4,height:WIDTH/0.4, borderRadius:WIDTH/0.8, borderColor:'#fff', opacity:0.16, backgroundColor: '#fff', }}>

     </View>
        <View style={{flex: 1,
           backgroundColor: 'transparent',
           paddingHorizontal:10,
           
           
          }}>
         
           <Text style={{fontSize:TEXTSIZE/17,
               color:'white',fontFamily:'Quicksand-Bold',
                marginTop:20,marginBottom:9}}>
                Welcome {user.first_name}

           </Text>
           <View style={{flexDirection:'row', justifyContent:'space-between'}}>
           <Text style={{fontSize:TEXTSIZE/18, 
            color:'white',
            fontFamily:'Quicksand-Bold',
            marginTop:20, marginBottom:10}}>
                Create Your Profile :
          </Text>
          <Text style={{fontSize:TEXTSIZE/22, 
            color:'white',
            fontFamily:'Quicksand-Bold',
            marginTop:20, marginBottom:10}}>1/3</Text>
           </View>
         



          {/* <View style={{marginBottom:10}}>
          <Hoshi
            onChangeText={this.onTextChanged}
             value={this.state.institution}
              label={'Institution/Workplace'}
              borderColor={'#fff'}
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
            
          </View> */}


{/* 
          <View style={{marginBottom:10}}>
           
          <Hoshi
             onChangeText={(text) => this.setState({status: text})}
             label={'Status'}
             // this is used as active border color
             borderColor={'#fff'}
             
              autoCapitalize={'none'}
              autoCorrect={false}
              
            />
     
          
            <Text  style={{marginTop:4,fontFamily:'Quicksand-Medium' , fontSize: 14, color:'white'}}>
            *What do you do there? e.g, student, teacher, manager etc. (required)
             </Text>
          </View> */}
          
          <View style={{marginBottom:10}}>
          <Hoshi
             onChangeText={(text) => this.setState({residence: text})}
              label={'Your residence'}
              borderColor={'#fff'}
              autoCorrect={false}
            />
            <Text  style={{marginTop:4,fontFamily:'Quicksand-Medium' , fontSize: 14, color:'white'}}>
            *Where do you live? (Optional)
             </Text>
         
            
          </View>
          
          <View style={{}}>
          <View style={{flexDirection:'row', alignItems:'center',marginBottom:10, justifyContent:'flex-start'}}>
          <Text style={{fontSize:TEXTSIZE/22, 
            color:'white',
            fontFamily:'Quicksand-Bold',
            marginTop:10, marginBottom:10}}>Add Social Networks : </Text>
            <View style={{ marginTop:10, marginBottom:10,backgroundColor:'rgba(0, 255, 0, 0.4)', borderRadius:10}}>
            <Text style={{fontFamily:'Quicksand-Medium' ,padding:7, fontSize: TEXTSIZE/29, color:'white'}}>(Optional)</Text>

            </View>
          </View>
         
          <View>
            <Hideo
            iconClass={Icon}
            iconName={'instagram'}
            iconColor={'white'}
            placeholder={"Instagram username"}
           
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#2b32b2'}
            inputStyle={{ color: '#464949',fontFamily:'Quicksand-Medium',  }}
            style={{marginBottom:10, borderRadius:10}}
            
            onChangeText={(text=> this.setState({instagram: text}))}
          />
          </View>
          
          <View>
            <Hideo
            iconClass={Icon}
            iconName={'twitter'}
            iconColor={'white'}
            placeholder={"Twitter username"}
           
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#2b32b2'}
            inputStyle={{ color: '#464949',fontFamily:'Quicksand-Medium',  }}
            style={{marginBottom:10, borderRadius:10}}
            
            onChangeText={(text=> this.setState({twitter: text}))}
          />
          </View>
          
          <View>
            <Hideo
            iconClass={Icon}
            iconName={'youtube'}
            iconColor={'white'}
            placeholder={"Youtube channel name"}
           
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#2b32b2'}
            inputStyle={{ color: '#464949',fontFamily:'Quicksand-Medium',  }}
            style={{marginBottom:10, borderRadius:10}}
            
            onChangeText={(text=> this.setState({youtube: text}))}
          />
          </View>
          
          
          </View>
         
          
          {/* {
            this.state.institution == '' || null && this.state.status == '' || null ? (
              <View style={{flexDirection:'row', marginTop:10, justifyContent:'center', paddingBottom:50, width:WIDTH}}>
              <View
               style={{marginTop:30,marginBottom:HEIGHT,width:'65%', margin:'auto', justifyContent:'center', opacity:0.6 }}>
                 <LinearGradient
                     colors={[ '#2B32B2', '#2B32B2']} style={{ margin:'auto'}} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
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
               <View style={{flexDirection:'row', marginTop:10, justifyContent:'center', width:WIDTH}}>
              <View
               style={{marginTop:50,paddingBottom:HEIGHT/5,width:'25%', margin:'auto', justifyContent:'center' }}>
                 <LinearGradient
                 
                     colors={['#2B32B2', '#2B32B2']} style={{margin:'auto', borderRadius:20}} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                  >
                <TouchableOpacity  activeOpacity={0.7}
                style={{ padding:3, flex:1,borderColor:'#fff',borderWidth:2,borderRadius:20}}
                     onPress={async()=> {
                       
                       
                   this.props.clearError()
                  await this.props.setCurrentUserWithProfile(this.state)
                    this.props.navigation.navigate('CreateProfile2')
                   
                    }}>
                  <Text 
                  style={{alignSelf:'center', color:'white', fontSize:TEXTSIZE/22, fontFamily:'Quicksand-Bold'}}>
                 {
                   this.state.residence == '' && this.state.whatsapp=='' && this.state.instagram=='' &&this.state.twitter=='' &&this.state.youtube==''  ? (
                    <Text 
                    style={{alignSelf:'center', color:'white', fontSize:TEXTSIZE/22, fontFamily:'Quicksand-Bold'}}>
                    Skip
                    </Text>
                   ) : (
                    <Text 
                    style={{alignSelf:'center', color:'white', fontSize:TEXTSIZE/22, fontFamily:'Quicksand-Bold'}}>
                    Next
                    </Text>
                   )
                 }
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

export default connect(mapStateToProps, {setCurrentUserWithProfile, getAllUsers, getAllCollegues, clearError})(withNavigation(CreateProfile1));
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

