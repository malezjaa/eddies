"use client";

import { Editor } from "eddies";
import { useState } from "react";
export default function Page() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="m-5">
      <Editor
        theme={theme}
        className="shadow-lg"
        showCharacterCount={true}
        placeholder="pisz"
        onChange={(editor) => {
          console.log(editor.getMarkdown());
        }}
      />

      <button
        className="fixed bottom-4 right-4 p-2 rounded-md bg-gray-900 text-white"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}
