"use client";
import Image from "next/image";
import { Stars, Trash2 } from "lucide-react";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";

import "prismjs/components/prism-sql";
import "prismjs/themes/prism-dark.css";
import { useState } from "react";
import { useCompletion } from "ai/react";

export default function Home() {
  const [schema, setSchema] = useState("");

  const { completion, handleSubmit, input, handleInputChange, setInput } =
    useCompletion({
      api: "/api/generate-sql",
      body: {
        schema,
      },
    });

  const result = completion;

  const clearInputs = () => {
    setSchema("");
    setInput("");
  };

  return (
    <div className="max-w-[430px] mx-auto h-screen px-4 pt-12 pb-4">
      <header className="flex items-center justify-between">
        <Image src="/assets/logo.svg" alt="logo" width={118} height={27} />
        <button type="button">
          <Trash2
            className="h-11 w-11 text-snow p-1.5 rounded-lg hover:bg-snow/10 active:bg-snow/50"
            strokeWidth={0.8}
            onClick={clearInputs}
          />
        </button>
      </header>

      <form className="py-8 flex flex-col w-full" onSubmit={handleSubmit}>
        <label className="text-lg font-extralight">
          Paste your SQL code here
        </label>

        <div className="font-mono h-40 overflow-y-scroll my-4 bg-blueberry-600 border border-blueberry-300 rounded-md focus-within:ring-2 focus-within:ring-lime-600">
          <Editor
            textareaId="schema"
            value={schema}
            onValueChange={(test) => setSchema(test)}
            highlight={(code) => highlight(code, languages.sql, "sql")}
            padding={12}
            style={{ overflowY: "scroll" }}
            textareaClassName="outline-none"
            className="min-h-full"
          />
        </div>

        <label htmlFor="question" className="text-lg font-extralight mt-6">
          Make a question about the code
        </label>
        <textarea
          rows={3}
          className="my-4 bg-blueberry-600 border border-blueberry-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-lime-600 resize-none"
          name="question"
          id="question"
          onChange={handleInputChange}
          value={input}
        />

        <button
          type="submit"
          className="text-pistachio flex flex-row rounded-lg border border-pistachio justify-center items-center gap-2.5 h-14 hover:bg-pistachio/20 active:bg-pistachio/60"
        >
          <Stars className="w-6 h-6 fill-pistachio" />
          Ask the artificial inteligence
        </button>
      </form>

      <div className="mt-6">
        <span className="font-extralight text-lg">Result</span>
        <div className="font-mono h-60 overflow-y-scroll my-4 bg-transparent-600 border border-blueberry-300 rounded-md focus-within:ring-2 focus-within:ring-lime-600">
          <Editor
            readOnly
            value={result}
            onValueChange={() => {}}
            highlight={(code) => highlight(code, languages.sql, "sql")}
            padding={12}
            style={{ overflowY: "scroll" }}
            textareaClassName="outline-none"
            className="min-h-full"
          />
        </div>
      </div>
    </div>
  );
}
