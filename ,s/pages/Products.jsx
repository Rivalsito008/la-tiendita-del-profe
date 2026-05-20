import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import ProductForm from "../components/ProductForm";
import ConfirmModal from "../components/ConfirmModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const [showProductForm, setShowProductForm] = useState(false);
  const [productSubmitting, setProductSubmitting] = useState(false);
  const [productError, setProductError] = useState("");
  const [productSuccess, setProductSuccess] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [loadingProductDetail, setLoadingProductDetail] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const filteredProducts = products.filter((product) => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return true;
    return [product.title, product.description, product.category]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Error al cargar los productos");
        const data = await res.json();
        setProducts(data.map((p) => ({ ...p, source: "api" })));
      } catch (err) {
        setError(err.message || "No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        if (!res.ok) throw new Error();
        setCategories(await res.json());
      } catch { /* silencioso */ }
    };

    fetchProducts();
    fetchCategories();
  }, [navigate]);

  const handleEditProduct = async (productId) => {
    setProductError("");
    setLoadingProductDetail(true);
    const local = products.find((p) => p.id === productId);
    if (local) {
      setEditingProduct(local);
      setShowProductForm(true);
      setLoadingProductDetail(false);
      return;
    }
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!res.ok) throw new Error("Error al cargar el producto");
      setEditingProduct({ ...(await res.json()), source: "api" });
      setShowProductForm(true);
    } catch (err) {
      setProductError(err.message);
    } finally {
      setLoadingProductDetail(false);
    }
  };

  const handleUpdateProduct = async (formData) => {
    setProductError(""); setProductSuccess(""); setProductSubmitting(true);
    const isLocal = editingProduct?.source !== "api";
    try {
      if (isLocal) {
        setProducts((prev) => prev.map((p) => p.id === editingProduct.id ? { ...p, ...formData } : p));
        setProductSuccess("Producto actualizado correctamente.");
        setShowProductForm(false); setEditingProduct(null);
        return;
      }
      const res = await fetch(`https://fakestoreapi.com/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(await res.text() || "Error actualizando producto");
      const data = await res.json();
      setProducts((prev) => prev.map((p) => p.id === editingProduct.id ? { ...data, source: "api" } : p));
      setProductSuccess("Producto actualizado correctamente.");
      setShowProductForm(false); setEditingProduct(null);
    } catch (err) {
      setProductError(err.message);
    } finally {
      setProductSubmitting(false);
    }
  };

  const handleCreateProduct = async (formData) => {
    setProductError(""); setProductSuccess(""); setProductSubmitting(true);
    try {
      const res = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(await res.text() || "Error creando producto");
      const data = await res.json();
      const newProduct = { ...data, source: "local" };
      setProducts((prev) => [newProduct, ...prev]);
      setProductSuccess("Producto creado. ID: " + (newProduct.id || "—"));
      setShowProductForm(false); setEditingProduct(null); setCurrentPage(1);
    } catch (err) {
      setProductError(err.message);
    } finally {
      setProductSubmitting(false);
    }
  };

  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;
    setProductError(""); setProductSuccess(""); setShowDeleteConfirm(false);
    try {
      const product = products.find((p) => p.id === productToDelete);
      if (product?.source !== "api") {
        setProducts((prev) => prev.filter((p) => p.id !== productToDelete));
        setProductSuccess("Producto eliminado correctamente.");
        setProductToDelete(null); return;
      }
      const res = await fetch(`https://fakestoreapi.com/products/${productToDelete}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text() || "Error eliminando producto");
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete));
      setProductSuccess("Producto eliminado correctamente.");
    } catch (err) {
      setProductError(err.message);
    } finally {
      setProductToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <Nav />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-extrabold text-neutral-800">Productos</h1>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-md px-5 py-3 shadow-md text-center">
              <p className="text-xs text-neutral-500 font-bold uppercase tracking-wide">Total</p>
              <p className="text-2xl font-extrabold !text-black">{filteredProducts.length}</p>
            </div>
            <button
              type="button"
              onClick={() => { setEditingProduct(null); setShowProductForm((s) => !s); }}
              className="px-6 py-2.5 rounded-md bg-purple-700 text-white font-bold hover:bg-purple-800 transition-colors"
            >
              + Nuevo producto
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 max-w-xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            placeholder="Buscar por título, descripción o categoría"
            className="w-full px-4 py-3 rounded-md bg-neutral-200 text-neutral-800 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Alerts */}
        {productError && (
          <div className="mb-4 rounded-md bg-red-100 border-l-4 border-red-600 px-4 py-3 text-red-700 font-bold">
            {productError}
          </div>
        )}
        {productSuccess && (
          <div className="mb-4 rounded-md bg-green-100 border-l-4 border-green-600 px-4 py-3 text-green-700 font-bold">
            {productSuccess}
          </div>
        )}

        {/* Modal Form */}
        {showProductForm && (
          <ProductForm
            initialData={editingProduct || {}}
            categories={categories}
            onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
            submitting={productSubmitting || loadingProductDetail}
            onClose={() => { setShowProductForm(false); setEditingProduct(null); }}
          />
        )}

        <ConfirmModal
          title="Confirmar eliminación"
          message="¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer."
          isOpen={showDeleteConfirm}
          isDangerous={true}
          onConfirm={confirmDeleteProduct}
          onCancel={() => { setShowDeleteConfirm(false); setProductToDelete(null); }}
        />

        {/* Table */}
        <div className="overflow-hidden rounded-md bg-white shadow-2xl">
          <div className="bg-purple-700 px-6 py-4">
            <h2 className="text-lg font-extrabold text-white">Catálogo</h2>
          </div>

          <div className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-20 text-neutral-500 font-bold">
                Cargando productos...
              </div>
            ) : error ? (
              <div className="rounded-md bg-red-50 px-4 py-6 text-red-700 font-bold">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200 text-left">
                  <thead className="bg-neutral-100">
                    <tr>
                      {["Título", "Precio", "Descripción", "Categoría", "Acciones"].map((h) => (
                        <th key={h} className="px-6 py-3 text-xs font-extrabold uppercase tracking-wide text-neutral-600">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 bg-white">
                    {currentProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-6 py-4 align-top text-sm text-neutral-800 max-w-xs">{product.title}</td>
                        <td className="px-6 py-4 align-top text-sm font-extrabold !text-black">${product.price.toFixed(2)}</td>
                        <td className="px-6 py-4 align-top text-sm text-neutral-600 max-w-sm">{product.description}</td>
                        <td className="px-6 py-4 align-top text-sm">
                          <span className="inline-flex rounded-md bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 align-top text-sm">
                          <div className="flex flex-col gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditProduct(product.id)}
                              disabled={loadingProductDetail}
                              className="px-3 py-1.5 rounded-md bg-purple-700 text-white text-xs font-bold hover:bg-purple-800 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="px-3 py-1.5 rounded-md bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-6 flex flex-col gap-3 bg-neutral-100 rounded-md px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-bold text-neutral-600">
                    Página {currentPage} de {totalPages}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-md border-2 border-neutral-300 text-sm font-bold text-neutral-700 hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${
                            currentPage === page
                              ? "bg-purple-700 text-white"
                              : "border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-200"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-md border-2 border-neutral-300 text-sm font-bold text-neutral-700 hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;