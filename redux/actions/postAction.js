import {
    SET_LOADING , 
    GET_POSTS, 
    ADD_POST, 
    DELETE_POST,
    SINGLE_POST
    } from './types'
import axios from 'axios'
import {AsyncStorage, ToastAndroid} from 'react-native'
const ACCESS_TOKEN = 'Access_Token'
const RNFetchBlob = require('react-native-fetch-blob').default;
//import setAuthToken from '../../config/setAuthToken'
import jwt_decode from 'jwt-decode'


//post
export const getposts = (userdata ,userinfo)=>dispatch=> {
  
    axios.get(`http://192.168.43.76:3001/api/post/allposts?access_token=${userdata}&institution=${userinfo}`)
    .then(res=> {
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    }).catch(err => console.log(err))
}


export const setLoading = () =>{
    return {
        type: SET_LOADING
    }
}




export const addpostwithImage = (userdata, userinfo)=>dispatch=> {

    RNFetchBlob.config({appendExt : 'png'|| 'jpeg'|| 'jpg'}).fetch('POST', `http://192.168.43.76:3001/api/post/addpostwithImage?access_token=${userdata.token}&institution=${userinfo}`, {
       
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
        }).catch(err => console.log(err))
    
}

export const addpost = (userdata, userinfo)=>dispatch=> {
    
     axios.post(`http://192.168.43.76:3001/api/post/addpost?access_token=${userdata.token}&institution=${userinfo}`, userdata)
     .then(res=> {
         console.log(res)
         dispatch({
             type: ADD_POST,
             payload: res.data
         })
         dispatch( getposts(userdata.token, userinfo) )
         
     }).catch(err =>console.log(err))
 }



export const getSinglePost = (postData, token)=> dispatch=> {
    
        dispatch(setLoading())
     axios.get(`http://192.168.43.76:3001/api/post/allposts/${postData}?access_token=${token}`)
     .then(res=> 
         dispatch({
             type: SINGLE_POST,
             payload: res.data
         })
          )
         
          .catch(err => {
            ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT)  
            console.log(err)})
 }



 export const getPostComment = (postData, token)=> dispatch=> {
    
    
 axios.get(`http://192.168.43.76:3001/api/post/allposts/${postData}?access_token=${token}`)
 .then(res=> 
     dispatch({
         type: SINGLE_POST,
         payload: res.data
     })
      )
     
      .catch(err => {
        ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT)
          console.log(err)})}


     



export const addlike = (postdata, token)=>dispatch=> {
   
    axios.post(`http://192.168.43.76:3001/api/post/like/${postdata._id}?access_token=${token}`)
    .then(()=> {
        dispatch(
            getposts(token, postdata.institution )
            )
            dispatch(getPostComment(postdata._id, token))
        })
        .catch(err => {
            
            console.log(err)})
}




export const addliketocomment1 = (postdata,commentId, token)=>dispatch=> {
   
    axios.post(`http://192.168.43.76:3001/api/post/comment/${postdata._id}/like/${commentId}?access_token=${token}`)
        .then(()=> {
        dispatch(
            getposts(token, postdata.institution )
            )
            dispatch(getPostComment(postdata._id, token))
        }).catch(err =>console.log(err))
    
}



export const addcomment = (postId, postdata)=>dispatch=> {
   
    axios.post(`http://192.168.43.76:3001/api/post/comment/${postId}?access_token=${postdata.token}`, postdata)
    .then(()=> {
        dispatch(getposts(postdata.token, postdata.institution ))
        dispatch(getPostComment(postId,postdata.token))
        ToastAndroid.show('Posted!', ToastAndroid.SHORT)
    }).catch(err => {
        ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT)
        console.log(err)})
}
 




export const deletecomment = (postId,commentId, postdata)=>dispatch=> {
   
    axios.delete(`http://192.168.43.76:3001/api/post/comment/${postId}/${commentId}?access_token=${postdata.token}`)
    .then(()=> {
        dispatch(getposts(postdata.token, postdata.institution ))
        dispatch(getPostComment(postId,postdata.token))
        ToastAndroid.show('Comment deleted!', ToastAndroid.SHORT)
    }).catch(()=> {
        console.log(err)
        ToastAndroid.show('Something is wrong...', ToastAndroid.SHORT)
    })
}



export const deletepost = (postData, token)=> dispatch=> {
   
    axios.delete(`http://192.168.43.76:3001/api/post/deletepost/${postData._id}?access_token=${token}`)
    .then(res=> {
       
        dispatch({
            type: DELETE_POST,
            payload: {}
        })
    dispatch(getposts(token, postData.institution ))
    }
    ).then(()=> {
        ToastAndroid.show('Post deleted', ToastAndroid.SHORT)
    })
    .catch(err => console.log(err))}