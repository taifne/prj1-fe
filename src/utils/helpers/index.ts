import { login, logout } from "../../store/slices/auth";
import { BASE_URL } from "../../utils/constants";
import { REQUEST_METHOD, REQUEST_TYPE, RequestConfig } from "../types";

import {
  addUser,
  deleteUser,
  getList,
  updateUser,
} from "../../store/slices/user";



const getRequestConfig = (
  type: REQUEST_TYPE,
  slug?: string
): RequestConfig | undefined => {
  switch (type) {
    case REQUEST_TYPE.LOGIN:
      return {
        method: REQUEST_METHOD.POST,
        isShowToast: true,
        isDispatch: true,
        action: login,
        url: `${BASE_URL}/auth/login`,
        redirect: {
          success: "/topo",
        },
      };
    case REQUEST_TYPE.LOGOUT:
      return {
        method: REQUEST_METHOD.GET,
        isShowToast: true,
        isDispatch: true,
        action: logout,
        url: `${BASE_URL}/auth/logout`,
        redirect: {
          success: "/login",
        },
      };
    case REQUEST_TYPE.USER:
      return {
        url: `${BASE_URL}/users`,
        method: REQUEST_METHOD.GET,
        isShowToast: false,
        isDispatch: true,
        action: getList,
      };
    case REQUEST_TYPE.DELETE_USER:
      return {
        url: `${BASE_URL}/users/${slug}`,
        method: REQUEST_METHOD.DELETE,
        isShowToast: true,
        isDispatch: true,
        action: deleteUser,
      };

    case REQUEST_TYPE.UPDATE_USER:
      return {
        url: `${BASE_URL}/users`,
        method: REQUEST_METHOD.PUT,
        isShowToast: true,
        isDispatch: true,
        action: updateUser,
      };
    case REQUEST_TYPE.ADD_USER:
      return {
        url: `${BASE_URL}/users`,
        method: REQUEST_METHOD.POST,
        isShowToast: true,
        isDispatch: true,
        action: addUser,
      };


    case REQUEST_TYPE.UPDATE_ROLE_USER:
      return {
        url: `${BASE_URL}/users/updateRole`,
        method: REQUEST_METHOD.POST,
        isShowToast: true,
        isDispatch: true,
        // action: addUser,
      };
    case REQUEST_TYPE.ACTIVE_USER:
      return {
        url: `${BASE_URL}/users/account`,
        method: REQUEST_METHOD.PUT,
        isShowToast: true,
        isDispatch: true,
        // action: addUser,
      };



    case REQUEST_TYPE.GET_EXECUTIVECASE:
      return {
        url: `${BASE_URL}/statistic/executivecase/?${slug}`,
        method: REQUEST_METHOD.GET,
        isShowToast: false,
        isDispatch: false,
      };
    case REQUEST_TYPE.GET_INCIDENTVECTOR:
      return {
        url: `${BASE_URL}/statistic/incidentvector/?${slug}`,
        method: REQUEST_METHOD.GET,
        isShowToast: false,
        isDispatch: false,
      };
    case REQUEST_TYPE.VULNERABILITY:
      return {
        url: `${BASE_URL}/statistic/vulnerability/` + slug,
        method: REQUEST_METHOD.GET,
        isShowToast: false,
        isDispatch: false,

        // action: getListVulnerability,
      };
    case REQUEST_TYPE.GET_INCIDENTVECTOR:
      return {
        url: `${BASE_URL}/statistic/incidentvector/?${slug}`,
        method: REQUEST_METHOD.GET,
        isShowToast: false,
        isDispatch: false,
      };

    case REQUEST_TYPE.GET_RSA_PUBLLIC_KEY:
      return {
        url: `${BASE_URL}/public-key`,
        method: REQUEST_METHOD.GET,
        isShowToast: false,
        isDispatch: false,
      };
    case REQUEST_TYPE.GET_AGENT_STATUS:
      return {
        url: `${BASE_URL}/statistic/agentstatus` + slug,
        method: REQUEST_METHOD.GET,
        isShowToast: false,
        isDispatch: false,
      };
    case REQUEST_TYPE.GET_THREAD_RADA:
      return {
        url: `${BASE_URL}/statistic/threatradar/?tenantID=demo&timestamp=pastday`,
        method: REQUEST_METHOD.GET,
        isShowToast: false,
        isDispatch: false,
      };
    case REQUEST_TYPE.GET_ATTACH_CHAIN:
      return {
        url: `${BASE_URL}/statistic/attackchainstatistics/?tenantID=demo&timestamp=pastday`,
        method: REQUEST_METHOD.GET,
        isShowToast: false,
        isDispatch: false,
      };
    case REQUEST_TYPE.GET_TOPNEW_ALERT:
      return {
        url: `${BASE_URL}/statistic/topnewalert/?tenantID=demo&timestamp=pastday`,
        method: REQUEST_METHOD.GET,
        isShowToast: false,
        isDispatch: false,
      };
      case REQUEST_TYPE.GET_EPS_ASSET:
        return {
          url: `${BASE_URL}/epsasset/?timespan=` + slug,
          method: REQUEST_METHOD.GET,
          isShowToast: false,
          isDispatch: false,
        };
    case REQUEST_TYPE.GET_EPS_MONITOR:
      return {
        url: `${BASE_URL}/monitoring/epsAsset/?timespan=` + slug,
        method: REQUEST_METHOD.GET,
        isShowToast: false,
        isDispatch: false,
      };
      case REQUEST_TYPE.GET_CASE_MONITORING:
      return {
        url: `${BASE_URL}/casemonitoring/`+slug,
        method: REQUEST_METHOD.GET,
        isShowToast: false,
        isDispatch: false,
      };
      case REQUEST_TYPE.POST_CASE_ALERT:
      return {
        url: `${BASE_URL}/casemonitoring/alertsearch`,
        method: REQUEST_METHOD.POST,
        isShowToast: false,
        isDispatch: false,
      };
    case REQUEST_TYPE.GET_SEC_NEWS:
      return {
        url: `${BASE_URL}/statistic/gettopsecnew` + slug,
        method: REQUEST_METHOD.GET,
        isShowToast: false,
        isDispatch: false,
      };

    case REQUEST_TYPE.GET_SECNEWS_ALL:
      return {
        url: `${BASE_URL}/statistic/getallsecnew`,
        method: REQUEST_METHOD.GET,
        isShowToast: false,
        isDispatch: false,
      };

    case REQUEST_TYPE.UPDATE_TENANT:
      return {
        url: `${BASE_URL}/tenant/${slug}`,
        method: REQUEST_METHOD.PUT,
        isShowToast: true,
        isDispatch: false,
      };
    case REQUEST_TYPE.DELETE_TENANT:
      return {
        url: `${BASE_URL}/tenant/${slug}`,
        method: REQUEST_METHOD.DELETE,
        isShowToast: true,
        isDispatch: false,
      };
    case REQUEST_TYPE.ADD_TENANT:
      return {
        url: `${BASE_URL}/tenant`,
        method: REQUEST_METHOD.POST,
        isShowToast: true,
        isDispatch: false,
      };
    case REQUEST_TYPE.GET_SOC_METRIC:
      return {
        url: `${BASE_URL}/statistic/socmetric` + slug,
        method: REQUEST_METHOD.GET,
        isShowToast: false,
        isDispatch: false,

      };
    default:
      break;
  }
};

export { getRequestConfig };
