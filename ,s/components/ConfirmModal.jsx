const ConfirmModal = ({ title, message, isOpen, isDangerous = false, onConfirm, onCancel }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div className="w-full max-w-md rounded-md bg-white shadow-2xl overflow-hidden">
          <div className={`px-6 py-4 ${isDangerous ? "bg-red-600" : "bg-purple-700"} text-white`}>
            <h3 className="text-lg font-extrabold">{title}</h3>
          </div>
          <div className="px-6 py-5">
            <p className="text-neutral-700">{message}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2.5 rounded-md border-2 border-neutral-300 font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className={`px-5 py-2.5 rounded-md font-bold text-white transition-colors ${
                  isDangerous ? "bg-red-600 hover:bg-red-700" : "bg-purple-700 hover:bg-purple-800"
                }`}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmModal;