// src/components/ImageWidget.tsx

import React from "react";

interface ImageWidgetProps {
  src: string;
  onChange: (newSrc: string) => void;
  onDelete: () => void;
  editable: boolean;
}

const ImageWidget: React.FC<ImageWidgetProps> = ({
  src,
  onChange,
  onDelete,
  editable,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="image-widget">
      {editable && (
        <input type="file" accept="image/*" onChange={handleFileChange} />
      )}
      {src && <img src={src} alt="Widget" />}
      {editable && <button onClick={onDelete}>Deletee</button>}
    </div>
  );
};

export default ImageWidget;
