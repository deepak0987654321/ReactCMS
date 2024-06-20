declare module "react-page-editor" {
  import { EditorState } from "draft-js";

  interface EditorProps {
    editorState: EditorState;
    onChange: (editorState: EditorState) => void;
    placeholder?: string;
  }

  export class Editor extends React.Component<EditorProps> {}
  export { EditorState };
}
