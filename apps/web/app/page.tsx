"use client";

import { Editor, useCustomEditor } from "eddies";
import { useState } from "react";
import { EditorContent } from "@tiptap/react";

export default function Page() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const editor = useCustomEditor({
    initialValue: "# Hello, world!",
    placeholder: "Placeholder",
    extensions: [],
    editorProps: {},
    showCharacterCount: true,
    limit: 0,
    onChange: (editor) =>
      console.log("You should provide an onChange handler to the editor."),
  });

  return (
    <div className="m-5">
      {/* <Editor theme={theme} className="shadow-lg" showCharacterCount={true} /> */}
      <EditorContent editor={editor} />
      <button
        className="fixed bottom-4 right-4 p-2 rounded-md bg-gray-900 text-white"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}
