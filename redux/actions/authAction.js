import { LOGIN_WITH_FB, SET_PROFILE_WITHDATA, DELETE_AUTH_USER, GET_ALL_USERS,SET_LOADING ,GET_CURRENT_PROFILE, UPDATE_USER_PROFILE, GET_SINGLE_USER, GET_SEARCHED_USER, GET_ALL_COLLEGUES, GET_POSTS, ADD_POST, DELETE_POST,UPDATE_USER, SINGLE_POST, NIGHT_MODE_OFF, NIGHT_MODE_ON, LOGIN_USER, GET_ERRORS, CLEAR_ERRORS, LOG_OUT} from './types'
import axios from 'axios'
import {AsyncStorage, ToastAndroid} from 'react-native'
const ACCESS_TOKEN = 'Access_Token'
const RNFetchBlob = require('react-native-fetch-blob').default;
//import setAuthToken from '../../config/setAuthToken'
import jwt_decode from 'jwt-decode'


// const setAuthToken = token => {
//     if(token){
//         axios.defaults.headers.common['Authorization'] = `${token}`
//         console.log('setAuthToken is called ', token)
//         AsyncStorage.setItem(ACCESS_TOKEN, token)
//        console.log(axios.defaults.headers)
//         //  // set token to auth header
        
//     } else {
//         delete axios.defaults.headers.common['Authorization']
//     }
// }

export const signUp_User = (userdata) => dispatch  => {
  
   axios.post( `http://192.168.43.76:3001/api/auth/signup`, userdata)
   .then(async(res) =>{
    //save to localstorage
    console.log(res)
             const  token  = res.data.token;
            console.log(token)
      
       // setAuthToken(token)
        //decode token to get user data
      const decoded = jwt_decode(token);
      
        //set current user
       console.log(decoded)
      await dispatch(setCurrentUser(decoded))
       dispatch(clearError())
        dispatch(getCurrentUser(token))

       const accessToken = token
    
       // set item to localstorage
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken)
       const token2 = await AsyncStorage.getItem(ACCESS_TOKEN)
           console.log('token is', token2)
     

        })
       
   .catch((err)=> {
       console.log(err)
       dispatch({
           type: GET_ERRORS,
           payload: err.response.data
       })
})
}

//login user
export const loginUser = (userData) => dispatch => {
    axios
       .post(`http://192.168.43.76:3001/api/auth/login`, userData)
       .then(async(res) =>{
        //save to localstorage
       console.log('response is ',res)
                 const  token  = res.data.token;
                console.log('login token ',token)
          
           // setAuthToken(token)
            //decode token to get user data
          const decoded = jwt_decode(token);
            //set current user
           console.log('decoded token ',decoded)
          await dispatch(setCurrentUser(decoded))
          await dispatch(getCurrentUser(token))
          
           
           // set item to localstorage
      await AsyncStorage.setItem(ACCESS_TOKEN, token)
     
    //   const token2 = await AsyncStorage.getItem(ACCESS_TOKEN)
    //       console.log('token is', token2)
          })
       .catch(err => dispatch({
           type: GET_ERRORS,
           payload:err.response.data
       }))
}


//set logged in user
export const setCurrentUser = decoded =>{
    return {
        type: LOGIN_USER,
        payload: decoded
    }
}


export const clearError = ()=> {
    return {
        type: CLEAR_ERRORS,
        
    }
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


export const logoutUser = ()=> {
    console.log('logged out')
    return {
        type: LOG_OUT
        }
}

export const getCurrentUser = (userData)=> dispatch=> {
   
    
    axios.get(`http://192.168.43.76:3001/api/auth/current?access_token=${userData}`)
    .then(res=> {
       console.log(res)}
    )
    .catch(err => console.log(err))}



    


export const deleteAuthUser = (userData)=> dispatch=> {
   
    
    axios.delete(`http://192.168.43.76:3001/api/auth/user?access_token=${userData}`)
    .then(res=> {
       
        dispatch({
            type: DELETE_AUTH_USER,
            payload: null
        })}
    )
    .catch(err => console.log(err))}

