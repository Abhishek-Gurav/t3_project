import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../components/Button";
import userStyles from "../styles/user.module.css";
import selfie from "../Images/Selfie.png"
import { useUser } from "@clerk/nextjs";
import Layout from "~/components/Layout";
import Navbar from "~/components/Navbar";

interface User {
  userData: {
    username: string;
  };
}

export default function UserDetails() {
 const user = useUser();
  

  return (
    <Layout >
    <div>
      <div className={userStyles.user}>
        <div className={userStyles.user__text}>
          {user.isSignedIn ? (
            <>
              <h1 className={userStyles.hero_head}>
                Hi, {user.user.firstName}!
              </h1>
              <p className={userStyles.hero_para}>
                AI has power to change the world and <br /> we are here to help
                you
              </p>
            </>
          ) : (
            <>
              <h1 className={userStyles.hero_head}>Hello, User</h1>
              <p className={userStyles.hero_para}>
                This website is made for having fun with{" "}
                <strong>friends & family</strong> by applying filters on each
                other and also has feature to analyze any paragraph.
                <br />
                <i>Please Login to continue.</i>
              </p>
            </>
          )}
          {user.isSignedIn   ? (
            <>
              <Button
                text="Ghost Mask"
                cls="btn_hero1"
                vari="dark"
                link="/ghostmask"
              />
              <Button
                text="Text Analyzer"
                cls="btn_hero btn-outline-primary"
                vari=""
                link="/nlp"
              />
            </>
          ) : (
            <Button
              text="Login"
              cls="btn_hero1"
              vari="dark"
              link="/login-user"
            />
          )}
        </div>
        <Image
          className={userStyles.landing_img}
          src={selfie}
          alt="Landing Page"
          width={400}
          height={400}
        />
      </div>
    </div>
    </Layout>
  );
}
