import React, { useEffect, useRef, useState } from 'react';
import { MonacoEditor } from 'react-monaco-editor';

const CodeEditor = () => {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here...');

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `code.${language}`;
    link.click();
  };

  const handleClear = () => {
    setCode('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <div>
      <select onChange={handleLanguageChange} value={language}>
        <option value='javascript'>JavaScript</option>
        <option value='python'>Python</option>
        <option value='java'>Java</option>
        <option value='csharp'>C#</option>
        <option value='html'>HTML</option>
        <option value='css'>CSS</option>
      </select>
      <MonacoEditor
        ref={editorRef}
        width='800'
        height='600'
        language={language}
        value={code}
        onChange={handleCodeChange}
      />
      <button onClick={handleDownload}>Download</button>
      <button onClick={handleShare}>Share</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

export default CodeEditor;
