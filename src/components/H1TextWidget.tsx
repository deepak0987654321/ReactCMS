// src/components/H1TextWidget.tsx

import React from "react";

interface H1TextWidgetProps {
  text: string;
  onChange: (newText: string) => void;
  onDelete: () => void;
}

const H1TextWidget: React.FC<H1TextWidgetProps> = ({
  text,
  onChange,
  onDelete,
}) => {
  return (
    <div className="h1-text-widget">
      <h1
        contentEditable
        onBlur={(e) => onChange(e.target.innerText)}
        suppressContentEditableWarning={true}
      >
        {text}
      </h1>
      <div>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default H1TextWidget;
