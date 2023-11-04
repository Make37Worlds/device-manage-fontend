import {get, post } from "../utils/server";

export const loginApi = data => get("efms/loginManage/login", data);
export const updateApi = data => post("efms/loginManage/exChange", data);