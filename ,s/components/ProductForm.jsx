import { useState, useEffect, useRef } from "react";

const ProductForm = ({ initialData = {}, onSubmit, submitting = false, onClose, categories = [] }) => {
  const [form, setForm] = useState(() => ({
    title: "",
    price: "",
    description: "",
    category: "",
    ...initialData,
  }));
  const isEditing = !!initialData?.id;
  const overlayRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({ ...form, price: Number(form.price) });
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose && onClose();
  };

  return (
    <div
      ref={overlayRef}
      onMouseDown={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full max-w-2xl rounded-md bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-purple-700 text-white px-6 py-4 rounded-t-md flex items-center justify-between">
          <h3 className="text-lg font-extrabold">
            {isEditing ? "Editar producto" : "Nuevo producto"}
          </h3>
          <button
            type="button"
            onClick={() => onClose && onClose()}
            className="text-white/80 hover:text-white font-bold text-xl leading-none"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <div className="sm:col-span-2">
            <label className="block text-sm font-bold text-neutral-700 mb-1">Título</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Nombre del producto"
              className="w-full px-4 py-3 rounded-md bg-neutral-200 text-neutral-800 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-neutral-700 mb-1">Precio</label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full px-4 py-3 rounded-md bg-neutral-200 text-neutral-800 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-neutral-700 mb-1">Categoría</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-neutral-200 text-neutral-800 outline-none focus:ring-2 focus:ring-purple-600"
              required
            >
              <option value="" disabled>
                {categories.length ? "Selecciona una categoría" : "Cargando..."}
              </option>
              {form.category && !categories.includes(form.category) && (
                <option value={form.category}>{form.category}</option>
              )}
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-bold text-neutral-700 mb-1">Descripción</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descripción corta del producto"
              className="w-full px-4 py-3 rounded-md bg-neutral-200 text-neutral-800 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-purple-600"
              rows={3}
            />
          </div>

          <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => onClose && onClose()}
              className="px-5 py-2.5 rounded-md border-2 border-neutral-300 font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-md bg-purple-700 text-white font-bold hover:bg-purple-800 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed"
            >
              {submitting ? "Guardando..." : isEditing ? "Actualizar producto" : "Guardar producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;