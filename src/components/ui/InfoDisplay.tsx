import { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";

export default function InfoDisplay({
    name,
    title,
    description,
    isDescription,
}) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="relative">
            <div className="px-5 rounded-lg bg-slate-300 w-full flex justify-between items-center ">
                <div></div>
                <h3 className=" text-sm py-0.5 text-black font-semibold text-center">
                    {name}
                </h3>
                <div>
                    {isDescription && (
                        <span
                            className="text-blue-500 text-xl"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <FaCircleInfo />
                        </span>
                    )}
                </div>
            </div>
            {isHovered && (
                <div className="absolute z-50 text-black px-4 py-2 bg-white border-2 border-blue-500 rounded shadow-md mt-2 right-0 max-w-72">
                    <h5 className="text-center mb-1 font-medium">{title}</h5>
                    <span>{description}</span>
                </div>
            )}
        </div>
    );
}
