import {createContext, useEffect, useState} from 'react'

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{

    const[user, setUser] = useState(null);

    const login =(userData)=>{

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData))

    }
    const getData = ()=>{
        const receivedData = localStorage.getItem('user');
        if(receivedData)
        {
            setUser(JSON.parse(receivedData));
        }
    }

    useEffect(()=>{
        getData()
    }, []);

    return(
        <AuthContext.Provider value={{user, login, getData}}>
            {children}
        </AuthContext.Provider> 
    );

}