import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import {useRouter} from 'next/dist/client/router';
import styles from '../styles/Template.module.css';
const DocumentRow = ({id,fileName,date}) => {

    const router = useRouter();
    return (
        <div 
        onClick={() => router.push(`/document/${id}`)}
        className={`${styles.recent} flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer`}>
             <Icon name="article" size="3xl" color="blue"/>
             <p className="flex-grow pl-5 w-10 pr-10 truncate font-bold">{fileName}</p>
             <p className="pr-12 text-sm">{date?.toDate().toLocaleDateString()}</p>
             <Button
                color="gray"
                buttonType="outline"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className="ml-5 border-0 bg-transparent"
              >
                  <Icon name="more_vert" size="3xl"/>
              </Button>
        </div>
    )
}

export default DocumentRow
