import React,{useState} from 'react';
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import firebase from 'firebase';
import {db} from "../firebase";
import styles from '../styles/Template.module.css';
import RecentDocs from '../components/RecentDocs';
import {useCollectionOnce} from 'react-firebase-hooks/firestore';
const Template = ({session}) => {

  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [snapshot] = useCollectionOnce(db.collection('userDocs').doc(session.user.email).collection('docs').orderBy('timestamp','desc'));
  const createDocument = () => {
    if(!input) return;

    db.collection('userDocs').doc(session.user.email).collection('docs').add({
      filename:input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput("");
    setShowModal(false);
  };

  const modal = (
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      <ModalHeader toggler={() => setShowModal(false)}>
        Create New Doc
      </ModalHeader>
        <ModalBody>
          <input type="text" 
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            className="outline-none w-full"
            placeholder="Enter name of the document"
            onKeyDown={(e)=>e.key === "Enter" && createDocument()  } 
          />
        </ModalBody>
        <ModalFooter>
          <Button 
            color="red"
            buttonType="link"
            onClick={(e) => setShowModal(false)}
            ripple="dark"
          >
            Close
          </Button>

          <Button
            color="blue"
            onClick={createDocument}
            ripple="light"
          >
            Create document
          </Button>
        </ModalFooter>


    </Modal>
  );

    return (
      <>
        <section className="bg-gray-200 pb-10 px-10"> 
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-5"> 
            <h2 className="text-lg">Start a new document </h2>  
            <div className="flex flex-column items-center justify-between">
              <div className="mr-4 p-2 rounded-lg cursor-pointer flex flex-column items-center hover:bg-gray-500 "> 
                <h3 className="mr-3">Template gallery</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
              <Button
                color="gray"
                buttonType="outline"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className="ml-5 border-0 bg-transparent hover:bg-gray-500"
              >
                  <Icon name="more_vert" size="3xl"/>
              </Button>

            </div>
          </div> 
          <div className="flex flex-column items-center justify-between">
            <div>
              <img 
                onClick={(e) => setShowModal(true)}
                className={`${styles.template} cursor-pointer h-52 w-40 rounded-md border-2 hover:border-blue-700`}
                loading="lazy"
                src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
              />
              <p className="ml-2 mt-2 font-semibold text-sm">Blank</p>
            </div>
            {modal}
            <div>
              <img 
                className={`${styles.template} cursor-pointer h-52 w-40 rounded-md border-2 hover:border-blue-700`}
                loading="lazy"
                src="https://ssl.gstatic.com/docs/templates/thumbnails/1wyFqxsRmKm9q--7j4WRmBMn694YdhV6hmNrfh4rVm2E_400.png"
              />
              <p className="ml-2 mt-2 font-semibold text-sm">Resume</p>
            </div> 
            <div>
              <img 
                className={`${styles.template} cursor-pointer h-52 w-40 rounded-md border-2 hover:border-blue-700`}
                loading="lazy"
                src="https://ssl.gstatic.com/docs/templates/thumbnails/1XykI9TfWo4IoUqGLjQ-D8NIU4jZ1Ml9OI8-Euj5FrA0_400_3.png"
              />
              <p className="ml-2 mt-2 font-semibold text-sm">Project Proposal</p>
            </div>   
            <div>
              <img 
                className={`${styles.template} cursor-pointer h-52 w-40 rounded-md border-2 hover:border-blue-700`} 
                loading="lazy"
                src="https://ssl.gstatic.com/docs/templates/thumbnails/1TojfPV3jurwEV2RpmVqnCCCR4z9g2eQBZ40XTHPBqk8_400_3.png"
              />
              <p className="ml-2 mt-2 font-semibold text-sm">Brochure</p>
            </div>   
          </div>

        </div>  
      </section>
      <RecentDocs snapshot={snapshot}/>
      </>
    )
}

export default Template


 {/* <div className="relative h-52 w-40">
              <Image src="https://links.papareact.com/pju" 
                layout="fill"
              />
            </div> */}