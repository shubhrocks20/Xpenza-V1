import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { profile } from "@/http";
import Cookies from "js-cookie";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  avatar?: string;
}

const Dashboard: React.FC = () => {
  const {data : myData, isLoading: isProfileLoading} = useQuery({
    queryKey: ['me'],
    queryFn: profile
  })


  if (isProfileLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full shadow-lg border-4 border-blue-500"
            src={myData?.user?.avatar }
            alt="User Avatar"
          />
          <h2 className="text-xl font-semibold mt-4">{myData?.user?.name}</h2>
          <p className="text-gray-600">{myData?.user?.email}</p>

        </div>

        
        <div className="mt-6 space-y-4">
          <InfoRow label="Username" value={myData?.user?.username} />
        </div>

       
        <div className="mt-6 text-center">
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition" onClick={() => {
            Cookies.remove('access_token')
            window.location.reload()
          }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <div className="flex justify-between text-gray-700">
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

export default Dashboard;
