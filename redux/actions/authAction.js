import { LOGIN_WITH_FB, SET_PROFILE_WITHDATA, DELETE_AUTH_USER, GET_ALL_USERS,SET_LOADING ,GET_CURRENT_PROFILE, UPDATE_USER_PROFILE, GET_SINGLE_USER, GET_SEARCHED_USER, GET_ALL_COLLEGUES, GET_POSTS, ADD_POST, DELETE_POST,UPDATE_FB_PROFILE, SINGLE_POST, NIGHT_MODE_OFF, NIGHT_MODE_ON} from './types'
import axios from 'axios'
import {AsyncStorage, ToastAndroid} from 'react-native'
const ACCEES_TOKEN = 'Access_Token'
const RNFetchBlob = require('react-native-fetch-blob').default;

const FormData = require('form-data');
const fs = require('react-native-fs');

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

//  export const updateProfileImage = (userData)=> dispatch=> {
    
    
//     axios.post(`http://192.168.43.76:3001/api/updateProfileImage?access_token=${userData.token}`,
//     userData)
//     .then(res=> 
//         dispatch({
//             type: UPDATE_FB_PROFILE,
//             payload: res.data
//         })
        
//          )
//         .then(()=> {
//             ToastAndroid.show('Profile updated!', ToastAndroid.SHORT)
//         })
        
//         .catch(err=>ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT))
// }


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

export const nightmodeon = () =>{
    return {
        type: NIGHT_MODE_ON
    }
}
export const nightmodeoff = () =>{
    return {
        type: NIGHT_MODE_OFF
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


//update image
export const updateProfileImage = (userdata)=>dispatch=> {

    RNFetchBlob.config({appendExt : 'png'|| 'jpeg'|| 'jpg'}).fetch('POST', `http://192.168.43.76:3001/api/updateProfileImage?access_token=${userdata.token}`, {
       
      }, [
        // element with property `filename` will be transformed into `file` in form data
        { name : 'profileImage', filename : 'image.png',
        data: userdata.response.data,
       type: 'image/png',
        },
      

       
      ]).then(res=> {
          const data = res.json()
        ToastAndroid.show('Processing...', ToastAndroid.LONG)
            dispatch({
                type: UPDATE_FB_PROFILE,
                payload: data
            })
            ToastAndroid.show('Profile image updated successfully.', ToastAndroid.SHORT)

           // dispatch( getposts(userdata.token, userinfo) )
           
        }).catch(err=>{ 
           
            ToastAndroid.show('Something is wrong, Try again later', ToastAndroid.LONG)
        })
    
}

export const updateProfileImage2 = (userdata)=>dispatch=> {

    RNFetchBlob.config({appendExt : 'png'|| 'jpeg'|| 'jpg'}).fetch('POST', `http://192.168.43.76:3001/api/updateProfileImage2?access_token=${userdata.token}`, {
       
      }, [
        // element with property `filename` will be transformed into `file` in form data
        { name : 'profileImage', filename : 'image.png',
        data: userdata.response.data,
       type: 'image/png',
        },
      

       
      ]).then(res=> {
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


export const addpostwithImage = (userdata, userinfo)=>dispatch=> {

    RNFetchBlob.config({appendExt : 'png'|| 'jpeg'|| 'jpg'}).fetch('POST', `http://192.168.43.76:3001/api/addpostwithImage?access_token=${userdata.token}&institution=${userinfo}`, {
       
      }, [
        // element with property `filename` will be transformed into `file` in form data
        { name : 'postImage', filename : 'image.png',
        data: userdata.response.data,
       type: 'image/png',
        },
        { name : 'text',  data: userdata.text},

       
      ]).then(res=> {
        ToastAndroid.show('Please wait...', ToastAndroid.LONG)
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
            dispatch( getposts(userdata.token, userinfo) )
            return
        }).catch(err=>{ 
           
            ToastAndroid.show('Something is wrong..', ToastAndroid.LONG)
        })
    
}

export const addpost = (userdata, userinfo)=>dispatch=> {
    
     axios.post(`http://192.168.43.76:3001/api/addpost?access_token=${userdata.token}&institution=${userinfo}`, userdata)
     .then(res=> {
         
         dispatch({
             type: ADD_POST,
             payload: res.data
         })
         dispatch( getposts(userdata.token, userinfo) )
         
     }).catch(err=> {
         ()=> console.log('error is ', err)
         ToastAndroid.show('Something is wrong...', ToastAndroid.LONG)})
 }


export const getSinglePost = (postData, token)=> dispatch=> {
    
        dispatch(setLoading())
     axios.get(`http://192.168.43.76:3001/api/allposts/${postData}?access_token=${token}`)
     .then(res=> 
         dispatch({
             type: SINGLE_POST,
             payload: res.data
         })
          )
         
         .catch(err=> ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT))
 }

 export const getPostComment = (postData, token)=> dispatch=> {
    
    
 axios.get(`http://192.168.43.76:3001/api/allposts/${postData}?access_token=${token}`)
 .then(res=> 
     dispatch({
         type: SINGLE_POST,
         payload: res.data
     })
      )
     
     .catch(err=> ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT))
}



export const addlike = (postdata, token)=>dispatch=> {
   
    axios.post(`http://192.168.43.76:3001/api/like/${postdata._id}?access_token=${token}`)
    .then(()=> {
        dispatch(
            getposts(token, postdata.institution )
            )
        dispatch(getPostComment(postdata._id, token))
        })
    .catch(()=> {
       // ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT)
    })
}

export const addliketocomment1 = (postdata,commentId, token)=>dispatch=> {
   
    axios.post(`http://192.168.43.76:3001/api/comment/${postdata._id}/like/${commentId}?access_token=${token}`)
        .then(()=> {
        dispatch(
            getposts(token, postdata.institution )
            )
            dispatch(getPostComment(postdata._id, token))
        })
    
}


export const addcomment = (postId, postdata)=>dispatch=> {
   
    axios.post(`http://192.168.43.76:3001/api/comment/${postId}?access_token=${postdata.token}`, postdata)
    .then(()=> {
        dispatch(getposts(postdata.token, postdata.institution ))
        dispatch(getPostComment(postId,postdata.token))
        ToastAndroid.show('Posted!', ToastAndroid.SHORT)
    }).catch(()=> {
        ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT)
    })
}
 

export const deletecomment = (postId,commentId, postdata)=>dispatch=> {
   
    axios.delete(`http://192.168.43.76:3001/api/comment/${postId}/${commentId}?access_token=${postdata.token}`)
    .then(()=> {
        dispatch(getposts(postdata.token, postdata.institution ))
        dispatch(getPostComment(postId,postdata.token))
        ToastAndroid.show('Comment deleted!', ToastAndroid.SHORT)
    }).catch(()=> {
        ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT)
    })
}

export const deletepost = (postData, token)=> dispatch=> {
   
    axios.delete(`http://192.168.43.76:3001/api/deletepost/${postData}?access_token=${token.token}`)
    .then(res=> {
       
        dispatch({
            type: DELETE_POST,
            payload: {}
        })
    dispatch(getposts(token.token, postdata.institution))
    }
    ).then(()=> {
        ToastAndroid.show('Post deleted', ToastAndroid.SHORT)
    })
        .catch(err=> ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT))
}