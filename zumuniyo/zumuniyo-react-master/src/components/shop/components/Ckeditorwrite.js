import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function Ckeditorwrite() {
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data="가게 정보를 입력하세요."

        onReady={editor => {
          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
            );
        }}

        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });

        }}

      />

    </>
  );
}

export default Ckeditorwrite;
