import { LOGIN_WITH_FB, SET_PROFILE_WITHDATA, DELETE_AUTH_USER, GET_ALL_USERS,SET_LOADING ,GET_CURRENT_PROFILE, UPDATE_USER_PROFILE, GET_SINGLE_USER, GET_SEARCHED_USER, GET_ALL_COLLEGUES, GET_POSTS, ADD_POST, DELETE_POST} from './types'
import axios from 'axios'
import {AsyncStorage} from 'react-native'
const ACCEES_TOKEN = 'Access_Token'

export const loggInUserWithFb = (userData) => dispatch  => {
  
    
       dispatch(setLoading());
        axios.post(`https://colleaguehub.info/api/fblogin?access_token=${userData.token}`,
            userData)
            .then(res=> {
             
             dispatch({
                type: LOGIN_WITH_FB,
                payload: res.data
        })})
         
        .catch(err=>alert('Something went wrong...'))
}

export const setCurrentUserWithProfile = (userData)=> dispatch=> {
    
  
    axios.post(`https://colleaguehub.info/api/createprofile?access_token=${userData.token}`,
    userData)
    .then(res=> 
       {  
           
            dispatch({
            type: SET_PROFILE_WITHDATA,
            payload: res.data
        })}
         )
        
        .catch(err=> alert('Something went wrong...'))
}

export const getAllUsers = (userData)=> dispatch=> {
    
   
    axios.get(`https://colleaguehub.info/api/allusers?access_token=${userData}`
    )
    .then(res=> 
        dispatch({
            type: GET_ALL_USERS,
            payload: res.data
        })
         )
        
        .catch(err=> alert('Something went wrong...'))
}
export const getAllCollegues = (userData, userinfo)=> dispatch=> {
    
    
     axios.get(`https://colleaguehub.info/api/allcollegues?access_token=${userData.token}&institution=${userinfo.institution}`,
     userData)
     .then(res=> 
         dispatch({
             type: GET_ALL_COLLEGUES,
             payload: res.data
         })
          )
         
         .catch(err=> alert('Something went wrong...'))
 }


export const getSingleUser = (userData, token)=> dispatch=> {
    
    dispatch(setLoading())
     axios.get(`https://colleaguehub.info/api/allusers/${userData.facebookId}?access_token=${token.token}`,
     userData)
     .then(res=> 
         dispatch({
             type: GET_SINGLE_USER,
             payload: res.data
         })
          )
         
         .catch(err=> alert('Something went wrong...'))
 }


 export const getSearchedUser = (userData)=> dispatch=> {
    
    
     axios.get(`https://colleaguehub.info/api/allusers?name=${userData.searchInput}&access_token=${userData.token}`,
     userData)
     .then(res=> 
         dispatch({
             type: GET_SEARCHED_USER,
             payload: res.data
         })
          )
         
         .catch(err=> alert('Something went wrong...'))
 }



export const updateUserProfile = (userData)=> dispatch=> {
    
    
     axios.post(`https://colleaguehub.info/api/updateProfile?access_token=${userData.token}`,
     userData)
     .then(res=> 
         dispatch({
             type: UPDATE_USER_PROFILE,
             payload: res.data
         })
          )
         
         .catch(err=>alert('Something went wrong...'))
 }



export const getCurrentProfile = (userData)=> dispatch=> {
    
    
     axios.get(`https://colleaguehub.info/api/currentProfile?access_token=${userData}`,
     userData)
     .then(res=> 
         dispatch({
             type: GET_CURRENT_PROFILE,
             payload: res.data
         })
          )
         
         .catch(err=>alert('Something went wrong...'))
 }

export const setLoading = () =>{
    return {
        type: SET_LOADING
    }
}



export const deleteAuthUser = (userData)=> dispatch=> {
   
    
    axios.delete(`https://colleaguehub.info/api/user?access_token=${userData}`)
    .then(res=> {
       
        dispatch({
            type: DELETE_AUTH_USER,
            payload: {}
        })}
    )
        .catch(err=> alert('Something went wrong...'))
}

//post
export const getposts = (userdata, userinfo)=>dispatch=> {
  
    axios.get(`https://colleaguehub.info/api/allposts?access_token=${userdata.token}&institution=${userinfo.institution}`)
    .then(res=> {
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    }).catch(res=> {
        dispatch({
            type: GET_POSTS,
            payload: null
        })
    })
}

export const addpost = (userdata, userinfo)=>dispatch=> {
    
    axios.post(`https://colleaguehub.info/api/addpost?access_token=${userdata.token}&institution=${userinfo.institution}`, userdata)
    .then(res=> {
        
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setLoading())
    }).catch(err=> alert('Opps! Something went wrong...'))
}

export const addlike = (postdata, token)=>dispatch=> {
   
    axios.post(`https://colleaguehub.info/api/like/${postdata}?access_token=${token}`)
    .then(()=> {
        dispatch(getposts())
    }).catch(()=> {
        dispatch(getposts())
    })
}
 

export const deletepost = (postData, token)=> dispatch=> {
   
    axios.delete(`https://colleaguehub.info/api/deletepost/${postData}?access_token=${token}`)
    .then(res=> {
       
        dispatch({
            type: DELETE_POST,
            payload: {}
        })}
    )
        .catch(err=> alert('Opps! Something went wrong...'))
}