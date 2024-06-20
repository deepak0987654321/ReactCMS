import React, { useState, useEffect } from "react";

interface PageEditorProps {
  initialContent?: string;
}

const PageEditor: React.FC<PageEditorProps> = ({ initialContent = "" }) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    // Load content from localStorage on component mount
    const savedContent = localStorage.getItem("pageContent");
    if (savedContent) {
      setContent(savedContent);
    } else {
      setContent(initialContent);
    }
  }, [initialContent]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setContent(newContent);
    localStorage.setItem("pageContent", newContent);
  };

  return (
    <div>
      <textarea value={content} onChange={handleChange} />
    </div>
  );
};

export default PageEditor;
