import React from 'react';
import '../styles/ArticleEditor.css';

function ArticleEditor() {
  const title = "Article Title";
  const subheading = "SubHeading";
  const content = "Technology is rapidly transforming the way we live, work, and communicate. From smartphones to artificial intelligence, innovation continues to reshape our daily routines. It brings convenience, efficiency, and new opportunities across every industry. As we move forward, staying informed and adaptable is more important than ever.";

  return (
    <div className="article-editor-container p-5">
      <h1 className="article-title">{title}</h1>
      <h2 className="article-subheading">{subheading}</h2>
      <p className="article-content">{content}</p>
    </div>
  );
}

export default ArticleEditor;