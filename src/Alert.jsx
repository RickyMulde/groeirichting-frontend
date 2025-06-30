function Alert({ type = 'success', message, onClose }) {
    if (!message) return null
  
    return (
      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-sm px-4 py-3 rounded-xl shadow-md text-white ${
          type === 'error' ? 'bg-red-600' : 'bg-green-600'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm">{message}</span>
          <button onClick={onClose} className="text-white font-bold">×</button>
        </div>
      </div>
    )
  }
  
  export default Alert
  