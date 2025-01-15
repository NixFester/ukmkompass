'use client'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ListMenu from "./bagianHeader/ListMenu";

export default function HeaderChoice(){
    const authContext = useContext(AuthContext);
      if (!authContext) {
        throw new Error("Profile must be used within AuthProvider");
      }
      const { profile } = authContext;
    return(
        <ListMenu
              type={false}
              teks={profile ? "Akun" : "Log In"}
              href={profile ? "/dashboard/akun" : "/auth"}
            />
    )
}