import { SET_PROFILE_WITHDATA, 
    DELETE_AUTH_USER , 
    GET_CURRENT_PROFILE,
    GET_ALL_USERS,
    SET_LOADING, 
    UPDATE_USER_PROFILE, 
    GET_SINGLE_USER,
    GET_SEARCHED_USER, 
    GET_ALL_COLLEGUES, 
    GET_POSTS, DELETE_POST,
    ADD_POST ,SINGLE_POST,
    UPDATE_USER, 
    UPDATE_OTHER_PROFILE,
    NIGHT_MODE_ON, NIGHT_MODE_OFF,
    LOGIN_USER, 
    REMOVE_LOADING,
    LOG_OUT,
    GET_ERRORS, CLEAR_ERRORS,
    GET_ALL_GROUPS,
    MY_GROUPS,
    HIDE_BIO,
    HIDE_SKILLS,
    SHOW_BIO,
    SHOW_SKILLS,
    MY_ACTIVE_GROUPS,
    MY_FILTERED_GROUPS_FOR_COLLEAGUES,
    MY_FILTERED_GROUPS_FOR_POST
    } from '../actions/types'
//import isEmpty from '../../validation/isEmpty'

const initialState={
    loading:false,
    loggedIn: false,
    user:null,
    userInfo: null,
    allUsers:null,
    profile:null,
    searchedUser:null,
    allCollegues:[],
    post:null,
    posts:[],
    nightmode: false,
    errors:[],
    allGroups:null,
    myGroups:[],
    myActiveGroups:[],
    myFilteredGroupsForPost:[],
    myFilteredGroupsForColleagues:[],
    hideBio: false,
    hideSkills:false

}
export default function(state= initialState, action){
    switch (action.type) {

        case GET_ERRORS: 
        return{
            ...state,
            errors:action.payload,
            loading:false
        }
        case CLEAR_ERRORS:
        return{
            ...state,
            errors:[],
            loading:false
        }
        case LOG_OUT:
        return {
            ...state,
            loggedIn: false,
           loading:false
          
        }
       case LOGIN_USER:
        return {
            ...state,
            loggedIn: true,
            user:action.payload,
            loading:false,
            
        }
        
        case UPDATE_USER:
        return {
            ...state,
            loggedIn: true,
            user:action.payload,
            loading:false,
            
        }
        case UPDATE_OTHER_PROFILE:
        return {
            ...state,
            loggedIn: true,
            profile:action.payload,
            loading:false,
            
        }
        case GET_SEARCHED_USER:
        return {
            ...state,
            loggedIn: true,
            loading:false,
            searchedUser:action.payload
        }
        case SET_PROFILE_WITHDATA:
        return {
            ...state,
            loggedIn: true,
            userInfo:action.payload ,
            loading:false     
        }

        case UPDATE_USER_PROFILE:
        return {
            ...state,
            loggedIn: true,
            userInfo:action.payload,
            loading:false     
        }

        case SET_LOADING:
        return {
            ...state,
            loading:true     
        }
        case REMOVE_LOADING:
        return {
            ...state,
            loading:false     
        }
        case NIGHT_MODE_ON:
        return {
            ...state,
            nightmode: true    
        }

        case NIGHT_MODE_OFF:
        return {
            ...state,
            nightmode: false   
        }
        case HIDE_BIO:
        return {
            ...state,
            hideBio: true   
        }
        case HIDE_SKILLS:
        return {
            ...state,
            hideSkills: true   
        }

        case SHOW_BIO:
        return {
            ...state,
            hideBio: false   
        }
        case SHOW_SKILLS:
        return {
            ...state,
            hideSkills: false   
        }

        case DELETE_AUTH_USER:
        return {
            ...state,
            loggedIn:false,
            user:action.payload,
            userInfo:action.payload,
            loading:false
        }
        case GET_ALL_USERS:
        return {
            ...state,
           allUsers: action.payload,
           loading:false
            
        }
        case GET_ALL_GROUPS:
        return {
            ...state,
           allGroups:action.payload,
           loading:false
            
        }
        case GET_ALL_COLLEGUES:
        return {
            ...state,
           allCollegues:action.payload,
           loading:false
            
        }
        case GET_SINGLE_USER:
        return {
            ...state,
            profile:action.payload,
           loading:false
            
        }
        
        case GET_CURRENT_PROFILE:
            return {
                ...state,
              userInfo:action.payload,
              loading:false
            } 
        case MY_GROUPS: 
            return {
              ...state, 
              myGroups: action.payload,
              loading: false
            }
        case MY_ACTIVE_GROUPS: 
            return {
              ...state, 
              myActiveGroups: action.payload,
              loading: false
            }
         case MY_FILTERED_GROUPS_FOR_COLLEAGUES: 
            return {
              ...state, 
              myFilteredGroupsForColleagues: action.payload,
              loading: false
            }
         case MY_FILTERED_GROUPS_FOR_POST: 
            return {
              ...state, 
              myFilteredGroupsForPost: action.payload,
              loading: false
            }
            //post reducer
        case GET_POSTS: 
            return {
              ...state, 
              posts: action.payload,
              loading: false
            }
        case ADD_POST: 
              return {
                ...state,
                posts: [action.payload, ...state.posts],
                post: action.payload,
                loading:false
              }
        case SINGLE_POST: 
              return {
                ...state,
                post: action.payload,
                loading:false,
              }
                
              
        case DELETE_POST: 
               return {
                 ...state,
                 posts: state.posts.filter(post => post._id !== action.payload)
               }
       
        default:
            return state;
    }
}