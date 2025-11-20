// src/services/shopService.js
import api from "./api";

// LIST ALL
export const getAllShops = async () => {
  const res = await api.get("/shop-forms/viewAll");
  return res.data;
};

// VIEW BY ID
export const getShopById = async (id) => {
  const res = await api.get(`/shop-forms/${id}`);
  return res.data;
};

// CREATE (backend expects plain ShopForm — no wrapper)
export const createShop = async (shopForm) => {
  const res = await api.post("/shop-forms/create", shopForm);
  return res.data;
};

// UPDATE
export const updateShop = async (id, shopForm) => {
  const res = await api.put(`/shop-forms/${id}`, shopForm);
  return res.data;
};
