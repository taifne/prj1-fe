import useFetch from "@/hooks/useFetch";
import { ChangeEvent, FormEvent, useState } from "react";
import { REQUEST_TYPE } from "@/utils/types";
import { PiSignInBold } from "react-icons/pi";
import { FiLoader } from "react-icons/fi";
import { title } from "@/utils/constants";

const Login = () => {
    const { isLoading, sendRequest } = useFetch();
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLoading) return;
        sendRequest({ type: REQUEST_TYPE.LOGIN, formData });
    };

    return (
        <div className="glassmorphism px-16 py-20">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col gap-5 justify-center items-center">
                    <h1 className="text-2xl font-bold text-center uppercase">
                        Welcome to <br />
                        <span className="text-4xl font-bold">{title}</span>
                    </h1>
                    <p className="w-80 text-center text-sm font-semibold tracking-wide cursor-pointer">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quaerat, odit.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <input
                        required
                        type="text"
                        name="userName"
                        value={formData.userName}
                        placeholder="Username"
                        className="font-bold bg-transparent block text-sm py-3 px-4 rounded-lg w-full border-2 border-white/10 focus:border-white/50 outline-none"
                        onInput={handleInputChange}
                    />
                    <input
                        required
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Password"
                        className="font-bold bg-transparent block text-sm py-3 px-4 rounded-lg w-full border-2 border-white/10 focus:border-white/50 outline-none"
                        onInput={handleInputChange}
                    />
                </div>
                <button className="bg-gradient-custom shadow-2xl hover:brightness-110 px-6 py-3 w-full text-lg font-bold uppercase text-white rounded-2xl flex gap-2 items-center justify-center">
                    {isLoading ? (
                        <>
                            <FiLoader className="animate-spin" /> Loading...
                        </>
                    ) : (
                        <>
                            <PiSignInBold /> Login
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default Login;
