import {
  useReducer,
  useEffect,
} from 'react'
import useFetch from '../hooks/useFetch'
import * as Types from '../types/types'
import './App.css'
import Login from './pages/Login'
import { ThemeProvider, createTheme } from '@mui/material'
import Dashboard from './pages/Dashboard'

function App() {
  const loggedInUserToken: string | null = localStorage.getItem("token");

  const initialUserData: Types.ReducerState = {
    userToken: loggedInUserToken,
    userObject: null,
    smeData: null,
    error: null
  }

  const reducer = (state: Types.ReducerState, action: Types.ReducerAction) => {
    switch (action.type) {
      case Types.reducerActionTypes.userToken:
        return { ...state, userToken: action.value }
      case Types.reducerActionTypes.userObject:
        return { ...state, userObject: action.value }
      case Types.reducerActionTypes.smeData:
        return { ...state, smeData: action.value }
      case Types.reducerActionTypes.error:
        return { ...state, error: action.value }
      default:
        return state
    }
  }

  const [userDataState, dispatch] = useReducer(reducer, initialUserData);
  const smeData: Types.FetchResponse = useFetch("http://localhost:3000/sme-data", [userDataState.userToken], true);
  const userData: Types.FetchResponse = useFetch("http://localhost:3000/users", [userDataState.userToken], true);
  
  useEffect(() => {
    if (smeData.error) {
      dispatch({ type: Types.reducerActionTypes.error, value: smeData.error })
    } else if (userData.error) {
      dispatch({ type: Types.reducerActionTypes.error, value: userData.error })
    } else {
      dispatch({ type: Types.reducerActionTypes.error, value: null })
      dispatch({ type: Types.reducerActionTypes.smeData, value: smeData.data })
      if (userData.data && Array.isArray(userData.data)) {
        userData.data.forEach(userElement => {
          if ('email' in userElement && userElement.email === localStorage.getItem("email")) {
            dispatch({ type: Types.reducerActionTypes.userObject, value: userElement })
          }  
        });
      }
    }
  }, [smeData, userData])

  // Use branding colors (but replaced Alliance font with IBM Plex Sans)
  const theme = createTheme({
    palette: {
      primary: {
        main: '#F55421'
      },
      secondary: {
        main: '#615AFF'
      }
    },
    typography: {
      fontFamily: "IBM Plex Sans"
    }
  })

  return (
    <ThemeProvider
      theme={theme}
    >
      <Types.GlobalUserContext.Provider
        value={{
          userDataState: userDataState,
          dispatch: dispatch
        }}
      >
        {
          loggedInUserToken ?
            <Dashboard /> :
            <Login
              didClickLogin={(token) =>
                dispatch({ type: Types.reducerActionTypes.userToken, value: token })
              }
            />
        }
      </Types.GlobalUserContext.Provider>
    </ThemeProvider>
  )
}

export default App
