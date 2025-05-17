import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function TextEditor({ setInput }) {
  const editorRef = useRef(null);

  const handleEditorChange = () => {
    if (editorRef.current) {
      const plainText = editorRef.current.getContent({ format: 'text' });
      setInput(prev => ({
        ...prev,
        description: plainText,
      }));
    }
  };

  return (
    <Editor
      apiKey="hosqxmctijxm3bytecczsjdbb0e0bntjpoe9dmolyxrebv1q"
      onInit={(evt, editor) => editorRef.current = editor}
      onEditorChange={handleEditorChange}
      init={{
        height: 200,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
          'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'paste', 'help', 'wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | removeformat | help',
      }}
    />
  );
}

export default TextEditor;
