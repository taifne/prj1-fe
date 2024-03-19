import { TenantDetail, TenantType } from "@/utils/types/tenant";
import { TenantUser } from "@/utils/types/user";
import { createSlice } from "@reduxjs/toolkit";

const tenantSlice = createSlice({
  name: "tenant",
  initialState: {
    listTenant: [] as TenantUser[],
    listTenantAll: [] as TenantType[],
    rsaPublicKey: "",
    tenantDetail: {} as TenantDetail,
  },
  reducers: {
    getListTenant: (state, action) => {
      state.listTenant = action.payload;
    },
    getRsaPublickey: (state, action) => {
      state.rsaPublicKey = action.payload;
    },
    getListTenantAll: (state, action) => {
      state.listTenantAll = action.payload;
    },
    getTenantDetail: (state, action) => {
      state.tenantDetail = action.payload;
    },
    updateTenantById: (state, action) => {
      const { id, updatedTenant } = action.payload;

      // Update in listTenantAll
      const tenantAllIndex = state.listTenantAll.findIndex(
        (tenant) => tenant.tenant_id === id
      );
      if (tenantAllIndex !== -1) {
        state.listTenantAll[tenantAllIndex] = {
          ...state.listTenantAll[tenantAllIndex],
          ...updatedTenant,
        };
      }
    },
  },
});

export const {
  getListTenant,
  getRsaPublickey,
  getListTenantAll,
  getTenantDetail,
  updateTenantById,
} = tenantSlice.actions;

export default tenantSlice.reducer;
