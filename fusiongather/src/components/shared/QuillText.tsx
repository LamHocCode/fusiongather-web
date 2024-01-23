import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
    value: string;
    onChange?: () => void
}

const QuillText = ({ value, onChange }: Props) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link', 'image'],
        ],
    };

    return (
        <>
            <ReactQuill
                theme='snow' value={value} onChange={onChange}
                modules={modules}
            />
        </>
    );
};

export default QuillText;