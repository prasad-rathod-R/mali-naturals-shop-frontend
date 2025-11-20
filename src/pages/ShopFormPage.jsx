// src/pages/ShopFormPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createShop, getShopById, updateShop } from "../services/shopService";
import { toast } from "react-toastify";
import { handleApiError } from "../utils/handleApiError";

const emptyShop = {
  shopDetails: {
    shopName: "",
    shopLocation: "",
    ownerName: "",
  },
  address: {
    state: "",
    city: "",
    pincode: "",
  },
  products: [
    {
      productCategory: "",
      productName: "",
      quantity: 0,
      price: 0,
      discount: 0,
    },
  ],
};

const ShopFormPage = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [shop, setShop] = useState(emptyShop);
  const [loading, setLoading] = useState(false);

  // load existing shop for edit
  useEffect(() => {
    const load = async () => {
      if (!isEdit) return;
      try {
        setLoading(true);
        const data = await getShopById(id);
        setShop({
          shopDetails: data.shopDetails || emptyShop.shopDetails,
          address: data.address || emptyShop.address,
          products:
            data.products && data.products.length > 0
              ? data.products
              : emptyShop.products,
        });
      } catch (err) {
        handleApiError(err, "Failed to save shop");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isEdit]);

  const handleShopDetailsChange = (e) => {
    const { name, value } = e.target;
    setShop((prev) => ({
      ...prev,
      shopDetails: { ...prev.shopDetails, [name]: value },
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShop((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    setShop((prev) => {
      const products = [...prev.products];
      let val = value;
      if (["quantity", "price", "discount"].includes(name)) {
        val = value === "" ? "" : Number(value);
      }
      products[index] = { ...products[index], [name]: val };
      return { ...prev, products };
    });
  };

  const addProductRow = () => {
    setShop((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          productCategory: "",
          productName: "",
          quantity: 0,
          price: 0,
          discount: 0,
        },
      ],
    }));
  };

  const removeProductRow = (index) => {
    setShop((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await updateShop(id, shop);
        toast.success("Shop updated");
      } else {
        await createShop(shop);
        toast.success("Shop created");
      }
      navigate("/dashboard");
    } catch (err) {
      handleApiError(err, "Failed to save shop");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-white">
            {isEdit ? "Edit shop" : "New shop entry"}
          </h1>
          <p className="text-sm text-slate-400">
            Maintain shop details and catalogue for Mali Naturals & Kautilya
            marts.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-950/80 border border-slate-800 rounded-3xl p-4 md:p-6"
      >
        {/* Shop details */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-white">Shop details</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Shop name
              </label>
              <input
                name="shopName"
                value={shop.shopDetails.shopName}
                onChange={handleShopDetailsChange}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900/80 text-sm"
                placeholder="Kautilya Super Mart"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Location / Area
              </label>
              <input
                name="shopLocation"
                value={shop.shopDetails.shopLocation}
                onChange={handleShopDetailsChange}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900/80 text-sm"
                placeholder="Main Road, Badami"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Owner name
              </label>
              <input
                name="ownerName"
                value={shop.shopDetails.ownerName}
                onChange={handleShopDetailsChange}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900/80 text-sm"
                placeholder="Prasad"
              />
            </div>
          </div>
        </section>

        {/* Address */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-white">Address</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-slate-300 mb-1">State</label>
              <input
                name="state"
                value={shop.address.state}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900/80 text-sm"
                placeholder="Karnataka"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">
                City / Town
              </label>
              <input
                name="city"
                value={shop.address.city}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900/80 text-sm"
                placeholder="Badami"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Pincode
              </label>
              <input
                name="pincode"
                value={shop.address.pincode}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900/80 text-sm"
                placeholder="587201"
              />
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              Product catalogue
            </h2>
            <button
              type="button"
              onClick={addProductRow}
              className="inline-flex items-center px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-100"
            >
              + Add product
            </button>
          </div>

          <div className="space-y-3">
            {shop.products.map((product, index) => (
              <div
                key={index}
                className="grid md:grid-cols-5 gap-3 items-end bg-slate-900/60 border border-slate-800 rounded-2xl p-3"
              >
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Category
                  </label>
                  <input
                    name="productCategory"
                    value={product.productCategory}
                    onChange={(e) => handleProductChange(index, e)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950/60 text-xs md:text-sm"
                    placeholder="Groceries / Snacks"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Product name
                  </label>
                  <input
                    name="productName"
                    value={product.productName}
                    onChange={(e) => handleProductChange(index, e)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950/60 text-xs md:text-sm"
                    placeholder="Rice 10kg"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Qty
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, e)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950/60 text-xs md:text-sm"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={product.price}
                    onChange={(e) => handleProductChange(index, e)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950/60 text-xs md:text-sm"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Discount %
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.01"
                      name="discount"
                      value={product.discount}
                      onChange={(e) => handleProductChange(index, e)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950/60 text-xs md:text-sm"
                      min="0"
                    />
                    {shop.products.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProductRow(index)}
                        className="px-2 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-sm text-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-2xl bg-primary-500 hover:bg-primary-600 text-sm font-medium text-slate-900 shadow-lg shadow-primary-500/30 disabled:opacity-60"
          >
            {loading ? "Saving..." : isEdit ? "Update shop" : "Create shop"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopFormPage;
