import Carousel from "./carousel";
import { useModal } from "@/hooks/useModal";
import { Shield } from "./shield";
import soc from "../../../../public/assets/images/hsoc-login/logo-hsoc.png";
import logo_siem from "../../../../public/assets/images/hsoc-login/logo-siem.png";
import logo_log from "../../../../public/assets/images/hsoc-login/logo-log.png";
import logo_knowledge from "../../../../public/assets/images/hsoc-login/logo-knowledge.png";
import logo_rd from "../../../../public/assets/images/hsoc-login/logo-r&d.png";
import logo_report from "../../../../public/assets/images/hsoc-login/logo-report.png";
import logo_threat from "../../../../public/assets/images/hsoc-login/logo-threat.png";
import logo_agg from "../../../../public/assets/images/hsoc-login/logo-agg.png";
import logo_ticket from "../../../../public/assets/images/hsoc-login/logo-ticket.png";
import "./style.css";
import { title } from "@/utils/constants";
import { Input, Password } from "rizzui";
import { useFormik } from "formik";
import * as Yup from "yup";
import useFetch from "@/hooks/useFetch";
import { REQUEST_TYPE } from "@/utils/types";

const Introduction = () => {
    const { openModal } = useModal();
    return (
        <div className="p-8 px-20 flex flex-col h-screen overflow-hidden ">
            <div className="flex  justify-between items-center mb-4 ">
                <div className="flex gap-2 justify-center items-center">
                    <div className="flex h-12 w-20 justify-center items-center animate-spin-slow">
                        <Shield />
                    </div>
                    <p className="font-bold text-white text-3xl">
                        HSOC PLATFORM
                    </p>
                </div>
                <button
                    onClick={() => {
                        openModal({ view: <FormLogin /> });
                    }}
                    type="button"
                    className="inline-block text-md px-4 py-2 mr-3 font-bold text-center text-white uppercase align-middle transition-all rounded-md cursor-pointer  leading-pro  ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-110 hover:rotate-2 hover:bg-pink-700 hover:text-pink-200 hover:shadow-lg active:opacity-85 bg-gradient-custom shadow-2xl hover:brightness-110 text-md  gap-2 items-center justify-center"
                >
                    Get Started
                </button>
            </div>
            <div className="grid grid-cols-8  p-4 rounded-md ring-0 mt-20 gap-9 ">
                <div className="col-span-4 pl-[4.5rem] flex flex-col justify-center gap-5 z-50">
                    <span className="font-bold uppercase text-white text-4xl">
                        Security Operation Center
                    </span>
                    <span className="mt-5 w-full text-xl font-medium bg-clip-text  text-transparent bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-100 via-pink-100 to-orange-200   ">
                        From risk assessment to incident response, we secure
                        your digital world with comprehensive expertise. Your
                        security is our priority.
                    </span>
                </div>
                <div className="col-span-4 p-2 flex justify-center items-center">
                    <div className="h-[300px] w-[300px] one-div z-50">
                        <Logo />
                    </div>
                </div>
            </div>

            <div className="relative ">
                <Carousel />
            </div>
        </div>
    );
};

export const FormLogin = () => {
    const { closeModal } = useModal();
    const { isLoading, sendRequest } = useFetch();
    const formik = useFormik({
        initialValues: {
            userName: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            userName: Yup.string().required("Username is required."),
            password: Yup.string().required("Password is required."),
        }),
        validateOnChange: true,
        onSubmit: async (value) => {
            const report = {
                userName: value.userName,
                password: value.password,
            };
            const { success } = await sendRequest({
                type: REQUEST_TYPE.LOGIN,
                formData: report,
            });
            if (success) closeModal();

            // login({ email: report.email, password: report.password });
        },
    });

    return (
        <div className="relative px-4 py-10  bg-white   mx-8 md:mx-0 shadow rounded-lg">
            <div className="max-w-md mx-auto">
                <div className="flex flex-col gap-5 justify-center items-center">
                    <h1 className="text-2xl font-bold text-center uppercase">
                        Welcome to <br />
                        <span className="text-4xl font-bold">{title}</span>
                    </h1>
                    {/* <p className="w-80 text-center text-sm font-semibold tracking-wide cursor-pointer">
                        From risk assessment to incident response, we secure
                        your digital world with comprehensive expertise. Your
                        security is our priority.
                    </p> */}
                </div>
                <div className="mt-10">
                    <form className="space-y-3" onSubmit={formik.handleSubmit}>
                        <Input
                            name="userName"
                            size="lg"
                            label="Username"
                            placeholder="Enter your username"
                            color="info"
                            className="[&>label>span]:font-medium"
                            inputClassName="text-sm"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userName}
                        />
                        {formik.errors.userName && formik.touched.userName ? (
                            <p className="animate-face-in text-left font-medium text-xs text-red-500">
                                Username is invalid
                            </p>
                        ) : null}
                        <Password
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            size="lg"
                            className="[&>label>span]:font-medium [svg]:text-white"
                            inputClassName="text-sm"
                            color="info"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <p className="animate-face-in text-left font-medium text-xs text-red-500">
                                Password is invalid
                            </p>
                        ) : null}

                        <div className="mt-5">
                            <button
                                disabled={
                                    formik.isSubmitting || !formik.isValid
                                }
                                type="submit"
                                className="bg-gradient-custom shadow-2xl hover:brightness-110 px-6 py-3 w-full text-lg font-bold uppercase text-white rounded-2xl flex gap-2 items-center justify-center disabled:cursor-not-allowed"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>

                {/* <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
                    <div className="text-xs text-gray-500 uppercase dark:text-gray-400">
                        Welcome
                    </div>
                    <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4" />
                </div> */}
            </div>
        </div>
    );
};

const Logo = () => {
    return (
        <div className="relative h-full w-full flex items-center justify-center z-50">
            <div className="profileCard_container relative p-10 border-2 border-dashed rounded-full border-spacing-4 border-gray-400/50">
                <button className="profile_item left-32 -top-[40px] absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
                    <span className="block w-[60px] h-[60px] transition-all duration-500 rounded-full z-[2]">
                        <img
                            src={logo_ticket}
                            className="w-full h-full object-cover"
                            alt="Ticket Logo"
                        />
                        <span className=" absolute right-0 -top-6 flex items-center justify-center text-white font-bold">
                            Ticketing
                        </span>
                    </span>
                </button>
                <button className="profile_item left-[5px] top-[10px] absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
                    <span className="block w-[60px] h-[60px] transition-all duration-500 rounded-full z-[2]">
                        <img
                            src={logo_siem}
                            className="w-full h-full object-cover"
                            alt="SIEM Logo"
                        />
                        <span className=" absolute right-20 top-5 flex items-center justify-center text-white font-bold">
                            SIEM
                        </span>
                    </span>
                </button>
                <button className="profile_item right-[5px] top-[10px] absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
                    <span className="block  w-[60px] h-[60px] transition-all duration-500 rounded-full z-[2] ">
                        <img
                            src={logo_log}
                            className="w-full h-full object-cover"
                            alt="Log Logo"
                        />
                        <span className=" absolute left-20 top-2 flex items-center justify-center text-white font-bold">
                            Log Collection
                        </span>
                    </span>
                </button>
                <button className="profile_item -left-8 top-28 absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
                    <span className="block w-[60px] h-[60px] transition-all duration-500 rounded-full z-[2] ">
                        <img
                            src={logo_knowledge}
                            className="w-full h-full object-cover"
                            alt="Log Logo"
                        />
                        <span className=" absolute right-20 top-2 flex items-center justify-center text-white font-bold">
                            Knowledge Base
                        </span>
                    </span>
                </button>
                <button className="profile_item -right-8 top-28 absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
                    <span className="block w-[60px] h-[60px] transition-all duration-500 rounded-full z-[2] ">
                        <img
                            src={logo_rd}
                            className="w-full h-full object-cover"
                            alt="Log R&D"
                        />
                        <span className=" absolute left-20 top-5 flex items-center justify-center text-white font-bold">
                            R&D
                        </span>
                    </span>
                </button>
                <button className="profile_item bottom-4 -left-1 absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
                    <span className="block w-[60px] h-[60px] transition-all duration-500 rounded-full z-[2] ">
                        <img
                            src={logo_report}
                            className="w-full h-full object-cover"
                            alt="Log Report"
                        />
                        <span className=" absolute right-20 top-5 flex items-center justify-center text-white font-bold">
                            Reporting
                        </span>
                    </span>
                </button>
                <button className="profile_item bottom-4 -right-1 absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
                    <span className="block w-[60px] h-[60px] transition-all duration-500 rounded-full z-[2] ">
                        <img
                            src={logo_threat}
                            className="w-full h-full object-cover"
                            alt="Log Threat"
                        />
                        <span className=" absolute left-20 top-2 flex items-center justify-center text-white font-bold">
                            Threat Intelligence
                        </span>
                    </span>
                </button>
                <button className="profile_item right-[40%] -bottom-8 absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
                    <span className="block w-[60px] h-[60px] transition-all duration-500 rounded-full z-[2] ">
                        <img
                            src={logo_agg}
                            className="w-full h-full object-cover"
                            alt="Log Threat"
                        />
                        <span className=" absolute left-20 top-6 flex items-center justify-center text-white font-bold">
                            Aggregation
                        </span>
                    </span>
                </button>
                <button className="profile_item w-[230px] h-[230px] p-1 border-2 rounded-full hover:border-gray-400/50 cursor-pointer transition-all duration-500 z-0">
                    <div className="w-full  h-full flex items-center justify-center p-2 rounded-full active:scale-95 hover:scale-95 object-cover transition-all duration-500">
                        <span className="w-52 h-52 inline-block">
                            <img
                                src={soc}
                                className="object-cover h-full w-full text "
                            />
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Introduction;
