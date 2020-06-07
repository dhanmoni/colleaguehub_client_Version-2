import React, { Component } from 'react'
import {StyleSheet, Text, View, TouchableOpacity,ActivityIndicator,ToastAndroid, Image, Dimensions,ImageBackground,StatusBar, ScrollView,TextInput, Button, Alert, AsyncStorage, FlatList, NetInfo, Easing, Animated,TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux'
import { Container, Header, Content, ListItem, Radio, Right, Left } from 'native-base';
import Modal from 'react-native-modal'
import {getAllUsers, getSingleUser, getAllCollegues, removeLoading} from '../redux/actions/profileAction'
import {  getposts, addpost, deletepost, addpostwithImage} from '../redux/actions/postAction'
import Icon from 'react-native-vector-icons/FontAwesome'
let HEIGHT_MIN = Dimensions.get('window').height;
let WIDTH_MIN = Dimensions.get('window').width;
let WIDTH = Dimensions.get('window').width;
const TEXTSIZE = Dimensions.get('window').width ;
const ACCESS_TOKEN = 'Access_Token'
import ImagePicker from 'react-native-image-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Spinner from 'react-native-spinkit'

const options = {
  title: 'Select Image',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallary',
  quatity:0.4
};

 
const radio_props = [
  {label: '24 hours', value: 0, time:86400000 },
  {label: '3 days (72 hours)', value: 1, time:259200000 },
  {label: '7 days (168 hours)', value: 2, time:604800000 },
  {label: 'Custom', value: 3, pro:true }
];
 

class PostScreen extends Component {
    static navigationOptions={
        header:null
    }

  constructor(props){
    super(props);
    this.state={
      token:'',
      page:1,
      loading:false,
      refreshing:false,
      text:'',
      name:'',
      profileImage:'',
      isLoading:false,
      postImage:null,
     response:null, 
     myGroups:[],
     selectedGroupsForPost:[],
     groupsNames:[],
     selectColor:"#fff",
     lifespan:0,
     lifeSpanforPost:0,
     showPicker: false,
     days:null,
     hours:null,
     minutes:null,
     showError1:false,
     showError2:false,
     showError3:false,
     showCustomTimeError:false
    }
  }
  async componentDidMount() {
      

        

          const token = await AsyncStorage.getItem(ACCESS_TOKEN)
        if(token){
          this.setState({
            loading:true,
            token,
            name: this.props.auth.user.name,
            profileImage: this.props.auth.user.profileImage,
            lifeSpanforPost: 86400000 
          })
          console.log(token)
        }  
        const names = this.props.auth.userInfo.institution.filter(name=> {
          this.state.myGroups.push(name)
        })
        console.log('state 1==', this.state.myGroups)
        console.log('state 2==', this.state.selectedGroupsForPost)
        console.log('state 3==', this.state.groupsNames)
        this.props.auth.userInfo.activeGroup.filter(name=> {
          console.log('groups name =', name)
          this.state.selectedGroupsForPost.push(name.institution_name)
          this.state.groupsNames.push(name.institution_name)
          this.props.removeLoading()
          console.log(this.state.groupsNames)
        })
        
       
    
  }


  

     
      onTextChange =(text)=> {
        this.setState({text})
      }

      selectphoto(){
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
         
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } 
           else {
            const source = { uri: 'data:image/jpeg;base64,' + response.data  };
         
           
         //console.log(response.fileName)
            this.setState({
              postImage: source,
            response: response
            });
           // console.log(this.state.postImage)
          }
        });
      }

      
    render() {
      const {user, loggedIn,allCollegues, loading, userInfo, posts, post}= this.props.auth
  
    const removeByAttr = function(arr, attr, value){
      console.log('arr=', arr)
      console.log('attr=', attr)
      console.log('value=', value)
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
   

    if(loading){
      
      return(
        <View style={{flex: 1,}}>
        <View style={{backgroundColor:'transparent',flexDirection: 'row', height: HEIGHT_MIN/10, width:WIDTH_MIN, borderBottomLeftRadius:15, borderBottomRightRadius:15,overflow:'hidden'}}>
         <LinearGradient  colors={['#00c6ff', '#0073ff']} style={{width: 100 + '%', height: 100 +'%',}}  start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
         <View style={{flexDirection:'row', alignItems:'center',width: 100 + '%', height: 100 +'%',justifyContent:'center', paddingHorizontal:20}}>
             <Icon style={{position:"absolute",marginTop:20, left:20, zIndex:100000}} name="chevron-circle-left" size={26} color="#fff" onPress={()=> this.props.navigation.navigate('StoryScreen')}/>
             <View> 
             <Text numberOfLines={1} style={{fontSize:27, fontFamily:'Quicksand-Bold',textAlign:'center' ,color:'#fff',}}>ColleagueHub</Text>
             </View>
           
                 
             </View>
 
         </LinearGradient> 
         </View>
         <View style={{ justifyContent:'center',alignItems:'center',flex:1, backgroundColor:"#fff"}}>
         <Spinner color={'#0073ff'} size={50} type={"Circle"}/>
         </View>
       
       </View>
      )
    }
  
    let textcolor;
    let cardcolor;
    let iconcolor;
    
    if(this.props.auth.nightmode == true){
     
      textcolor= '#fff'
      cardcolor='#424242'
      iconcolor='#fff'
    } else {
     
      textcolor= '#333'
      cardcolor='#fff'
      iconcolor='#0073ff'
    }

   


    return (
     
      <View style={{flex:1,backgroundColor:"#fff" }}> 
     
      <View style={{backgroundColor:'transparent',flexDirection: 'row', height: HEIGHT_MIN/10, width:WIDTH_MIN, borderBottomLeftRadius:15, borderBottomRightRadius:15,overflow:'hidden'}}>
         <LinearGradient  colors={['#00c6ff', '#0073ff']} style={{width: 100 + '%', height: 100 +'%',}}  start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
         <View style={{flexDirection:'row', alignItems:'center',width: 100 + '%', height: 100 +'%',justifyContent:'center', paddingHorizontal:20}}>
             <Icon style={{position:"absolute",marginTop:20, left:20, zIndex:100000}} name="chevron-circle-left" size={26} color="#fff" onPress={()=> this.props.navigation.navigate('StoryScreen')}/>
             <View> 
             <Text numberOfLines={1} style={{fontSize:27, fontFamily:'Quicksand-Bold',textAlign:'center' ,color:'#fff',}}>ColleagueHub</Text>
             </View>
           
                 
             </View>
 
         </LinearGradient> 
         </View>
          
       <View style={{marginTop:HEIGHT_MIN/50, }}>
       <ScrollView style={{marginBottom:30}} showsVerticalScrollIndicator={false}>
            <View>
              <Text style={{ color:textcolor,
                    fontSize: TEXTSIZE/24,
                    marginLeft:10,
                    padding:15,
                    fontFamily:'Quicksand-Medium'}}>
                 Hi {user.first_name}, Post Something Here.
               </Text>
            </View>
            <View style={{marginHorizontal:7, borderRadius:8, margin:4, position:'relative', backgroundColor:cardcolor}}>
                <TextInput
                value={this.state.text}
                onChangeText={this.onTextChange}
                numberOfLines={5}
                selectionColor="#0073ff"
                underlineColorAndroid='transparent'
                multiline={true}
                style={{borderRadius:8,textAlignVertical:'top', borderWidth:0.4, color:textcolor, fontSize:TEXTSIZE/22,fontFamily:'Quicksand-Regular',padding:15,marginHorizontal:10}}
                />
                <Icon onPress={()=> this.selectphoto()} name="image" size={30} style={{position:'absolute', bottom:3, right:15}} color={iconcolor}/>
            </View>
            <View style={{width:100+'%', alignItems:'center', justifyContent:'center'}}>
              {/* <TouchableOpacity style={{backgroundColor:'#4776e6',alignItems:'center',justifyContent:'center', borderRadius:10,width:45+'%' , marginTop:5}} onPress={()=> this.selectphoto()}>
                <Text style={{textAlign:'center', color:'#fff', padding:10}}>Select a photo</Text>
              </TouchableOpacity> */}
              
              {
                this.state.postImage == null ? (
                  <View>

                  </View>
                ) :( 
                  
                    <View style={{}}>
                    <Image source={this.state.postImage} style={{ marginBottom:12,height:TEXTSIZE,width:TEXTSIZE, marginTop:12}}/>
                  </View>
                  
                )
              }
             
            </View>

                <View style={{marginTop:30}}>
                  <View style={{}}>
                    <Text style={{ color:textcolor,
                    fontSize: TEXTSIZE/25,
                    marginLeft:15,
                    padding:3,
                    fontFamily:'Quicksand-Medium'}}>Choose post life span :</Text>
                  </View>
                  <View >
                      

                  {
                    radio_props.map((data, key) => {
                      
                        return (
                          
                                  <ListItem key={key}
                                   style={{marginTop:0,paddingTop:0,
                                    paddingBottom:0, marginBottom:0,
                                    opacity : data.value ==3 && userInfo.pro ==true ? 0.6 :1,
                                   
                                    }}>
                                    <TouchableOpacity
                                     style={{flexDirection:'row',justifyContent:'space-between', padding:5}} activeOpacity={0.8}
                                     onPress={async()=>{
                                       if( data.value ==3 && userInfo.pro ==false){
                                        this.setState({showCustomTimeError: true})
                                        ToastAndroid.show('Only PRO users can use this feature!', ToastAndroid.SHORT)
                                       }
                                       else if( data.value ==3 && userInfo.pro ==true){
                                        console.log('PRO')
                                         this.setState({lifespan:data.value, showPicker:true})
                                          
                                       }
                                       else {
                                        this.setState({lifespan:data.value, lifeSpanforPost:data.time}, ()=> {
                                          console.log('selected =', this.state.lifeSpanforPost)
                                        })
                                       
                                       }
                                        }}>
                                    <Left>
                                        <Text style={{
                                           color:textcolor,
                                            fontSize: TEXTSIZE/26,
                                            padding:1,
                                            fontFamily:'Quicksand-Medium'}}>{data.label}</Text>
                                    </Left>
                                    <Right>
                                        <Radio
                                            onPress={async()=>{
                                              if( data.value ==3 && userInfo.pro ==false){
                                               this.setState({showCustomTimeError: true})
                                               ToastAndroid.show('Only PRO users can use this feature!', ToastAndroid.SHORT)
                                              }
                                              else if( data.value ==3 && userInfo.pro ==true){
                                               console.log('PRO')
                                                this.setState({lifespan:data.value, showPicker:true})
                                                 
                                              }
                                              else {
                                               this.setState({lifespan:data.value, lifeSpanforPost:data.time}, ()=> {
                                                 console.log('selected =', this.state.lifeSpanforPost)
                                               })
                                              
                                              }
                                               }}
                                            color={"#000"}
                                            
                                            selectedColor={"#0073ff"}
                                            selected={data.value === this.state.lifespan}
                                          />
                                    </Right>
                                    </TouchableOpacity>
                                   
                                  </ListItem>
                                )
                      })}
                     {
                  this.state.showCustomTimeError ? (
                    <TouchableOpacity activeOpacity={0.88}
                     style={{marginTop:15, backgroundColor:'rgba(255,0, 0, 0.6)', flexDirection:'row', marginHorizontal:10, borderRadius:10}} 
                    onPress={()=> alert('Pro')}
                    >
                    <Text style={{textAlign:'center', fontSize:17,padding:5, color:'#fff', fontFamily:'Quicksand-Medium'}}>PRO licence is required! Click here to get one.</Text>
                    
                   
                  </TouchableOpacity>
                  ) : (null)
                }

                      <View style={{marginTop:10,}}>
                      <View style={{}}>
                    <Text style={{ color:textcolor,
                    fontSize: TEXTSIZE/25,
                    marginLeft:15,
                    padding:3,
                    fontFamily:'Quicksand-Medium'}}>This will be posted to :</Text>
                  </View>
              <View style={{marginTop:10, width:100+'%', flex:1,margin:'auto', paddingHorizontal:10}}>

              <FlatList
          data={this.state.myGroups}
          key={item=> item.institution_name}
          extraData={this.state}
          ListEmptyComponent={()=> {
            return (
              <View>
              <Text>No Item</Text>
            </View>
            )
           
          }}
          renderItem={({item}) => {
            return (
            <View style={{paddingBottom:3, alignItems:'center',width:100+'%', justifyContent:'center' }}>
           
                  <TouchableOpacity activeOpacity={0.88}  style={{width:100+'%'}}
                   onPress={
                    this.state.groupsNames.includes(item.institution_name)? (
                      ()=> {
                        //removeByAttr(this.state.selectedGroupsForPost, 'institution_name', item.institution_name);
                        let index = this.state.groupsNames.indexOf(item.institution_name);

                        if (index > -1) {
                          this.state.groupsNames.splice(index, 1);
                        }
                        let index2 = this.state.selectedGroupsForPost.indexOf(item.institution_name);
                        if (index2 > -1) {
                          this.state.selectedGroupsForPost.splice(index, 1);
                        }
                      console.log('included selected post=', this.state.selectedGroupsForPost)
                      console.log('included group names post=', this.state.groupsNames)

                        this.setState({selectColor:'#fff'})
                      }
                    ): (
                    ()=> {
                      this.state.selectedGroupsForPost.push(item.institution_name)
                      this.state.groupsNames.push(item.institution_name)
                      console.log('was not included selected post=', this.state.selectedGroupsForPost)
                      console.log('was not included group names =', this.state.groupsNames)

                      this.setState({selectColor:'#0073ff'})
                    }  
                      
                    )
                  }
                  >
                  
                  {
                    this.state.groupsNames.includes(item.institution_name)? (
                      <View style={{backgroundColor:'#0073ff', width:100+'%', borderRadius:8, flexDirection:'row', alignItems:"center"}}>
                          <View style={{marginLeft:5,marginRight:5, alignItems:'center', justifyContent:'center'}}>
                          <Icon name="check" size={18} color="#fff"/>
                          </View>
  
                            <Text style={{fontSize:19,color:'#fff', fontFamily:'Quicksand-Bold',paddingLeft:10, padding:2,}}>{item.institution_name}</Text> 
                          
                      </View>
                    
                    ): (
                      <View style={{backgroundColor:"#fff", width:100+'%', borderRadius:8, flexDirection:'row', alignItems:'center',borderWidth:1, borderColor:'#0073ff'}}>
                      <View style={{marginLeft:5,marginRight:5, alignItems:'center', justifyContent:'center'}}>
                          <Icon name="circle" size={18} color={textcolor}/>
                          </View>
                      <View>
                      <Text style={{fontSize:19,color:textcolor, fontFamily:'Quicksand-Bold',paddingLeft:10, padding:2,}}>{item.institution_name}</Text>
                      </View>
                        
                      
                  </View>
                    )
                  
                  }
                 
                  </TouchableOpacity>
            </View>
                    
          ) 
        }} />
          
                </View>
                      </View>
   


                  {/* <ListItem selected={this.state.lifespan == 0} >
                    <Left>
                      <Text>24 hours</Text>
                    </Left>
                    <Right>
                      <Radio
                      onPress={() => this.setState({ lifespan: 0 })}
                      selected={this.state.lifespan == 0}
                        color={"#000"}
                        selectedColor={"#0073ff"}
                        selected={this.state.lifespan == 0}
                      />
                    </Right>
                  </ListItem>
                  <ListItem selected={this.state.lifespan == 1} >
                    <Left>
                      <Text>3 days : 72 hours</Text>
                    </Left>
                    <Right> */}
                      {/* <Radio
                       onPress={() => this.setState({ lifespan: 1 })}
                       selected={this.state.lifespan == 1}
                        color={"#000"}
                        selectedColor={"#0073ff"}
                        selected={this.state.lifespan == 1}
                      />
                    </Right>
                  </ListItem>
                  <ListItem selected={this.state.lifespan == 3} >
                    <Left>
                      <Text>7 days : 168 hours</Text>
                    </Left>
                    <Right>
                      <Radio
                       onPress={() => this.setState({ lifespan: 3 })}
                       selected={this.state.lifespan == 3}
                        color={"#000"}
                        selectedColor={"#0073ff"}
                        selected={this.state.lifespan == 3}
                      />
                    </Right>
                  </ListItem> */}
                  
                  </View>
                </View>

              
            <View style={{flexDirection:'row', marginTop:35, justifyContent:'space-around', marginBottom:50}}>
          <View style={{width:'45%',}}>
        
        <TouchableOpacity activeOpacity={0.9} style={{borderRadius:12, backgroundColor:'#c4cad3',padding:7, borderRadius:10}} 
        onPress={()=> this.props.navigation.navigate('StoryScreen')}>
          <Text style={{alignSelf:'center', color:'white', fontSize:TEXTSIZE/23,fontFamily:'Quicksand-Medium'}}>Cancel</Text>
        </TouchableOpacity>
       
        </View>
           <View style={{width:'45%',}}>
           

            <TouchableOpacity activeOpacity={0.9} style={{borderRadius:12, backgroundColor:'#0073ff', padding:7, borderRadius:10, flex:1}} onPress={
             async ()=>{ 
               
               
               if(this.state.text == '' && this.state.postImage == null) {
                 
                 alert('Text field must not be empty!')
                 
               }
               else if(this.state.text == ''  && this.state.postImage !==null){
                this.props.addpostwithImage(this.state, this.state.selectedGroupsForPost)
                this.props.navigation.navigate('StoryScreen')
                ToastAndroid.show('Posting...', ToastAndroid.LONG)
               }
               else if(this.state.text !== ''  && this.state.postImage ==null){
                this.props.addpost(this.state, this.state.selectedGroupsForPost)
                this.props.navigation.navigate('StoryScreen')
                ToastAndroid.show('Posting...', ToastAndroid.LONG)
               }
               else if(this.state.text !== ''  && this.state.postImage !==null){
                this.props.addpostwithImage(this.state, this.state.selectedGroupsForPost)
                this.props.navigation.navigate('StoryScreen')
                ToastAndroid.show('Posting...', ToastAndroid.LONG)
               }
               else {
                 {
                   this.state.postImage == null ?  (this.props.addpost(this.state, this.state.selectedGroupsForPost) )
                   : 
                  ( this.props.addpostwithImage(this.state, this.state.selectedGroupsForPost))
                 }
               
                this.props.navigation.navigate('StoryScreen')
               
                setTimeout(()=> this.props.getposts(this.state.token, this.state.selectedGroupsForPost), 2000)
                ToastAndroid.show('Posting...', ToastAndroid.LONG)
               }
              }
              
             

              }>
              <Text style={{alignSelf:'center', color:'white', fontSize:TEXTSIZE/23,fontFamily:'Quicksand-Medium'}}>Post</Text>
            </TouchableOpacity>
       
        </View>
        </View>  
        <View style={{marginBottom:30}}>

        </View>
        </ScrollView>


        <Modal isVisible={this.state.showPicker} 
          animationIn='slideInUp'
          animationOut='slideOutDown'
          hideModalContentWhileAnimating ={true}
          animationInTiming={200}
          onBackButtonPress={()=> this.setState({showPicker:false})}
        >
        <View style={{backgroundColor:"#fff", width:WIDTH-50,alignSelf:'center',borderRadius:20, overflow:'hidden'}}>
                <View style={{backgroundColor:'#0073ff', height:50, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:18, fontFamily:'Quicksand-Medium', color:'#fff'}} >Pick Life-Span</Text>
                </View>
                <View style={{marginTop:15, paddingHorizontal:10, flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
                <TextInput 
                        selectionColor="#0073ff"
                        numberOfLines={1}
                        underlineColorAndroid="#0073ff"
                        value={this.state.days}
                         maxLength={1}
                         keyboardType="numeric"
                        editable={true}
                        onChangeText={(days)=>this.setState({days}) }
                        placeholder="d"
                        style={{fontFamily:'Quicksand-Medium',textAlign:'center', fontSize:18, color:'#333', width:WIDTH/10, textAlignVertical:'center'}}
                         />
                  <View style={{marginLeft:5, flexDirection:'row', alignItems:'center'}}>
                    <Text style={{fontSize:18, fontFamily:'Quicksand-Medium', color:'#333'}}>Days</Text>
                    <Text style={{fontSize:14, fontFamily:'Quicksand-Regular', color:'#333'}}>{'( <= 7 days)'}</Text>

                  </View>
                </View>

                {
                  this.state.showError2 ? (
                    <View style={{marginTop:10, backgroundColor:'rgba(255,0, 0, 0.7)'}}>
                    <Text style={{textAlign:'center', fontSize:17, color:'#fff', fontFamily:'Quicksand-Medium'}}>Post lifespan must be less than 7 days!</Text>
                  </View>
                  ) : (null)
                }

                <View style={{marginTop:10, paddingHorizontal:10, flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
                <TextInput 
                        selectionColor="#0073ff"
                        numberOfLines={1}
                        underlineColorAndroid="#0073ff"
                        value={this.state.hours}
                         maxLength={2}
                         keyboardType="numeric"
                         onChangeText={(hours)=>this.setState({hours}) }
                        editable={true}
                        placeholder="hh"
                        style={{fontFamily:'Quicksand-Medium',textAlign:'center', fontSize:18, color:'#333', width:WIDTH/10, textAlignVertical:'center'}}
                         />
                  <View style={{marginLeft:5, flexDirection:'row', alignItems:'center'}}>
                    <Text style={{fontSize:18, fontFamily:'Quicksand-Medium', color:'#333'}}>Hours</Text>
                    <Text style={{fontSize:14, fontFamily:'Quicksand-Regular', color:'#333'}}>{'( <= 24 hours)'}</Text>
                  </View>
                </View>
                <View style={{marginTop:10, paddingHorizontal:10, flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
                <TextInput 
                        selectionColor="#0073ff"
                        numberOfLines={1}
                        underlineColorAndroid="#0073ff"
                        value={this.state.minutes}
                         maxLength={2}
                         keyboardType="numeric"
                         onChangeText={(minutes)=>this.setState({minutes}) }
                         placeholder="mm"
                        editable={true}
                        
                        style={{fontFamily:'Quicksand-Medium',textAlign:'center', fontSize:18, color:'#333', width:WIDTH/10, textAlignVertical:'center'}}
                         />
                  <View style={{marginLeft:5, flexDirection:'row', alignItems:'center'}}>
                    <Text style={{fontSize:18, fontFamily:'Quicksand-Medium', color:'#333'}}>Minutes</Text>
                    <Text style={{fontSize:14, fontFamily:'Quicksand-Regular', color:'#333'}}>{'( <= 60 minutes)'}</Text>
                  </View>
                </View>
                {
                  this.state.showError1 ? (
                    <View style={{marginTop:10, backgroundColor:'rgba(255,0, 0, 0.7)'}}>
                    <Text style={{textAlign:'center', fontSize:17, color:'#fff', fontFamily:'Quicksand-Medium'}}>Invalid Input! Make sure your time input is correct</Text>
                  </View>
                  ) : (null)
                }
                {
                  this.state.showError3 ? (
                    <View style={{marginTop:10, backgroundColor:'rgba(255,0, 0, 0.7)'}}>
                    <Text style={{textAlign:'center', fontSize:17, color:'#fff', fontFamily:'Quicksand-Medium'}}>Please select a time!</Text>
                  </View>
                  ) : (null)
                }
               
                <View style={{ flexDirection:'row', marginBottom:20,marginTop:30, justifyContent:'space-around'}}>
                <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#bdc3c7'}} onPress={()=> {
                 if(this.state.hours == null && this.state.days == null && this.state.minutes == null){
                  this.setState({lifespan:0, showPicker:false})
                 }
                  this.setState({showPicker:false,})}}>
                  <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Cancel</Text>
                </TouchableOpacity>
              <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#0073ff'}} onPress={()=> {
               this.setState({showError1:false, showError2:false})
               if(this.state.hours >24 || this.state.minutes >60){
                this.setState({showError1:true})
                this.setState({showPicker:true})
                
               }
               else if(this.state.days >7 ){
                this.setState({showError2:true})
                this.setState({showPicker:true})
                
               }
               else if(this.state.hours == null && this.state.days == null && this.state.minutes == null){
                this.setState({showError3:true})
                this.setState({showPicker:true})
               }  
               else {
                this.setState({showPicker:false})
                let day = 86400000*this.state.days
                let hour = this.state.hours*3600000
                let minutes = this.state.minutes*60000
                let lifeSpanforPost =  day+ hour+ minutes
                console.log('miliseconds =', day+ hour+ minutes)

                console.log('time =',this.state.days, this.state.hours, this.state.minutes)
                this.setState({showError1:false, showError2:false,lifeSpanforPost })
                this.setState({})
               }
              

                   }}>
                <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Done</Text>
              </TouchableOpacity>
            </View>
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

export default connect(mapStateToProps, {getAllUsers, getSingleUser,getposts, addpost,removeLoading, deletepost, addpostwithImage})(PostScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name:{
    marginLeft:10,
    color:'#fff',
    fontFamily:'Quicksand-Bold',
    fontSize:TEXTSIZE/22,
   
  },
  posttext: {
    color:'#333333',
    fontSize: TEXTSIZE/21,
    marginLeft:10,
     padding:15,
    fontFamily:'Quicksand-Medium'
  
  }
});



//one: #5AB7EF;
//two:#5472F0