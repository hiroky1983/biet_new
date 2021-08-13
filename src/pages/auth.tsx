import { InputHTMLAttributes, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Header } from "../layouts/header/Header";
import { auth, db, provider } from "../../firebase";
import Head from "next/head";
import { NextPage } from "next";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { IconButton, Modal, TextField } from "@material-ui/core";
import { RiSendPlane2Fill } from "react-icons/ri";
import { updateUserProfile } from "../lib/auth";
import { useDispatch } from "react-redux";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Auth: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lang, setLang] = useState("");
  const [checkValue, setCheckValue] = useState("");
  const [userStatus, setUserStatus] = useState("");
  useCreateUserWithEmailAndPassword(auth);
  const [openModal, setOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const login = async () => {
    await auth.signInWithEmailAndPassword(email, password);
  };

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

  // const handleInputChange: InputHTMLAttributes<HTMLInputElement>["onChange"] = useCallback((e) => {
  //   setUserData(e.target.value);
  // }, []);
  const userData = db.collection("users").add({
    username: username,
    checkValue: checkValue,
    lang: lang,
    userstatus: userStatus,
  });

  const userRegister = async () => {
    await userData;
    console.log(userData);
    const authUser = await auth.createUserWithEmailAndPassword(email, password);
    await authUser.user?.updateProfile({
      displayName: username,
      photoURL: "",
    });
    dispatch(
      updateUserProfile({
        displayName: username,
        photoUrl: "",
      })
      );
      router.push("/");
  };

  // const testLogin = () => {
  //   //型指定をstringにしたい
  //   const email = setEmail("aiueo@exmple.com");
  //   const password = setPassword("12345678");
  //   auth.signInWithEmailAndPassword(email, password);
  // };

  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail("");
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail("");
      });
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
        <form className="mt-8 space-y-6" noValidate>
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
                <div>
                  <form noValidate>
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
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              disabled={
                isLogin
                  ? !email || password.length < 6
                  : !username || !email || password.length < 6
              }
              onClick={
                isLogin
                  ? async () => {
                      try {
                        await login();
                      } catch (err) {
                        alert(err.message);
                      }
                    }
                  : async () => {
                      try {
                        await userRegister();
                      } catch (err) {
                        alert(err.message);
                      }
                    }
              }
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
              テストログイン
            </button>
            <span
              className="cursor-pointer text-gray-500 block text-center mt-6"
              onClick={() => setOpenModal(true)}
            >
              Forgot password ?
            </span>
          </div>
        </form>
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div
          style={getModalStyle()}
          className="outline-none absolute w-96 h-72 border-r-8 bg-white shadow p-4"
        >
          <div className="text-center item-center mt-12">
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              type="email"
              name="email"
              label="Reset E-mail"
              value={resetEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setResetEmail(e.target.value);
              }}
            />
            <IconButton onClick={sendResetEmail}>
              <RiSendPlane2Fill />
            </IconButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Auth;
