import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Widget {
  id: number;
  type: string;
  content: string;
  level?: number;
  alignment?: "left" | "center" | "right";
}

interface WidgetContextProps {
  widgets: Widget[];
  setWidgets: React.Dispatch<React.SetStateAction<Widget[]>>;
  handleDelete: (id: number) => void;
  handleContentChange: (id: number, newContent: Partial<Widget>) => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
  saveData: () => void;
  exitEditMode: () => void;
}

const WidgetContext = createContext<WidgetContextProps | undefined>(undefined);

interface WidgetEditorProps {
  children: ReactNode;
  pageKey: string;
}

export const WidgetEditor: React.FC<WidgetEditorProps> = ({
  children,
  pageKey,
}) => {
  const [widgets, setWidgets] = useState<Widget[]>(() => {
    const savedWidgets = localStorage.getItem(pageKey);
    return savedWidgets ? JSON.parse(savedWidgets) : [];
  });
  const [initialWidgets, setInitialWidgets] = useState<Widget[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    const savedWidgets = localStorage.getItem(pageKey);
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    }
  }, [pageKey]);

  const handleDelete = (id: number) => {
    setWidgets((prevWidgets) =>
      prevWidgets.filter((widget) => widget.id !== id)
    );
  };

  const handleContentChange = (id: number, newContent: Partial<Widget>) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === id ? { ...widget, ...newContent } : widget
      )
    );
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      setWidgets(initialWidgets); // Revert to initial state
      setIsEditMode(false);
    } else {
      setInitialWidgets([...widgets]); // Save current state as initial for future exits without save
      setIsEditMode(true);
    }
  };

  const saveData = () => {
    localStorage.setItem(pageKey, JSON.stringify(widgets));
    setInitialWidgets([...widgets]); // Update initial state to current saved state
    setIsEditMode(false);
  };

  const exitEditMode = () => {
    setWidgets(initialWidgets); // Revert to the initial state
    setIsEditMode(false);
  };

  // Ensure that the context provides the correct state and functions
  const value = {
    widgets,
    setWidgets,
    handleDelete,
    handleContentChange,
    isEditMode,
    toggleEditMode,
    saveData,
    exitEditMode,
  };

  return (
    <WidgetContext.Provider value={value}>
      <div className="">
        <div className="flex justify-end gap-4 w-full bg-dark-100 p-5">
          <button onClick={isEditMode ? saveData : toggleEditMode}>
            {isEditMode ? "Save" : "Edit"}
          </button>
          {isEditMode && <button onClick={exitEditMode}>Exit</button>}
        </div>
        {children}
      </div>
    </WidgetContext.Provider>
  );
};

export const useWidgetContext = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error(
      "useWidgetContext must be used within a WidgetEditorProvider"
    );
  }
  return context;
};
