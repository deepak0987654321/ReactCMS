// src/components/RichTextEditor.tsx

import React from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (newContent: string) => void;
  onDelete: () => void;
  editable: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  onDelete,
  editable,
}) => {
  return (
    <div className="rich-text-editor">
      <div
        contentEditable={editable}
        onBlur={(e) => onChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      {editable && <button onClick={onDelete}>Delete</button>}
    </div>
  );
};

export default RichTextEditor;
