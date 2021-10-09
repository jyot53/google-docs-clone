import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import styles from '../styles/Template.module.css';
import {useSession,signOut} from 'next-auth/client';
const Header = () => {

    const [session] = useSession();

    return (
        <header className="flex items-center sticky top-0 z-50 px-4 py-1 shadow-md bg-white">
            <Button
             color="gray"
             buttonType="outline"
             rounded={true}
             iconOnly={true}
             ripple="dark"
             className="md:inline-flex h-20 w-20 border-0"
            >
                <Icon name="menu" size="3xl"/>
            </Button>
            <Icon name="description" size="5xl" color="blue"/>
            <h1 className="md:inline-flex ml-2 text-gray-700 text-2xl">Docs</h1>

            <div className={`${styles.inputfield} mx-5 md:mx-20 flex flex-grow items-center px-5 py-2 rounded-lg
             bg-gray-100 text-gray-600 
             focus-within:text-gray-600 focus-within:shadow-md`}>
                <Icon name="search" size="3xl" color="gray" />
                <input className="flex-grow text-base bg-transparent outline-none px-5" type="text" placeholder="search"/>
            </div>

            <Button
             color="gray"
             buttonType="outline"
             rounded={true}
             iconOnly={true}
             ripple="dark"
             className="ml-5 md:ml-20 h-20 w-20 border-0"
            >
                <Icon name="apps" size="3xl" color="darkgray"/>
            </Button>

            <img 
            className="cursor-pointer h-12 w-12 rounded-full ml-2"
            loading="lazy"
            onClick={signOut}
            src={session?.user.image}
            alt="user"
            />
            {/* https://lh3.googleusercontent.com/ogw/ADea4I44qXqxkhkMKNMaRvHkMC4IpWvNd3ywGKr4QFT7JQ=s83-c-mo */}
        </header>
    )
}

export default Header

