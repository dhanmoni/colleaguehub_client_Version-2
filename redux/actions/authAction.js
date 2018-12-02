import { LOGIN_WITH_FB, SET_PROFILE_WITHDATA, DELETE_AUTH_USER, GET_ALL_USERS,SET_LOADING ,GET_CURRENT_PROFILE, UPDATE_USER_PROFILE, GET_SINGLE_USER, GET_SEARCHED_USER, GET_ALL_COLLEGUES, GET_POSTS, ADD_POST, DELETE_POST} from './types'
import axios from 'axios'
import {AsyncStorage, ToastAndroid} from 'react-native'
const ACCEES_TOKEN = 'Access_Token'

export const loggInUserWithFb = (userData) => dispatch  => {
  
    
        axios.post(`http://192.168.43.76:3001/api/fblogin?access_token=${userData.token}`,
            userData)
            .then(res=> {
             
             dispatch({
                type: LOGIN_WITH_FB,
                payload: res.data
        })})
         
        .catch(err=> ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT))
        dispatch(setLoading());
}

export const setCurrentUserWithProfile = (userData)=> dispatch=> {
    
  
    axios.post(`http://192.168.43.76:3001/api/createprofile?access_token=${userData.token}`,
    userData)
    .then(res=> 
       {  
           
            dispatch({
            type: SET_PROFILE_WITHDATA,
            payload: res.data
        })}
         )
        
        .catch(err=>ToastAndroid.show('Something is wrong, check your internet connection', ToastAndroid.SHORT))
}

export const getAllUsers = ()=> dispatch=> {
    
   
    axios.get(`http://192.168.43.76:3001/api/allusers`
    )
    .then(res=> 
        dispatch({
            type: GET_ALL_USERS,
            payload: res.data
        })
         )
        
        .catch(err=> ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT))
}
export const getAllCollegues = (userData, userinfo)=> dispatch=> {
    
    
     axios.get(`http://192.168.43.76:3001/api/allcollegues?access_token=${userData}&institution=${userinfo}`)
     .then(res=> 
         dispatch({
             type: GET_ALL_COLLEGUES,
             payload: res.data
         })
          )
         
         .catch(err=> ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT))
 }


export const getSingleUser = (userData, token)=> dispatch=> {
    
    dispatch(setLoading())
     axios.get(`http://192.168.43.76:3001/api/allusers/${userData.facebookId}?access_token=${token.token}`,
     userData)
     .then(res=> 
         dispatch({
             type: GET_SINGLE_USER,
             payload: res.data
         })
          )
         
         .catch(err=> ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT))
 }


 export const getSearchedUser = (userData)=> dispatch=> {
    
    
     axios.get(`http://192.168.43.76:3001/api/allusers?name=${userData.searchInput}&access_token=${userData.token}`,
     userData)
     .then(res=> 
         dispatch({
             type: GET_SEARCHED_USER,
             payload: res.data
         })
          )
         
         .catch(err=> ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT))
 }



export const updateUserProfile = (userData)=> dispatch=> {
    
    
     axios.post(`http://192.168.43.76:3001/api/updateProfile?access_token=${userData.token}`,
     userData)
     .then(res=> 
         dispatch({
             type: UPDATE_USER_PROFILE,
             payload: res.data
         })
          )
         
         .catch(err=>ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT))
 }



export const getCurrentProfile = (userData)=> dispatch=> {
    
    
     axios.get(`http://192.168.43.76:3001/api/currentProfile?access_token=${userData}`,
     userData)
     .then(res=> 
         dispatch({
             type: GET_CURRENT_PROFILE,
             payload: res.data
         })
          )
         
         .catch(err=>ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT))
 }

export const setLoading = () =>{
    return {
        type: SET_LOADING
    }
}



export const deleteAuthUser = (userData)=> dispatch=> {
   
    
    axios.delete(`http://192.168.43.76:3001/api/user?access_token=${userData}`)
    .then(res=> {
       
        dispatch({
            type: DELETE_AUTH_USER,
            payload: null
        })}
    )
        .catch(err=> ToastAndroid.show('Something is wrong...', ToastAndroid.LONG))
}

//post
export const getposts = (userdata, userinfo)=>dispatch=> {
  console.log('userdata is ', userdata)
  console.log('userinfo is ', userinfo)
    axios.get(`http://192.168.43.76:3001/api/allposts?access_token=${userdata}&institution=${userinfo}`)
    .then(res=> {
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    }).catch(err=> {
        ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT)
    })
}

export const addpost = (userdata, userinfo)=>dispatch=> {
    
    axios.post(`http://192.168.43.76:3001/api/addpost?access_token=${userdata.token}&institution=${userinfo.institution}`, userdata)
    .then(res=> {
        
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        
    }).catch(err=> ToastAndroid.show('Something is wrong...', ToastAndroid.LONG))
}

export const addlike = (postdata, token)=>dispatch=> {
   
    axios.post(`http://192.168.43.76:3001/api/like/${postdata._id}?access_token=${token}`)
    .then(()=> {
        dispatch(getposts(token, postdata.institution ))
    }).catch(()=> {
        ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT)
    })
}
 

export const deletepost = (postData, token)=> dispatch=> {
   
    axios.delete(`http://192.168.43.76:3001/api/deletepost/${postData}?access_token=${token}`)
    .then(res=> {
       
        dispatch({
            type: DELETE_POST,
            payload: {}
        })}
    ).then(()=> {
        ToastAndroid.show('Post deleted', ToastAndroid.SHORT)
    })
        .catch(err=> ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT))
}