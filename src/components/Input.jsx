import React, { useId } from "react";

const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  ...props
}, ref) {
  const id = useId();

  return (
    <div className="relative w-full">
      <input
        id={id}
        ref={ref}
        type={type}
        placeholder=" "
        className={`
          peer w-full border border-gray-300 rounded-lg bg-white px-3 py-3 text-left text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none focus:ring-0
          ${className}
        `}
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className="
            absolute left-3 px-1 bg-white text-gray-500 text-sm transition-all duration-200 -top-3 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-500 "
        >
          {label}
        </label>
      )}
    </div>
  );
});

export default Input;
