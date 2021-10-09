import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import {EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
const Editor = dynamic(() => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);
const TextEditor = () => {

    const [session] = useSession();
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const router = useRouter();
    const {docid} = router.query;


    const [snapshot] = useDocumentOnce(db.collection("userDocs").doc(session.user.email).collection("docs").doc(docid));
        
    useEffect(() => {
        if (snapshot?.data()?.editorState) {
            setEditorState(EditorState.createWithContent(convertFromRaw(snapshot?.data()?.editorState)));
        }
    }, [snapshot]);


    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);    

         db.collection('userDocs').doc(session.user.email).collection('docs').doc(docid).set({
            editorState : convertToRaw(editorState.getCurrentContent())
        },{
            merge:true
        });
            
    };
    const uploadImageCallBack = (file) => {
        return new Promise(
          (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID c19df2e4c34d6e5');
            // xhr.setRequestHeader('Authorization', 'Client-ID c166b3ccc22b789');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
              const response = JSON.parse(xhr.responseText);
              console.log(response)
              resolve(response);
            });
            xhr.addEventListener('error', () => {
              const error = JSON.parse(xhr.responseText);
              console.log(error)
              reject(error);
            });
          }
        );
      }

    return (
        <div className="pb-16">
            <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
            editorClassName="mt-6 p-10 bg-white shadow-lg min-h-screen max-w-3xl mx-auto mb-12 border"
            toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
            }}
            />
        </div>
    )
}

export default TextEditor;