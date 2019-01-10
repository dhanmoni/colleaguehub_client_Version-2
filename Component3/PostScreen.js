import React, { Component } from 'react'
import { StyleSheet, Text, View ,Image,Dimensions,TouchableOpacity,StatusBar,ScrollView, AsyncStorage, TextInput, Keyboard, ToastAndroid, NetInfo,  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux'
import {getAllUsers, getSingleUser, getAllCollegues} from '../redux/actions/profileAction'
import {  getposts, addpost, deletepost, addpostwithImage} from '../redux/actions/postAction'
import Icon from 'react-native-vector-icons/FontAwesome'
let HEIGHT_MIN = Dimensions.get('window').height;
const TEXTSIZE = Dimensions.get('window').width ;
const ACCESS_TOKEN = 'Access_Token'
import ImagePicker from 'react-native-image-picker';


const options = {
  title: 'Select Image',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallary',
  quatity:0.4
};

class PostScreen extends Component {
    static navigationOptions={
        header:null
    }

  constructor(props){
    super(props);
    this.state={
      token:'',
      page:1,
      refreshing:false,
      text:'',
      isLoading:false,
      postImage:null,
     response:null
    }
  }
  async componentDidMount() {
   
        const token = await AsyncStorage.getItem(ACCESS_TOKEN)
        if(token){
          this.setState({
            token
          })
          console.log(token)
        }  
   
    
    
  }

  

     
      onTextChange =(text)=> {
        this.setState({text})
      }

      selectphoto(){
        ImagePicker.launchImageLibrary(options, (response) => {
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
     
      <View style={{flex:1,backgroundColor:bgcolor }}> 
      <ScrollView>
       <View style={{flex:1,flexDirection: 'row'}}>
       <StatusBar
          backgroundColor='#002463'
          barStyle="light-content"
        />
          
          <LinearGradient  colors={['#1fa5ff', '#1053ff']} style={{width: 100 + '%', height: 100 +'%',}} start={{ x: 0.1, y: 0.1 }} end={{x: 1, y: 0}}>
           <View style={{flexDirection:'row', alignItems:'center',width: 100 + '%', height: 100 +'%',alignSelf: 'center'}}>
               
               <Text style={{color:'white',flex:1 ,textAlign: 'center',fontSize: 32 ,backgroundColor: 'transparent', fontFamily:'Quicksand-Bold'}}>ColleagueHub</Text>
              
           </View>
          
 
         </LinearGradient> 
         </View>
          
       <View style={{marginTop:HEIGHT_MIN/50, flex:10 }}>
      
            <View>
              <Text style={{ color:textcolor,
                    fontSize: TEXTSIZE/21,
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


              
            <View style={{flexDirection:'row', marginTop:35, justifyContent:'space-around', paddingBottom:50}}>
          <View style={{width:'45%',}}>
        
        <TouchableOpacity activeOpacity={0.9} style={{borderRadius:12, backgroundColor:'#888',padding:7, borderRadius:10}} 
        onPress={()=> this.props.navigation.navigate('StoryScreen')}>
          <Text style={{alignSelf:'center', color:'white', fontSize:TEXTSIZE/23,fontFamily:'Quicksand-Medium'}}>Cancel</Text>
        </TouchableOpacity>
       
        </View>
           <View style={{width:'45%',}}>
           

            <TouchableOpacity activeOpacity={0.9} style={{borderRadius:12, backgroundColor:'#002463', padding:7, borderRadius:10, flex:1}} onPress={
             async ()=>{ 
               
               
               if(this.state.text == '' && this.state.postImage == null) {
                 
                 alert('Text field must not be empty!')
                 
               }
               else if(this.state.text == ''  && this.state.postImage !==null){
                this.props.addpostwithImage(this.state, userInfo.institution)
                this.props.navigation.navigate('StoryScreen')
                ToastAndroid.show('Posting...', ToastAndroid.LONG)
               }
               else if(this.state.text !== ''  && this.state.postImage ==null){
                this.props.addpost(this.state, userInfo.institution)
                this.props.navigation.navigate('StoryScreen')
                ToastAndroid.show('Posting...', ToastAndroid.LONG)
               }
               else if(this.state.text !== ''  && this.state.postImage !==null){
                this.props.addpostwithImage(this.state, userInfo.institution)
                this.props.navigation.navigate('StoryScreen')
                ToastAndroid.show('Posting...', ToastAndroid.LONG)
               }
               else {
                 {
                   this.state.postImage == null ?  (this.props.addpost(this.state, userInfo.institution) )
                   : 
                  ( this.props.addpostwithImage(this.state, userInfo.institution))
                 }
               
                this.props.navigation.navigate('StoryScreen')
               
                setTimeout(()=> this.props.getposts(this.state.token, userInfo.institution), 2000)
                ToastAndroid.show('Posting...', ToastAndroid.LONG)
               }
              }
              
             

              }>
              <Text style={{alignSelf:'center', color:'white', fontSize:TEXTSIZE/23,fontFamily:'Quicksand-Medium'}}>Post</Text>
            </TouchableOpacity>
       
        </View>
        </View>  
           
         
    </View>
    </ScrollView>
	  </View>
    
    )
  }
}
const mapStateToProps = (state)=> {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {getAllUsers, getSingleUser,getposts, addpost, deletepost, addpostwithImage})(PostScreen)

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