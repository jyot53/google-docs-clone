import Button from "@material-tailwind/react/Button";
// import Icon from "@material-tailwind/react/Icon";
import DocumentRow from './DocumentRow';
const RecentDocs = ({snapshot}) => {

    return (
        <>
        <section className="max-w-3xl mx-auto mt-5">
          <div className="flex items-center justify-between py-5"> 
            <h2 className="text-lg">Recent documents</h2>  
            <div className="flex flex-column items-center justify-between">
              <div className="mr-4 p-2 rounded-lg cursor-pointer flex flex-column items-center hover:bg-gray-500 "> 
                <h3 className="mr-3">Date Created</h3>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
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
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
              </Button>
              <Button
              color="gray"
              buttonType="outline"
              rounded={true}
              iconOnly={true}
              ripple="dark"
              className="ml-5 border-0 bg-transparent hover:bg-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              </Button>
              <Button
              color="gray"
              buttonType="outline"
              rounded={true}
              iconOnly={true}
              ripple="dark"
              className="ml-5 border-0 bg-transparent hover:bg-gray-500"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
              </Button>

            </div>
          </div>
          {
            snapshot?.docs.map(doc =>(
              <DocumentRow key={doc.id}
                id={doc.id}
                fileName={doc.data().filename}
                date={doc.data().timestamp}
              />
            ))
          }
        </section>

        {/* <section className="bg-white px-10 md:px-0">
          <div className="max-w-3xl mx-auto py-8 text-sm">
            <div className="flex items-center justify-between pb-5">
              <h2 className="font-medium flex-grow">Recent Documents</h2>
              <p className="pr-12">Date Created</p>
              <Icon name="folder" size="3xl" color="gray"/>
            </div>
          
          </div>
         
        </section> */}


      </>
    )
}

export default RecentDocs
