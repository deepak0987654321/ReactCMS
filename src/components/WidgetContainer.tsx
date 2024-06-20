import React, { useEffect } from "react";
import { useWidgetContext } from "./WidgetEditor";
import HeadingWidget from "./HeadingWidget";
import ParagraphWidget from "./ParagraphWidget";
import RichTextEditor from "./RichTextEditor";
import VideoWidget from "./VideoWidget";
import ImageWidget from "./ImageWidget";
import "../widgetContainer.css";

interface Widget {
  id: number;
  type: string;
  content: string;
  level?: number;
  alignment?: "left" | "center" | "right";
}

interface WidgetContainerProps {
  pageKey: string;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({ pageKey }) => {
  const { isEditMode, widgets, handleDelete, handleContentChange, setWidgets } =
    useWidgetContext();

  useEffect(() => {
    const savedWidgets = localStorage.getItem(pageKey);
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    }
  }, [pageKey, setWidgets]);

  useEffect(() => {
    if (!isEditMode) {
      localStorage.setItem(pageKey, JSON.stringify(widgets));
    }
  }, [widgets, pageKey, isEditMode]);

  const addWidget = (type: string) => {
    const newWidget = {
      id: Date.now(),
      type,
      content: "",
    };
    setWidgets((prevWidgets) => [...prevWidgets, newWidget]);
  };

  return (
    <div className="widget-container">
      {isEditMode && (
        <div>
          <button onClick={() => addWidget("Heading")}>Add Heading</button>
          <button onClick={() => addWidget("Paragraph")}>Add Paragraph</button>
          <button onClick={() => addWidget("RichText")}>Add RichText</button>
          <button onClick={() => addWidget("Video")}>Add Video</button>
          <button onClick={() => addWidget("Image")}>Add Image</button>
        </div>
      )}
      <div className="widget-list">
        {widgets.map((widget: Widget) => {
          switch (widget.type) {
            case "Heading":
              return (
                <HeadingWidget
                  key={widget.id}
                  level={widget.level || 1}
                  text={widget.content}
                  alignment={widget.alignment || "left"}
                  onChange={(newText: string) =>
                    handleContentChange(widget.id, { content: newText })
                  }
                  onChangeLevel={(newLevel: number) =>
                    handleContentChange(widget.id, { level: newLevel })
                  }
                  onChangeAlignment={(
                    newAlignment: "left" | "center" | "right"
                  ) =>
                    handleContentChange(widget.id, { alignment: newAlignment })
                  }
                  onDelete={() => handleDelete(widget.id)}
                  editable={isEditMode}
                />
              );
            case "Paragraph":
              return (
                <ParagraphWidget
                  key={widget.id}
                  text={widget.content}
                  onChange={(newText: string) =>
                    handleContentChange(widget.id, { content: newText })
                  }
                  onDelete={() => handleDelete(widget.id)}
                  editable={isEditMode}
                />
              );
            case "RichText":
              return (
                <RichTextEditor
                  key={widget.id}
                  content={widget.content}
                  onChange={(newContent: string) =>
                    handleContentChange(widget.id, { content: newContent })
                  }
                  onDelete={() => handleDelete(widget.id)}
                  editable={isEditMode}
                />
              );
            case "Video":
              return (
                <VideoWidget
                  key={widget.id}
                  url={widget.content}
                  onChange={(newUrl: string) =>
                    handleContentChange(widget.id, { content: newUrl })
                  }
                  onDelete={() => handleDelete(widget.id)}
                  editable={isEditMode}
                />
              );
            case "Image":
              return (
                <ImageWidget
                  key={widget.id}
                  src={widget.content}
                  onChange={(newSrc: string) =>
                    handleContentChange(widget.id, { content: newSrc })
                  }
                  onDelete={() => handleDelete(widget.id)}
                  editable={isEditMode}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default WidgetContainer;
