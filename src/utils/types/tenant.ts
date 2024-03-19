export type TenantType = {
  updatedDate: string;
  active: string;
  tenant_id: string;
  tenant_name: string;
  alert_index: string;
  asset_index: string;
  vulnerability_index: string;
  incident_index: string;
  logs_index: string;
};
interface NessusArr {
  nessus_server: string;
  nessus_password: string;
  nessus_user: string;
  nessus_scan_id: string;
}

interface LogsArr {
  lbTestPastHourButton: string;
  logs_es_server: string;
  logs_es_password: string;
  logs_es_user: string;
  lbTestPastDayButton: string;
  logs_index: string;
  es_query_eps_past_day: string;
  es_query_eps_past_hour_result: string;
  es_query_eps_past_hour: string;
  es_query_eps_past_day_result: string;
}

export type TenantDetail = {
  updatedDate: string;
  active: string;
  tenant_id: string;
  tenant_name: string;
  tenant_fullname: string;
  contract_no: string;
  tenant_website: string;
  tenant_phone: string;
  tenant_email: string;
  tenant_address: string;
  tenant_summary: string;
  tt12_2022: string;
  alert_index: string;
  alert_es_server: string;
  alert_es_user: string;
  alert_es_password: string;
  asset_index: string;
  asset_es_server: string;
  asset_es_user: string;
  asset_es_password: string;
  vulnerability_index: string;
  vulnerability_es_server: string;
  vulnerability_es_user: string;
  vulnerability_es_password: string;
  incident_index: string;
  incident_es_server: string;
  incident_es_user: string;
  incident_es_password: string;
  logs_index: string;
  logs_es_server: string;
  logs_es_user: string;
  logs_es_password: string;
  ticket_index: string;
  ticket_es_server: string;
  ticket_es_user: string;
  ticket_es_password: string;
  daily_statistic_alert_index: string;
  timerange_statistic_alert_index: string;
  daily_statistic_vulnerability_index: string;
  timerange_statistic_case_index: string;
  nessus_arr: NessusArr[];
  thehive_server: string;
  thehive_version: string;
  thehive_apikey: string;
  es_query_eps_past_hour: string;
  es_query_eps_past_day: string;
  logs_arr: LogsArr[];
  nessus_config_mode: string;
};
