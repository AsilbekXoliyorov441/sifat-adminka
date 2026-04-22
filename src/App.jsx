import React, { useEffect, useMemo, useState } from "react";

export default function App() {
  // ==============================
  // SUPABASE CONFIG
  // ==============================
  const SUPABASE_URL = "https://nxeslykjvylasmrvmyvn.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54ZXNseWtqdnlsYXNtcnZteXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NzY1MTUsImV4cCI6MjA5MjQ1MjUxNX0.eIecuWAJmOsFwdzVCiNHf-0VKkibl0QyCaVHMBkp7tA";

  // ==============================
  // COMMON HEADERS
  // ==============================
  const headers = useMemo(
    () => ({
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    [],
  );

  // ==============================
  // UI STATE
  // ==============================
  const [activeTab, setActiveTab] = useState("brands");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==============================
  // DATA STATES
  // ==============================
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // ==============================
  // EDITING STATES
  // ==============================
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);

  // ==============================
  // FORM STATES
  // ==============================
  const [brandForm, setBrandForm] = useState({
    name: "",
    slug: "",
    image_url: "",
    description: "",
    is_active: true,
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    image_url: "",
    description: "",
    is_active: true,
  });

  const [productForm, setProductForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    old_price: "",
    stock: "",
    image_url: "",
    brand_id: "",
    category_id: "",
    is_active: true,
    is_featured: false,
  });

  // ==============================
  // HELPERS
  // ==============================
  const resetAlerts = () => {
    setMessage("");
    setError("");
  };

  const toSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-_.а-яўқғҳөё\s]/gi, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const showSuccess = (text) => {
    setMessage(text);
    setError("");
  };

  const showError = (text) => {
    setError(text);
    setMessage("");
  };

  const getBrandName = (brandId) => {
    const found = brands.find((b) => b.id === brandId);
    return found ? found.name : "Topilmadi";
  };

  const getCategoryName = (categoryId) => {
    const found = categories.find((c) => c.id === categoryId);
    return found ? found.name : "Topilmadi";
  };

  // ==============================
  // FETCH FUNCTIONS
  // ==============================
  const fetchBrands = async () => {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/brands?select=*&order=created_at.desc`,
        {
          method: "GET",
          headers,
        },
      );

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Brandlarni olishda xatolik");
      }

      const data = await res.json();
      setBrands(data || []);
    } catch (err) {
      showError(`Brands fetch error: ${err.message}`);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/categories?select=*&order=created_at.desc`,
        {
          method: "GET",
          headers,
        },
      );

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Categorylarni olishda xatolik");
      }

      const data = await res.json();
      setCategories(data || []);
    } catch (err) {
      showError(`Categories fetch error: ${err.message}`);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/products?select=*&order=created_at.desc`,
        {
          method: "GET",
          headers,
        },
      );

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Productlarni olishda xatolik");
      }

      const data = await res.json();
      setProducts(data || []);
    } catch (err) {
      showError(`Products fetch error: ${err.message}`);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    resetAlerts();
    try {
      await Promise.all([fetchBrands(), fetchCategories(), fetchProducts()]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // ==============================
  // BRAND CRUD
  // ==============================
  const handleBrandChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBrandForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBrandNameAutoSlug = (e) => {
    const value = e.target.value;
    setBrandForm((prev) => ({
      ...prev,
      name: value,
      slug: editingBrandId ? prev.slug : toSlug(value),
    }));
  };

  const resetBrandForm = () => {
    setBrandForm({
      name: "",
      slug: "",
      image_url: "",
      description: "",
      is_active: true,
    });
    setEditingBrandId(null);
  };

  const submitBrand = async (e) => {
    e.preventDefault();
    resetAlerts();

    if (!brandForm.name || !brandForm.slug) {
      showError("Brand name va slug majburiy");
      return;
    }

    try {
      const url = editingBrandId
        ? `${SUPABASE_URL}/rest/v1/brands?id=eq.${editingBrandId}`
        : `${SUPABASE_URL}/rest/v1/brands`;

      const method = editingBrandId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({
          name: brandForm.name,
          slug: brandForm.slug,
          image_url: brandForm.image_url || null,
          description: brandForm.description || null,
          is_active: brandForm.is_active,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Brand saqlashda xatolik");
      }

      await fetchBrands();
      resetBrandForm();
      showSuccess(
        editingBrandId ? "Brand yangilandi" : "Brand muvaffaqiyatli qo‘shildi",
      );
    } catch (err) {
      showError(`Brand save error: ${err.message}`);
    }
  };

  const editBrand = (item) => {
    setEditingBrandId(item.id);
    setBrandForm({
      name: item.name || "",
      slug: item.slug || "",
      image_url: item.image_url || "",
      description: item.description || "",
      is_active: !!item.is_active,
    });
    setActiveTab("brands");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteBrand = async (id) => {
    const confirmDelete = window.confirm(
      "Shu brandni o‘chirmoqchimisiz? Agar product bog‘langan bo‘lsa o‘chmasligi mumkin.",
    );
    if (!confirmDelete) return;

    resetAlerts();

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/brands?id=eq.${id}`, {
        method: "DELETE",
        headers,
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Brand o‘chirishda xatolik");
      }

      await fetchBrands();
      showSuccess("Brand o‘chirildi");
    } catch (err) {
      showError(`Brand delete error: ${err.message}`);
    }
  };

  // ==============================
  // CATEGORY CRUD
  // ==============================
  const handleCategoryChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCategoryForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryNameAutoSlug = (e) => {
    const value = e.target.value;
    setCategoryForm((prev) => ({
      ...prev,
      name: value,
      slug: editingCategoryId ? prev.slug : toSlug(value),
    }));
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: "",
      slug: "",
      image_url: "",
      description: "",
      is_active: true,
    });
    setEditingCategoryId(null);
  };

  const submitCategory = async (e) => {
    e.preventDefault();
    resetAlerts();

    if (!categoryForm.name || !categoryForm.slug) {
      showError("Category name va slug majburiy");
      return;
    }

    try {
      const url = editingCategoryId
        ? `${SUPABASE_URL}/rest/v1/categories?id=eq.${editingCategoryId}`
        : `${SUPABASE_URL}/rest/v1/categories`;

      const method = editingCategoryId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({
          name: categoryForm.name,
          slug: categoryForm.slug,
          image_url: categoryForm.image_url || null,
          description: categoryForm.description || null,
          is_active: categoryForm.is_active,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Category saqlashda xatolik");
      }

      await fetchCategories();
      resetCategoryForm();
      showSuccess(
        editingCategoryId
          ? "Category yangilandi"
          : "Category muvaffaqiyatli qo‘shildi",
      );
    } catch (err) {
      showError(`Category save error: ${err.message}`);
    }
  };

  const editCategory = (item) => {
    setEditingCategoryId(item.id);
    setCategoryForm({
      name: item.name || "",
      slug: item.slug || "",
      image_url: item.image_url || "",
      description: item.description || "",
      is_active: !!item.is_active,
    });
    setActiveTab("categories");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Shu categoryni o‘chirmoqchimisiz? Agar product bog‘langan bo‘lsa o‘chmasligi mumkin.",
    );
    if (!confirmDelete) return;

    resetAlerts();

    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/categories?id=eq.${id}`,
        {
          method: "DELETE",
          headers,
        },
      );

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Category o‘chirishda xatolik");
      }

      await fetchCategories();
      showSuccess("Category o‘chirildi");
    } catch (err) {
      showError(`Category delete error: ${err.message}`);
    }
  };

  // ==============================
  // PRODUCT CRUD
  // ==============================
  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProductNameAutoSlug = (e) => {
    const value = e.target.value;
    setProductForm((prev) => ({
      ...prev,
      name: value,
      slug: editingProductId ? prev.slug : toSlug(value),
    }));
  };

  const resetProductForm = () => {
    setProductForm({
      name: "",
      slug: "",
      description: "",
      price: "",
      old_price: "",
      stock: "",
      image_url: "",
      brand_id: "",
      category_id: "",
      is_active: true,
      is_featured: false,
    });
    setEditingProductId(null);
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    resetAlerts();

    if (
      !productForm.name ||
      !productForm.slug ||
      !productForm.price ||
      !productForm.stock ||
      !productForm.brand_id ||
      !productForm.category_id
    ) {
      showError("Product name, slug, price, stock, brand va category majburiy");
      return;
    }

    try {
      const url = editingProductId
        ? `${SUPABASE_URL}/rest/v1/products?id=eq.${editingProductId}`
        : `${SUPABASE_URL}/rest/v1/products`;

      const method = editingProductId ? "PATCH" : "POST";

      const payload = {
        name: productForm.name,
        slug: productForm.slug,
        description: productForm.description || null,
        price: Number(productForm.price),
        old_price:
          productForm.old_price === "" ? null : Number(productForm.old_price),
        stock: Number(productForm.stock),
        image_url: productForm.image_url || null,
        brand_id: productForm.brand_id,
        category_id: productForm.category_id,
        is_active: productForm.is_active,
        is_featured: productForm.is_featured,
      };

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Product saqlashda xatolik");
      }

      await fetchProducts();
      resetProductForm();
      showSuccess(
        editingProductId
          ? "Product yangilandi"
          : "Product muvaffaqiyatli qo‘shildi",
      );
    } catch (err) {
      showError(`Product save error: ${err.message}`);
    }
  };

  const editProduct = (item) => {
    setEditingProductId(item.id);
    setProductForm({
      name: item.name || "",
      slug: item.slug || "",
      description: item.description || "",
      price: item.price ?? "",
      old_price: item.old_price ?? "",
      stock: item.stock ?? "",
      image_url: item.image_url || "",
      brand_id: item.brand_id || "",
      category_id: item.category_id || "",
      is_active: !!item.is_active,
      is_featured: !!item.is_featured,
    });
    setActiveTab("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Shu productni o‘chirmoqchimisiz?");
    if (!confirmDelete) return;

    resetAlerts();

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
        method: "DELETE",
        headers,
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Product o‘chirishda xatolik");
      }

      await fetchProducts();
      showSuccess("Product o‘chirildi");
    } catch (err) {
      showError(`Product delete error: ${err.message}`);
    }
  };

  // ==============================
  // RENDER
  // ==============================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* HEADER */}
        <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Ecommerce Admin Panel
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                React + Tailwind + Supabase REST API + fetch
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={fetchAllData}
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {loading ? "Yangilanmoqda..." : "Refresh"}
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Brands</p>
              <h3 className="mt-2 text-2xl font-bold">{brands.length}</h3>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Categories</p>
              <h3 className="mt-2 text-2xl font-bold">{categories.length}</h3>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Products</p>
              <h3 className="mt-2 text-2xl font-bold">{products.length}</h3>
            </div>
          </div>

          {(message || error) && (
            <div className="mt-6">
              {message && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {message}
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        {/* TABS */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab("brands")}
            className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "brands"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-700 shadow-sm"
            }`}
          >
            Brands
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "categories"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-700 shadow-sm"
            }`}
          >
            Categories
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "products"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-700 shadow-sm"
            }`}
          >
            Products
          </button>
        </div>

        {/* BRANDS */}
        {activeTab === "brands" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {editingBrandId ? "Brand Edit" : "Yangi Brand"}
                  </h2>
                  {editingBrandId && (
                    <button
                      onClick={resetBrandForm}
                      className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <form onSubmit={submitBrand} className="space-y-4">
                  <Input
                    label="Brand name"
                    name="name"
                    value={brandForm.name}
                    onChange={handleBrandNameAutoSlug}
                    placeholder="Apple"
                  />

                  <Input
                    label="Slug"
                    name="slug"
                    value={brandForm.slug}
                    onChange={handleBrandChange}
                    placeholder="apple"
                  />

                  <Input
                    label="Image URL"
                    name="image_url"
                    value={brandForm.image_url}
                    onChange={handleBrandChange}
                    placeholder="https://..."
                  />

                  <Textarea
                    label="Description"
                    name="description"
                    value={brandForm.description}
                    onChange={handleBrandChange}
                    placeholder="Brand haqida qisqacha..."
                  />

                  <Checkbox
                    label="Active"
                    name="is_active"
                    checked={brandForm.is_active}
                    onChange={handleBrandChange}
                  />

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white hover:opacity-90"
                  >
                    {editingBrandId ? "Brand Update" : "Brand Add"}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-xl font-bold">Brandlar ro‘yxati</h2>

                <div className="space-y-4">
                  {brands.length === 0 ? (
                    <EmptyState text="Hozircha brand yo‘q" />
                  ) : (
                    brands.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-slate-200 p-4"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-bold">{item.name}</h3>
                              <Badge
                                text={item.is_active ? "Active" : "Inactive"}
                                active={item.is_active}
                              />
                            </div>

                            <p className="mt-2 text-sm text-slate-500">
                              Slug: {item.slug}
                            </p>

                            {item.description && (
                              <p className="mt-2 text-sm text-slate-600">
                                {item.description}
                              </p>
                            )}

                            {item.image_url && (
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="mt-4 h-24 w-24 rounded-2xl object-cover"
                              />
                            )}
                          </div>

                          <div className="flex gap-2">
                            <ActionButton
                              text="Edit"
                              onClick={() => editBrand(item)}
                              variant="edit"
                            />
                            <ActionButton
                              text="Delete"
                              onClick={() => deleteBrand(item.id)}
                              variant="delete"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CATEGORIES */}
        {activeTab === "categories" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {editingCategoryId ? "Category Edit" : "Yangi Category"}
                  </h2>
                  {editingCategoryId && (
                    <button
                      onClick={resetCategoryForm}
                      className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <form onSubmit={submitCategory} className="space-y-4">
                  <Input
                    label="Category name"
                    name="name"
                    value={categoryForm.name}
                    onChange={handleCategoryNameAutoSlug}
                    placeholder="Smartfonlar"
                  />

                  <Input
                    label="Slug"
                    name="slug"
                    value={categoryForm.slug}
                    onChange={handleCategoryChange}
                    placeholder="smartfonlar"
                  />

                  <Input
                    label="Image URL"
                    name="image_url"
                    value={categoryForm.image_url}
                    onChange={handleCategoryChange}
                    placeholder="https://..."
                  />

                  <Textarea
                    label="Description"
                    name="description"
                    value={categoryForm.description}
                    onChange={handleCategoryChange}
                    placeholder="Category haqida qisqacha..."
                  />

                  <Checkbox
                    label="Active"
                    name="is_active"
                    checked={categoryForm.is_active}
                    onChange={handleCategoryChange}
                  />

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white hover:opacity-90"
                  >
                    {editingCategoryId ? "Category Update" : "Category Add"}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-xl font-bold">Categorylar ro‘yxati</h2>

                <div className="space-y-4">
                  {categories.length === 0 ? (
                    <EmptyState text="Hozircha category yo‘q" />
                  ) : (
                    categories.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-slate-200 p-4"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-bold">{item.name}</h3>
                              <Badge
                                text={item.is_active ? "Active" : "Inactive"}
                                active={item.is_active}
                              />
                            </div>

                            <p className="mt-2 text-sm text-slate-500">
                              Slug: {item.slug}
                            </p>

                            {item.description && (
                              <p className="mt-2 text-sm text-slate-600">
                                {item.description}
                              </p>
                            )}

                            {item.image_url && (
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="mt-4 h-24 w-24 rounded-2xl object-cover"
                              />
                            )}
                          </div>

                          <div className="flex gap-2">
                            <ActionButton
                              text="Edit"
                              onClick={() => editCategory(item)}
                              variant="edit"
                            />
                            <ActionButton
                              text="Delete"
                              onClick={() => deleteCategory(item.id)}
                              variant="delete"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {activeTab === "products" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {editingProductId ? "Product Edit" : "Yangi Product"}
                  </h2>
                  {editingProductId && (
                    <button
                      onClick={resetProductForm}
                      className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <form onSubmit={submitProduct} className="space-y-4">
                  <Input
                    label="Product name"
                    name="name"
                    value={productForm.name}
                    onChange={handleProductNameAutoSlug}
                    placeholder="iPhone 15 Pro"
                  />

                  <Input
                    label="Slug"
                    name="slug"
                    value={productForm.slug}
                    onChange={handleProductChange}
                    placeholder="iphone-15-pro"
                  />

                  <Textarea
                    label="Description"
                    name="description"
                    value={productForm.description}
                    onChange={handleProductChange}
                    placeholder="Mahsulot haqida..."
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input
                      label="Price"
                      name="price"
                      type="number"
                      value={productForm.price}
                      onChange={handleProductChange}
                      placeholder="14500000"
                    />

                    <Input
                      label="Old price"
                      name="old_price"
                      type="number"
                      value={productForm.old_price}
                      onChange={handleProductChange}
                      placeholder="15200000"
                    />
                  </div>

                  <Input
                    label="Stock"
                    name="stock"
                    type="number"
                    value={productForm.stock}
                    onChange={handleProductChange}
                    placeholder="12"
                  />

                  <Input
                    label="Image URL"
                    name="image_url"
                    value={productForm.image_url}
                    onChange={handleProductChange}
                    placeholder="https://..."
                  />

                  <Select
                    label="Brand"
                    name="brand_id"
                    value={productForm.brand_id}
                    onChange={handleProductChange}
                    options={brands.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    placeholder="Brand tanlang"
                  />

                  <Select
                    label="Category"
                    name="category_id"
                    value={productForm.category_id}
                    onChange={handleProductChange}
                    options={categories.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    placeholder="Category tanlang"
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Checkbox
                      label="Active"
                      name="is_active"
                      checked={productForm.is_active}
                      onChange={handleProductChange}
                    />

                    <Checkbox
                      label="Featured"
                      name="is_featured"
                      checked={productForm.is_featured}
                      onChange={handleProductChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white hover:opacity-90"
                  >
                    {editingProductId ? "Product Update" : "Product Add"}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-xl font-bold">Productlar ro‘yxati</h2>

                <div className="space-y-4">
                  {products.length === 0 ? (
                    <EmptyState text="Hozircha product yo‘q" />
                  ) : (
                    products.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-slate-200 p-4"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-bold">{item.name}</h3>

                              <Badge
                                text={item.is_active ? "Active" : "Inactive"}
                                active={item.is_active}
                              />

                              {item.is_featured && (
                                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                  Featured
                                </span>
                              )}
                            </div>

                            <p className="mt-2 text-sm text-slate-500">
                              Slug: {item.slug}
                            </p>

                            <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-600 md:grid-cols-2">
                              <p>
                                <span className="font-semibold">Brand:</span>{" "}
                                {getBrandName(item.brand_id)}
                              </p>
                              <p>
                                <span className="font-semibold">Category:</span>{" "}
                                {getCategoryName(item.category_id)}
                              </p>
                              <p>
                                <span className="font-semibold">Price:</span>{" "}
                                {item.price}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Old price:
                                </span>{" "}
                                {item.old_price ?? "-"}
                              </p>
                              <p>
                                <span className="font-semibold">Stock:</span>{" "}
                                {item.stock}
                              </p>
                            </div>

                            {item.description && (
                              <p className="mt-3 text-sm text-slate-600">
                                {item.description}
                              </p>
                            )}

                            {item.image_url && (
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="mt-4 h-28 w-28 rounded-2xl object-cover"
                              />
                            )}
                          </div>

                          <div className="flex gap-2">
                            <ActionButton
                              text="Edit"
                              onClick={() => editProduct(item)}
                              variant="edit"
                            />
                            <ActionButton
                              text="Delete"
                              onClick={() => deleteProduct(item.id)}
                              variant="delete"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==============================
// REUSABLE UI
// ==============================
function Input({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400"
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange, placeholder = "" }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="4"
        className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400"
      />
    </div>
  );
}

function Checkbox({ label, name, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4"
      />
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </label>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Tanlang",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400"
      >
        <option value="">{placeholder}</option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Badge({ text, active }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-200 text-slate-700"
      }`}
    >
      {text}
    </span>
  );
}

function ActionButton({ text, onClick, variant = "edit" }) {
  const classes =
    variant === "delete"
      ? "bg-red-50 text-red-600 hover:bg-red-100"
      : "bg-slate-100 text-slate-700 hover:bg-slate-200";

  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${classes}`}
    >
      {text}
    </button>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
      {text}
    </div>
  );
}
