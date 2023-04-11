import Image from "next/image";
import styles from "../styles/Home.module.css";
import Git from "../components/git"
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { loginWithGitHub } from "../firebase/client";

export default function Home() {

  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("no null");
        setUser(null);
      }
    });
  }, []);
  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {

        //console.log(user.user)
        setUser(user.user);
         
      })
      .catch((err) => {
        console.log(err);
      });
  };
   //console.log(user)
  return (
    <main className={`${styles.divPrimary}`}>
      <div className={`${styles.box}`}>
        <div className="flex-col items-center mt-[25%] justify-center">
          <div className="flex  justify-center">
            <Image
              src="/twitter-logo-6.png"
              alt="logo the twitter"
              width={80}
              height={80}
            ></Image>
        </div>
          <h1 className={`${styles.title} font-bold`}>TwitterDev</h1>

          <h2 className="text-center">
            Talk about development <br />
            with developers
          </h2>
          <div className="flex justify-center mt-3">
          {user === null &&
              <button
                onClick={handleClick}
                className="bg-black text-[11px] flex items-center border-white text-white relative rounded-xl hover:border hover:font-bold hover:bg-gray-900  px-3 py-1"
        >
                <Git fill="#fff" className="mr-2" />
                Login with GitHub
              </button>
            }

             {
             user  &&
              <div>

                <Image
                  src={user.photoURL}
                  alt="logo the twitter"
                  width={80}
                  height={80}
                  className="rounded-full"
                ></Image>
                <h1 className="font-bold">{user.displayName}</h1>
              </div>
            }
          </div>
        </div>
    </div>
    </main>
  );
}

