import Head from 'next/head'
import Header from '../components/Header';
import Template from '../components/Template';
import Login from '../components/Login';
import {useSession , getSession} from 'next-auth/client';

export default function Home() {


  const [session] = useSession();
  if(!session) return <Login/>;

  return (
    <div className="">
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <Template session={session}/>
      
    </div>
  )
}

export async function getServerProps(context){
  const session = await getSession();

  return {
    props:{
      session
    }
  };
}