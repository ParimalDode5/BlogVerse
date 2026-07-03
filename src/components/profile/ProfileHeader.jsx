import React from 'react'
import { useSelector } from 'react-redux';

function ProfileHeader() {
    
    const userData = useSelector(state => state.auth.userData);

    const DP = userData.name
                            .split(" ")
                            .map(word => word[0])
                            .join("")
                            .toUpperCase();
    
    
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-between">
            <div className="w-28 h-28 rounded-full bg-linear-to-br from-blue-600 to-indigo-700
                            flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                {DP}
            </div>
            <h2 className="text-3xl font-bold">
                {userData.name}
            </h2>

            <p className="text-gray-500 mt-1">
                {userData.email}
            </p>

            <p className="text-gray-400 mt-2">
                Joined {
                    new Date(userData.$createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })
                }
            </p>

            <button
                className="bg-blue-600 hover:bg-blue-700
                text-white
                px-5
                py-2
                rounded-lg">
                    Edit Profile
                </button>
        </div>
    )
}

export default ProfileHeader