import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import moment from "moment-with-locales-es6";
import ProfileProvider, { useProfileContext } from '../context/ProfileContext';

import dynamic from 'next/dynamic'
const Wrapper = dynamic(() => import('../components/Wrapper'), {
ssr: false,
});



export default function Home() {
  const fixWeek = Number(moment().format("w"));
  const {menu}= useProfileContext()

  console.log("UJ ERTEK", menu)
  if (menu == null) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Wrapper allMenu={menu}/>
    </div>
  )
}
