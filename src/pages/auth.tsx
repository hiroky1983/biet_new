import { InputHTMLAttributes, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Header } from "../layouts/header/Header";
import { auth, db } from "../../firebase";
import Head from "next/head";
import firebase from "firebase";
import { NextPage } from "next";

export const initialState = {
  uid: null,
  username: "",
  email: "",
  password: "",
  lang: "",
  checkValue: "",
  userstatus: "",
};

const Auth: NextPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lang, setLang] = useState("");
  const [checkValue, setCheckValue] = useState("");
  const [userStatus, setUserStatus] = useState("");

  const onChangeUserName: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback((e) => {
      setUsername(e.target.value);
    }, []);
  const onChangeEmail: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback((e) => {
      setEmail(e.target.value);
    }, []);
  const onChangePassword: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback((e) => {
      setPassword(e.target.value);
    }, []);
  const onChangeLang: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback((e) => {
      setLang(e.target.value);
    }, []);
  const onChangeCheckValue: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback((e) => {
      setCheckValue(e.target.value);
    }, []);
  const onChangeCheckStatus: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback((e) => {
      setUserStatus(e.target.value);
    }, []);

  const user = firebase.auth().currentUser;
  const userRef = {
    uid: user?.uid,
    email: email,
    password: password,
    displayName: username,
    lang: lang,
    checkValue: checkValue,
    userStatus: userStatus,
  };

  const login = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push({
        pathname: "/",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const createUser = async () => {
    try {
      await auth
        .createUserWithEmailAndPassword(userRef.email, userRef.password)
        .then(async () => {
          const userDoc = await db.collection("users").doc(userRef.uid).get();
          if (!userDoc.exists) {
            await userDoc.ref.set({ userRef });
          }
        });
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const authUser = () => {
    alert("Auth User");
  };
  const signInGoogle = () => {
    alert("Sign In Google");
  };

  return (
    <div className="max-w-md w-full m-auto justify-center ">
      <Head>
        <title>{isLogin ? "Login" : "Create account"}</title>
        <meta
          lang="ja"
          name="Connect with people who are dating foreigners "
          content="Connect for SNS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {isLogin ? "Login" : "Sign up"}
        </h2>
      </div>
      <form className="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              name={isLogin ? "username" : "email"}
              type="text"
              autoComplete={isLogin ? "username" : "email"}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder={isLogin ? "Username " : "Email"}
              value={isLogin ? username : email}
              onChange={isLogin ? onChangeUserName : onChangeEmail}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="text-sm">
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="cursor-pointer font-medium text-gray-700 hover:text-blue-500"
            >
              Create New User
            </span>
            {isLogin ? null : (
              <form action="">
                <div className="space-x-4 mt-4 text-center">
                  <span className="text-gray-500 ">性別？</span>
                  <input
                    type="radio"
                    value="男性"
                    name="select sex"
                    checked={checkValue === "男性"}
                    onChange={onChangeCheckValue}
                  />
                  <label>男性</label>
                  <input
                    type="radio"
                    value="女性"
                    name="select sex"
                    checked={checkValue === "女性"}
                    onChange={onChangeCheckValue}
                  />
                  <label>女性</label>
                  <input
                    type="radio"
                    value="未回答"
                    name="select sex"
                    checked={checkValue === ""}
                    onChange={onChangeCheckValue}
                  />
                  <label>未回答</label>
                  <div className="mt-6">
                    <input
                      className="px-10 py-2 rounded-full"
                      type="text"
                      name="select lang"
                      placeholder="交際相手の国籍は？"
                      onChange={onChangeLang}
                      value={lang}
                    />
                    <div className="space-x-4 mt-4">
                      <span className="text-gray-500">現在は？</span>
                      <input
                        type="radio"
                        value="交際中"
                        name="select status"
                        onChange={onChangeCheckStatus}
                        checked={userStatus === "交際中"}
                      />
                      <label>交際中</label>
                      <input
                        type="radio"
                        value="既婚"
                        name="select status"
                        onChange={onChangeCheckStatus}
                        checked={userStatus === "既婚"}
                      />
                      <label>既婚</label>
                    </div>
                    <div className="mt-6">
                      <input
                        className="px-10 py-2 rounded-full"
                        type="text"
                        name="select lang"
                        placeholder="名前を入力"
                        onChange={onChangeUserName}
                        value={username}
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        <div>
          <button
            onClick={isLogin ? login : createUser}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {isLogin ? "Login" : "Create New User"}
          </button>
        </div>

        <div>
          <button
            onClick={signInGoogle}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            signin with Google
          </button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
