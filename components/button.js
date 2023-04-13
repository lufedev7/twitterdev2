
export default function button ({ children, onClick, disabled }) {
  return (
    <div>
        <button
                disabled={disabled}
                onClick={onClick}
                className="bg-black text-[11px] flex disabled:opacity-50 items-center border-white text-white relative rounded-xl hover:border hover:font-bold hover:bg-gray-900  px-3 py-1"
              >{ children }
              </button>
    </div>
  )
}
