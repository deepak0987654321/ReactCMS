// src/components/VideoWidget.tsx

import React from "react";

interface VideoWidgetProps {
  url: string;
  onChange: (newUrl: string) => void;
  onDelete: () => void;
  editable: boolean;
}

const VideoWidget: React.FC<VideoWidgetProps> = ({
  url,
  onChange,
  onDelete,
  editable,
}) => {
  return (
    <div className="video-widget">
      {editable && (
        <input
          type="text"
          value={url}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      <iframe src={url} title="Video" />
      {editable && <button onClick={onDelete}>Delete</button>}
    </div>
  );
};

export default VideoWidget;
