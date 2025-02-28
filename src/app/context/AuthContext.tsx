'use client'
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { modifyUser, fetchUserById } from "../api/userApi";

interface AuthContextProps {
  profile: UserProfile | null;
  logOut: () => void;
  setProfile: (profile: UserProfile) => void;
  setProfileState: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  addProfileReactionState: (targetArticleId:string)=>void
  removeProfileReactionState: (targetArticleId:string)=>void
}


function removeIfExists(str: string, arr: string[]): void {
  const index = arr.indexOf(str);
  if (index !== -1) {
    arr.splice(index, 1);
  }
}


export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfileState] = useState<UserProfile | null>(null);

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      setProfileState(JSON.parse(savedProfile));
    }
  }, []);

  // save the profile on the database
  const setProfile = (profile: UserProfile) => {
    modifyUser(profile);
    fetchUserById(profile.id).then((data) => {
      localStorage.setItem("profile", JSON.stringify(data));
      setProfileState(data);
    });
  };

  const logOut = () => {
    setProfileState(null);
    localStorage.removeItem("profile");
  };

  const addProfileReactionState =  (targetArticleId:string)=>{
    setProfileState((prev)=>{
      if (prev){
        prev.interaksi = prev.interaksi || []
        prev.interaksi.push(targetArticleId)
      }
      return prev
    })
    if (profile) {
      localStorage.removeItem("profile");
      localStorage.setItem("profile",JSON.stringify(profile))}
  }

  const removeProfileReactionState = (targetArticleId:string) =>{
    setProfileState((prev)=>{
      if (prev){
        prev.interaksi = prev.interaksi || []
        removeIfExists(targetArticleId, prev.interaksi)
      }
      return prev
    })
    if (profile) {
      localStorage.removeItem("profile");
      localStorage.setItem("profile",JSON.stringify(profile))}
  }
  return (
    <AuthContext.Provider
      value={{ profile, setProfile, logOut, setProfileState,addProfileReactionState,removeProfileReactionState  }}
    >
      {children}
    </AuthContext.Provider>
  );
};