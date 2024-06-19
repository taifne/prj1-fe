"use client"
import React, { FC, ReactNode } from "react";
import Rendering from "@/components/ConditionRender/ConditionRendering"; 
import LoadingAnimation from "../Loading/Loading";

type RenderStateProps = {
    loading: boolean;
    success: boolean;
    error: boolean;
    children:ReactNode
  };
  
  const RenderState: FC<RenderStateProps> = ({ loading, success, error, children }) => {
    return (
      <Rendering.Conditional>
        <Rendering.When isTrue={loading}>
        <LoadingAnimation />
        </Rendering.When>
        <Rendering.When isTrue={success}>{children}</Rendering.When>
        <Rendering.When isTrue={error}>
        <div className="bg-white p-8 rounded-lg shadow-lg text-center fade-in">
        <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m0-4h.01M12 16v1m-6-1h6m6 0h6M6 8h6m6 0h6M6 8H4m2 0H2m6 4H4m2 0H2m6 4H4m2 0H2m6 4H4m2 0H2m6 0h6m6 0h6"></path>
            </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to access this resource.</p>
        <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            Go Back
        </button>
    </div>
        </Rendering.When>
      </Rendering.Conditional>
    );
  }
  
  export default RenderState;