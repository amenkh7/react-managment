import { Children, useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
const UserContext=createContext()
export function UserProvider({children}){
    const [name,setName]=useState("Amen")
    return(
        <UserContext.Provider value={{name,setName}}>
            {children}
        </UserContext.Provider>
    )
}
export function ShowName(){
    const{name}=useContext(UserContext)
    return <h1>hello {name}!</h1>
}
export function ChangeName(){
    const {setName}=useContext(UserContext)
    return <button onClick={()=>setName("World")}>Change Name</button>
}