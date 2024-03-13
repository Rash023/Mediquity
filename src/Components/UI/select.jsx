import React, { useState } from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

function Select({ className, children, onChange, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  const radius = 100; // change this to increase the radius of the hover effect
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    setIsOpen(false);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <motion.div
          style={{
            background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className={`p-[2px]  transition duration-300 group/input relative w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-neutral-700 text-left rounded-md shadow-sm px-4 py-[15px] text-sm focus:outline-none focus:ring-2  ${className}`}
          type="button"
          onClick={handleToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {children.find((child) => child.props.value === props.value)?.props
            .children || "Select an option"}
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-600 dark:text-neutral-400 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, zIndex: 9999 }} // Set higher z-index here
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  onClick: () => handleOptionClick(child.props.value),
                });
              }
              return child;
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

Select.displayName = "Select";

export { Select };

function Option({ children, ...props }) {
  return (
    <motion.option
      {...props}
      style={{ color: "white" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.option>
  );
}

Option.displayName = "Option";

export { Option };
