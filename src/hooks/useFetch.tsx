import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { SendRequestProps } from "@/utils/types";
import { getRequestConfig } from "@/utils/helpers";
import { useAppSelector } from "@/hooks/useAppSelector";
import createAxios from "@/utils/helpers/createAxios";
import { useModal } from "./useModal";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const sendRequest = async ({ type, formData, slug }: SendRequestProps) => {
    try {
      setIsLoading(true);

      const config = getRequestConfig(type, slug);
      if (!config) throw Error("Invalid request type!");

      const { method, url, isShowToast, isDispatch, action, redirect } = config;

      const JWTAxios = createAxios(token, dispatch);
      const { data } = await JWTAxios({ method, url, data: formData });

      setIsLoading(false);

      if (data.success) {
        if (isDispatch && action) dispatch(action(data.payload));
        if (isShowToast) {
          toast.success(data.message);
          closeModal();
        }
        if (redirect?.success) navigate(redirect.success);
      } else {
        if (redirect?.error) navigate(redirect.error);
        throw data.payload;
      }
      return data;
    } catch (error: any) {
      setIsLoading(false);
      toast.error(
        error.response.data.payload ||
          error.response.data.message ||
          "Something went wrong!"
      );
    }
  };

  return { isLoading, sendRequest };
};

export default useFetch;
