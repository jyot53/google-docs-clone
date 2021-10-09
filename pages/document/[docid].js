import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import {useRouter} from 'next/dist/client/router';
import {db} from '../../firebase';
import {useDocumentOnce} from 'react-firebase-hooks/firestore';
import {getSession,signOut,useSession} from 'next-auth/client';
import Login from '../../components/Login';
import TextEditor from '../../components/TextEditor';
const Doc = () => {

    const [session] = useSession();
    if(!session) return <Login/>;


    const router = useRouter();
    const {docid} = router.query;
    const [snapshot,loadingSnapshot] = useDocumentOnce(db.collection('userDocs').doc(session.user.email).collection('docs').doc(docid));

    if(!loadingSnapshot && snapshot?.data.filename){
        router.replace('/');
    }


    return (
        <div>
            <header className="flex justify-between items-center p-3 pb-1 shadow-md bg-gray-100">
                <span className="cursor-pointer" onClick={() =>router.push('/')}>
                    <Icon name="description" size="6xl" color="blue"/>
                </span>
                <div className="flex-grow px-2">
                    <h2 className="px-2">{snapshot?.data()?.filename}</h2>
                    <div className=" flex items-center text-sm space-x-2 ml-1 h-8 text-gray-600"> 
                        <p className="p-2 cursor-pointer hover:bg-gray-500 rounded-lg">File</p>
                        <p className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg">Edit</p>
                        <p className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg">View</p>
                        <p className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg">Insert</p>
                        <p className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg">Format</p>
                        <p className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg">Tools</p>
                    </div>
                </div>
                <Button
                    color="white"
                    buttonType="outline"
                    rounded={true}
                    iconOnly={true}
                    ripple="dark"
                    className="mr-4 border-0"
                    >
                    <Icon name="comment" size="3xl" color="gray"/>
                    </Button>
                <div className="flex items-center bg-blue-500 rounded-lg mr-4 cursor-pointer p-1">
                    <Button
                    color="white"
                    buttonType="outline"
                    rounded={true}
                    iconOnly={true}
                    ripple="dark"
                    className="border-0"
                    >
                    <Icon name="lock" size="2xl" color="white"/>
                    </Button>
                    <p className="mr-3 text-white">Share</p>
                </div>
                <img 
                className="cursor-pointer h-12 w-12 rounded-full ml-2"
                loading="lazy"
                src={session?.user.image}
                alt="user"
                />
                
            </header>
            <div className="bg-gray-100 mt-6 min-h-screen flex justify-center mx-auto">
                <TextEditor/>
            </div>
        </div>
    )
}

export default Doc;

export async function getServerSideProps(context){
    const session = await getSession(context);

    return {
        props:{
            session,
        }
    };
}
