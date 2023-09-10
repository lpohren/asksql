"use client";
import Image from "next/image";
import { Stars, Trash2 } from "lucide-react";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";

import "prismjs/components/prism-sql";
import "prismjs/themes/prism-dark.css";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState(`create table if not exists users (
    id uuid primary key not null default gen_random_uuid(),
    "name" text not null,
    handle text not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
  );`);

  return (
    <div className="max-w-[430px] mx-auto h-screen px-4 pt-12 pb-4">
      <header className="flex items-center justify-between">
        <Image src="/assets/logo.svg" alt="logo" width={118} height={27} />
        <button type="button">
          <Trash2 className="h-8 w-8 text-snow" strokeWidth={0.8} />
        </button>
      </header>

      <Editor
        value={code}
        onValueChange={(test) => setCode(test)}
        highlight={(code) => highlight(code, languages.sql, "sql")}
        padding={16}
        textareaClassName="outline-none"
        className="my-4 h-40 bg-blueberry-600 border border-blueberry-300 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-lime-600"
      />

      <form className="py-8 flex flex-col w-full">
        <label className="text-lg font-light">Paste your SQL code here:</label>

        <label htmlFor="question" className="text-lg font-light">
          Make a questions about the code:
        </label>
        <textarea
          className="my-4 bg-blueberry-600 border border-blueberry-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-lime-600"
          name="question"
          id="question"
        />

        <button
          type="submit"
          className="text-pistachio flex flex-row rounded-lg border border-pistachio justify-center items-center gap-2.5 h-14"
        >
          <Stars className="w-6 h-6 fill-pistachio" />
          Ask the artificial inteligence
        </button>
      </form>

      <div className="mt-6">
        <span className="text-lg font-light">Response</span>
        <textarea
          readOnly
          className="w-full my-4 bg-transparent border border-blueberry-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-lime-600"
          name="question"
          id="question"
        />
      </div>
    </div>
  );
}
