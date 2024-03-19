import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export enum REQUEST_METHOD {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export enum REQUEST_TYPE {
  LOGIN = "login",
  LOGOUT = "logout",
  USER = "users",
  DELETE_USER = "delete_user",
  UPDATE_USER = "update_user",
  ADD_USER = "add_user",
  NETWORK_CHART = "network_chart",
  ADD_NETWORK_CHART = "add_network_chart",
  UPDATE_NETWORK_CHART = "update_network_chart",
  DELETE_NETWORK_CHART = "delete_network_chart",
  UPDATE_ROLE_USER = "update_role",
  ACTIVE_USER = "active_user",
  GET_TENANT = "get_tenant",
  ALERT = "alert",
  VULNERABILITY = "vulnerability",
  GET_EXECUTIVECASE = "get_executivecase",
  GET_RSA_PUBLLIC_KEY = "get_rsa_public_key",
  GET_AGENT_STATUS = "get_agent_status",
  GET_ATTACH_CHAIN = "get_attach_chain",
  GET_THREAD_RADA = "get_thread_rada",
  GET_TOPNEW_ALERT = "get_topnew_alert",
  GET_INCIDENTVECTOR = "get_incidentvector",
  GET_SOC_METRIC = "get_soc_metric",
  GET_SEC_NEWS = "gettopsecnew",
  GET_SECNEWS_ALL = "get_secnews_all",
  GET_TENANT_ALL = "get_tenant_all",
  GET_TENANT_DETAIL = "get_tenant_detail",
  GET_EPS_ASSET = "get_eps_asset",
  GET_EPS_MONITOR = "get_eps_monitor",
  GET_CASE_MONITORING = "get_case_monitoring",
  POST_CASE_ALERT = "post_case_alert",
  UPDATE_TENANT = "update_tenant",
  DELETE_TENANT = "delete_tenant",
  ADD_TENANT = "add_tenant",
}

export type RequestConfig = {
  url: string | undefined;
  method: REQUEST_METHOD;
  isShowToast: boolean;
  isDispatch: boolean;
  action?: ActionCreatorWithPayload<any, string>;
  redirect?: {
    success?: string;
    error?: string;
  };
};

export type SendRequestProps = {
  type: REQUEST_TYPE;
  formData?: any;
  slug?: any;
};
