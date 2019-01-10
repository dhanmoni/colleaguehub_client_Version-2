import {  SET_PROFILE_WITHDATA, 
    GET_ALL_USERS,
    SET_LOADING ,
    GET_CURRENT_PROFILE, 
    UPDATE_USER_PROFILE, 
    GET_SINGLE_USER, 
    GET_SEARCHED_USER, 
    GET_ALL_COLLEGUES,
    GET_ALL_GROUPS,
    UPDATE_USER, } from './types'
import axios from 'axios'
import {AsyncStorage, ToastAndroid} from 'react-native'
const ACCESS_TOKEN = 'Access_Token'
const RNFetchBlob = require('react-native-fetch-blob').default;
//import setAuthToken from '../../config/setAuthToken'
import jwt_decode from 'jwt-decode'




export const setCurrentUserWithProfile = (userData)=> dispatch=> {
    
    console.log(userData)
      axios.post(`http://192.168.43.76:3001/api/profile/createProfile?access_token=${userData.token}`,
  
      userData)
      .then(res=> 
         { 
          console.log('res in create profile is ', res)   
          dispatch({
              type: SET_PROFILE_WITHDATA,
              payload: res.data
          })}
        
           )
          
           .catch(err => console.log('err', err.response))}

          

export const setCurrentProfileWithPublicInstitution = (userData)=> dispatch=> {
    
            console.log(userData)
              axios.post(`http://192.168.43.76:3001/api/profile/createProfile/institution/public?access_token=${userData.token}`,
          
              userData)
              .then(res=> 
                 { 
                  console.log('res in create profile is ', res)   
                  dispatch({
                      type: SET_PROFILE_WITHDATA,
                      payload: res.data
                  })}
                
                   )
                  
                   .catch(err => console.log('err', err))}
        
 export const setCurrentProfileWithPrivateInstitution = (userData)=> dispatch=> {

            console.log(userData)
                axios.post(`http://192.168.43.76:3001/api/profile/createProfile/institution/private?access_token=${userData.token}`,
            
                userData)
                .then(res=> 
                    { 
                    console.log('res in create profile is ', res)   
                    dispatch({
                        type: SET_PROFILE_WITHDATA,
                        payload: res.data
                    })}
                
                    )
                    
                    .catch(err => console.log('err', err.response))}
        

export const setLoading = () =>{
            return {
                type: SET_LOADING
            }
}
        

 export const getAllUsers = ()=> dispatch=> {
    
   
            axios.get(`http://192.168.43.76:3001/api/profile/allusers`
            )
            .then(res=> 
                dispatch({
                    type: GET_ALL_USERS,
                    payload: res.data
                })
                 )
                
                 .catch(err => console.log(err))}
        
export const getAllGroups = ()=> dispatch=> {


        axios.get(`http://192.168.43.76:3001/api/profile/allgroups`
        )
        .then(res=> 
                dispatch({
                    type: GET_ALL_GROUPS,
                    payload: res.data
                })
            )
    
        .catch(err => console.log(err))}

                     
                 
 export const getAllCollegues = ( userData,userinfo)=> dispatch=> {
            
            
             axios.get(`http://192.168.43.76:3001/api/profile/allcollegues?access_token=${userData}&institution=${userinfo}`)
             .then(res=> 
                 dispatch({
                     type: GET_ALL_COLLEGUES,
                     payload: res.data
                 })
                  )
                 
                  .catch(err =>console.log(err)) }

 export const getSingleUser = (userData, token)=> dispatch=> {
    
    
        axios.get(`http://192.168.43.76:3001/api/profile/allusers/${userData}?access_token=${token}`,
        userData)
        .then(res=> 
            dispatch({
                type: GET_SINGLE_USER,
                payload: res.data
            })
                )
            
                .catch(err => console.log(err)) }
               
               
  export const getSearchedUser = (userData)=> dispatch=> {
                   
                   
        axios.get(`http://192.168.43.76:3001/api/profile/allusers?name=${userData.searchInput}&access_token=${userData.token}`,
        userData)
        .then(res=> 
            dispatch({
                type: GET_SEARCHED_USER,
                payload: res.data
            })
                )
            
                .catch(err => console.log(err))
             }

export const updateUserProfile = (userData)=> dispatch=> {


    axios.post(`http://192.168.43.76:3001/api/profile/updateProfile?access_token=${userData.token}`,
    userData)
    .then(res=> 
        {dispatch({
            type: UPDATE_USER_PROFILE,
            payload: res.data
        })
        dispatch(getAllCollegues(userData.token, userData.institution))
        dispatch(getAllUsers())
        }
            )
        
         .catch(err => console.log(err)) 
        }

        

 export const getCurrentProfile = (userData)=> dispatch=> {
    
    
        axios.get(`http://192.168.43.76:3001/api/profile/currentProfile?access_token=${userData}`)
        .then(res=> 
            dispatch({
                type: GET_CURRENT_PROFILE,
                payload: res.data
            })
                )
            
            .catch(err => console.log(err)) }        


//update image
export const updateProfileImage = (userdata)=>dispatch=> {

    RNFetchBlob.config({appendExt : 'png'|| 'jpeg'|| 'jpg'}).fetch('POST', `http://192.168.43.76:3001/api/profile/updateProfileImage?access_token=${userdata.token}`, {
       
      }, [
        // element with property `filename` will be transformed into `file` in form data
        { name : 'profileImage', filename : 'image.png',
        data: userdata.response.data,
       type: 'image/png',
        },
      

       
      ]).then(res=> {
          const data = res.json()
          dispatch({
                type: UPDATE_USER,
                payload: data
            })
         }).catch(err => console.log(err))
    
}




export const updateProfileImage2 = (userdata)=>dispatch=> {

    RNFetchBlob.config({appendExt : 'png'|| 'jpeg'|| 'jpg'}).fetch('POST', `http://192.168.43.76:3001/api/profile/updateProfileImage2?access_token=${userdata.token}`, {
       
      }, [
        // element with property `filename` will be transformed into `file` in form data
        { name : 'profileImage', filename : 'image.png',
        data: userdata.response.data,
       type: 'image/png',
        },
      ]).then(res=> {
          console.log(data)
          const data = res.json()
       // ToastAndroid.show('Please wait...', ToastAndroid.LONG)
            dispatch({
                type: SET_PROFILE_WITHDATA,
                payload: data
            })
           // dispatch( getposts(userdata.token, userinfo) )
           
        }).catch(err=>{ 
           
            ToastAndroid.show('Something is wrong..', ToastAndroid.LONG)
        })
    
}


















