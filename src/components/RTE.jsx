import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import conf from '../conf/conf'


function RTE({name , control, label, defaultValue= "", onInit}) {

  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        <Controller
            name = {name || "content"}
            control = {control}
            defaultValue = {defaultValue}
            render= {( {field: {onChange}} ) => (
                <Editor
                    apiKey={conf.tinymceapikey}
                    cloudChannel='6'
                    initialValue={defaultValue}
                    onInit={onInit}
                    init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                            "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "help",
                                "wordcount",
                            ],
                            toolbar: 
                                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image table link | removeformat | help",
                    }}
                    onEditorChange={onChange}
                />
            )}
        />
    </div>
  );
}

export default RTE
