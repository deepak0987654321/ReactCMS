// src/components/ParagraphWidget.tsx

import React from "react";

interface ParagraphWidgetProps {
  text: string;
  onChange: (newText: string) => void;
  onDelete: () => void;
  editable: boolean;
}

const ParagraphWidget: React.FC<ParagraphWidgetProps> = ({
  text,
  onChange,
  onDelete,
  editable,
}) => {
  return (
    <div className="paragraph-widget">
      <p
        contentEditable={editable}
        onBlur={(e) => onChange(e.currentTarget.textContent || "")}
      >
        {text}
      </p>
      {editable && <button onClick={onDelete}>Delete</button>}
    </div>
  );
};

export default ParagraphWidget;
