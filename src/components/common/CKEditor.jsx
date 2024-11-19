import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const MyEditor = ({ fieldName, fieldValue, setValue }) => {
  return (
    <div className="col-span-full">
      <label
        htmlFor="description"
        className="block text-sm font-medium leading-6 text-white-900"
      >
        {fieldName}
      </label>
      <div className="mt-2">
        <CKEditor
          editor={ClassicEditor}
          data={fieldValue}
          onChange={(event, editor) => {
            const data = editor.getData();
            setValue(data);
          }}
        />
      </div>
    </div>
  );
};

export default MyEditor;
