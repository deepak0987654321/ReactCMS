// src/components/HeadingWidget.tsx

import React from "react";

interface HeadingWidgetProps {
  level: number;
  text: string;
  alignment: "left" | "center" | "right";
  onChange: (newText: string) => void;
  onChangeLevel: (newLevel: number) => void;
  onChangeAlignment: (newAlignment: "left" | "center" | "right") => void;
  onDelete: () => void;
  editable: boolean;
}

const HeadingWidget: React.FC<HeadingWidgetProps> = ({
  level,
  text,
  alignment,
  onChange,
  onChangeLevel,
  onChangeAlignment,
  onDelete,
  editable,
}) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeLevel(parseInt(e.target.value));
  };

  const handleAlignmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeAlignment(e.target.value as "left" | "center" | "right");
  };

  return (
    <div className="heading-widget">
      {editable && (
        <div>
          <select value={level} onChange={handleLevelChange}>
            <option value={1}>Heading 1</option>
            <option value={2}>Heading 2</option>
            <option value={3}>Heading 3</option>
            <option value={4}>Heading 4</option>
            <option value={5}>Heading 5</option>
            <option value={6}>Heading 6</option>
          </select>
          <select value={alignment} onChange={handleAlignmentChange}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      )}
      <HeadingTag
        contentEditable={editable}
        onBlur={(e) => onChange(e.currentTarget.textContent || "")}
        style={{ textAlign: alignment }}
      >
        {text}
      </HeadingTag>
      {editable && <button onClick={onDelete}>Delete</button>}
    </div>
  );
};

export default HeadingWidget;
