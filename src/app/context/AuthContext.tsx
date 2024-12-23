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

  return (
    <AuthContext.Provider
      value={{ profile, setProfile, logOut, setProfileState }}
    >
      {children}
    </AuthContext.Provider>
  );
};