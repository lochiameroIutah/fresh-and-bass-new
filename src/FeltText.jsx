import React, { useEffect, useRef } from 'react';

const FeltText = ({ children, className = '' }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const text = textRef.current.textContent;
      const chars = text.split('').map((char, index) => {
        if (char === ' ') {
          return ' ';
        }
        return `<span class="felt-char" style="--random: ${Math.random()}">${char}</span>`;
      }).join('');
      
      textRef.current.innerHTML = chars;
    }
  }, [children]);

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );
};

export default FeltText;