import {  SET_PROFILE_WITHDATA, 
    GET_ALL_USERS,
    SET_LOADING ,
    REMOVE_LOADING,
    GET_CURRENT_PROFILE, 
    UPDATE_USER_PROFILE, 
    GET_SINGLE_USER, 
    GET_SEARCHED_USER, 
    GET_ALL_COLLEGUES,
    GET_ALL_GROUPS,
    MY_GROUPS,
    UPDATE_OTHER_PROFILE,
    MY_ACTIVE_GROUPS,
    MY_FILTERED_GROUPS_FOR_COLLEAGUES,
    MY_FILTERED_GROUPS_FOR_POST,
    HIDE_BIO,
    HIDE_SKILLS,
    UPDATE_USER,
    SHOW_BIO, } from './types'
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
                        type: UPDATE_USER_PROFILE,
                        payload: res.data
                    })}
                
                    )
                    
                    .catch(err => console.log('err', err.response))}
    
                    
export const addPublicInstitution = (userData)=> dispatch=> {

    console.log('data =', userData)
        axios.post(`http://192.168.43.76:3001/api/profile/updateProfile/institution/public?access_token=${userData.token}`, userData)
        .then(res=> 
            { 
              console.log('res is', res)
            dispatch({
                type: UPDATE_USER_PROFILE,
                payload: res.data
            })}
        
            )
            
            .catch(err => console.log('err is', err))}


       
export const deleteInstitution = (data,token)=> dispatch=> {

  
        axios.delete(`http://192.168.43.76:3001/api/profile/institution/${data}?access_token=${token}`)
        .then(res=> 
            { 
              
            dispatch({
                type: UPDATE_USER_PROFILE,
                payload: res.data
            })}
        
            )
            
            .catch(err => console.log('err', err.response))}



export const setLoading = () =>{
            return {
                type: SET_LOADING
            }
}
export const removeLoading = () =>{
    return {
        type: REMOVE_LOADING
    }
}
   
export const hideBio = () =>{
    return {
        type: HIDE_BIO
    }
}
export const showBio = () =>{
    return {
        type: SHOW_BIO
    }
}
export const hideSkills = () =>{
    return {
        type: HIDE_SKILLS
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
    const group = JSON.stringify(userinfo)
      axios.get(`http://192.168.43.76:3001/api/profile/allcolleagues?access_token=${userData}&institution=${group}`)
             .then(res=> 
                {
                    console.log('res =', res)
                 dispatch({
                     type: GET_ALL_COLLEGUES,
                     payload: res.data
                 })}
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
       // dispatch(getAllCollegues(userData.token, userData.institution))
        dispatch(getAllUsers())
        }
            )
        
         .catch(err => console.log(err)) 
        }

export const updateUserBio = (userData)=> dispatch=> {

    console.log(userData.bio)
    axios.post(`http://192.168.43.76:3001/api/profile/createProfile/bio?access_token=${userData.token}`,
    userData)
    .then(res=> 
        {dispatch({
            type: UPDATE_USER_PROFILE,
            payload: res.data
        })
         }
         ) .catch(err => console.log(err)) 
        }
export const updateUserName = (userData)=> dispatch=> {

    
    axios.post(`http://192.168.43.76:3001/api/profile/updateProfile/name?access_token=${userData.token}`,
    userData)
    .then(res=> 
        {dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
            }
            ) .catch(err => console.log(err)) 
        }
export const updateUserName2 = (userData)=> dispatch=> {


    axios.post(`http://192.168.43.76:3001/api/profile/updateProfile/name2?access_token=${userData.token}`,
    userData)
    .then(res=> 
        {dispatch({
            type: UPDATE_USER_PROFILE,
            payload: res.data
        })
            }
            ) .catch(err => console.log(err)) 
        }
export const updateUserLocation = (userData)=> dispatch=> {


    axios.post(`http://192.168.43.76:3001/api/profile/updateProfile/residence?access_token=${userData.token}`,
    userData)
    .then(res=> 
        {dispatch({
            type: UPDATE_USER_PROFILE,
            payload: res.data
        })
            }
            ) .catch(err => console.log(err)) 
        }
export const updateSocialLinks = (userData)=> dispatch=> {


    axios.post(`http://192.168.43.76:3001/api/profile/updateProfile/social?access_token=${userData.token}`,
    userData)
    .then(res=> 
        {dispatch({
            type: UPDATE_USER_PROFILE,
            payload: res.data
        })
            }
            ) .catch(err => console.log(err)) 
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

export const setMyGroups = (userData)=> {
    return {
        type: MY_GROUPS,
        payload: userData
    }
}

// export const setMyActiveGroups = (userData)=> {
//     let payload =[];
//     const data = userData.filter(name=> {
       
//         payload.push(name.label)
//     })
   
//     return {
//         type: MY_ACTIVE_GROUPS,
//         payload: payload
//     }
// }
export const setMyActiveGroups = (userData, token)=> dispatch=> {
    console.log(userData)
    const group = JSON.stringify(userData)
    
    console.log('group',group)
    axios.post(`http://192.168.43.76:3001/api/profile/createProfile/updateActiveGroup?access_token=${token}`,{myActiveGroups: group})
    .then(res=> 
        {
            console.log(res)
            dispatch({
            type: UPDATE_USER_PROFILE,
            payload: res.data
        })
       
        }
            )
        
            .catch(err => console.log(err)) 
        }



export const setMyGroupsForPosts = (userData)=> {
    return {
        type: MY_FILTERED_GROUPS_FOR_POST,
        payload: userData
    }
}


export const setMyGroupsForColleagues = (userData)=> {
    return {
        type: MY_FILTERED_GROUPS_FOR_COLLEAGUES,
        payload: userData
    }
}


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
         ToastAndroid.show('Please wait...', ToastAndroid.LONG)
            dispatch({
                type: SET_PROFILE_WITHDATA,
                payload: data
            })
            
           // dispatch( getposts(userdata.token, userinfo) )
           
        }).catch(err=>{ 
           
            ToastAndroid.show('Something is wrong..', ToastAndroid.LONG)
        })
    
}

//follow and unfollow
export const starProfile = (userData, token, groups)=> dispatch=> {
   
    
    axios.post(`http://192.168.43.76:3001/api/profile/star/${userData}?access_token=${token}`)
    .then(res=> 
        {
            console.log(res)
            dispatch({
            type: UPDATE_OTHER_PROFILE,
            payload: res.data
        })
        dispatch(getAllCollegues(token,groups ))
       
        }) .catch(err => console.log(err)) 
        }
export const starProfile2 = (userData, token, groups)=> dispatch=> {


    axios.post(`http://192.168.43.76:3001/api/profile/star2/${userData}?access_token=${token}`)
    .then(res=> 
        {
            console.log(res)
            dispatch({
            type: UPDATE_USER_PROFILE,
            payload: res.data
        })
        dispatch(getAllCollegues(token,groups ))
        
        }) .catch(err => console.log(err)) 
        }
export const unstarProfile = (userData, token, groups)=> dispatch=> {

    
    axios.post(`http://192.168.43.76:3001/api/profile/unstar/${userData}?access_token=${token}`)
    .then(res=> 
        {
            console.log(res)
            dispatch({
            type: UPDATE_OTHER_PROFILE,
            payload: res.data
        })
        dispatch(getAllCollegues(token,groups ))
        
        }) .catch(err => console.log(err)) 
        }
export const unstarProfile2 = (userData, token, groups)=> dispatch=> {


    axios.post(`http://192.168.43.76:3001/api/profile/unstar2/${userData}?access_token=${token}`)
    .then(res=> 
        {
            console.log(res)
            dispatch({
            type: UPDATE_USER_PROFILE,
            payload: res.data
        })
        dispatch(getAllCollegues(token,groups ))
        
        }) .catch(err => console.log(err)) 
        }


















