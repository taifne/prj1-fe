const RULES = {
  password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^_&+=])(?=\S+$).{8,}$/,
  username: /^[a-zA-Z0-9]{4,}$/,
  phone: /^[0-9]{10}$/,
  port: /^[0-9]$/,
  email: /^[a-z0-9_.]{5,48}@[a-z0-9]{2,}(\.[a-z0-9]{2,}){1,5}$/,
  planDateExpire: /^(\d{4})-(\d{2})-(\d{2})$/,
  noBlank: /\S+/,
  ipOrDomain: /^(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}|(?:\d{1,3}\.){3}\d{1,3})$/,
  domain: /^(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/,
  ip: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
  code: /^\S{6}$/,
  slug: /[A-Z]{1,}/,
  keyObject: /^[a-zA-Z_$][0-9a-zA-Z_$]*$/,
  displayName: /\S{5,}/,
  tenantName: /^[a-zA-Z-0-9]*$/,
};

export { RULES };
