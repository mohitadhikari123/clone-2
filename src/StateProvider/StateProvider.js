import React, {createContext,useContext,useReducer} from "react";
export const StateContext =createContext();
//   Preparing the data Layer
export const  StateProvider = ({reducer,initialState,children})=>(
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);
//Hook which allows us to pull information from the data layer
export const useStateValue =()=>useContext(StateContext);