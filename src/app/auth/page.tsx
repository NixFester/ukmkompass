'use client'
import React, { useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";

const Auth: React.FC = () => {
    const router = useRouter();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Auth must be used within AuthProvider");
  }
  const { profile, setProfile, logOut } = authContext;

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        );
        const profileData = {
          id: res.data.id,
          email: res.data.email,
          profpic: res.data.picture,
          name: res.data.name,
        };
        setProfile(profileData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    },
    onError: (error) => console.error("Login Failed:", error),
  });

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">
                {profile ? `Selamat Datang, ${profile.name}` : "Login"}
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {/* Google Login Section */}
                {profile && (
                  <div className="text-center mt-4">
                    {profile.profpic && <img
                      className="w-24 h-24 rounded-full mx-auto"
                      src={profile.profpic}
                      alt={profile.name}
                    />}
                    <p className="mt-2 text-2xl font-semibold">
                      {profile.name}
                    </p>
                    <p className="text-xl text-gray-600">{profile.email}</p>
                  </div>
                )}
                {!profile ? (
                  <div className="relative">
                    <Button
                      onClick={() => login()}
                      className="bg-red-500 text-white rounded-md px-4 py-2 w-full flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 11.8v4.5h6.6c-.3 1.8-1.9 5.3-6.6 5.3-4 0-7.4-3.3-7.4-7.4s3.3-7.4 7.4-7.4c2.3 0 3.8 1 4.7 1.9l3.4-3.3c-2.3-2-5.3-3.1-8.1-3.1-7.5 0-12 6-12 12s6 12 12 12c6.9 0 11.4-4.9 11.4-11.4 0-.8-.1-1.5-.2-2.2H12z" />
                      </svg>
                      Google
                    </Button>
                  </div>
                ) : (
                  <div className="relative flex flex-row pt-10 ">
                    <Button
                      onClick={logOut}
                      className="bg-gray-500 text-white rounded-md px-4 py-2 w-full flex items-center justify-center mr-10"
                    >
                      Logout
                    </Button>
                    <Button
                      onClick={() => router.back()}
                      className="bg-cyan-400 text-white rounded-md px-4 py-2 w-full flex items-center justify-center"
                    >
                      Kembali
                    </Button>
                  </div>
                )}
                {/* Profile Information */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
