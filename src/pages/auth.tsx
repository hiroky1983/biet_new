import { InputHTMLAttributes, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Header } from "../layouts/header/Header";
import { auth, db, provider } from "../../firebase";
import Head from "next/head";
import { NextPage } from "next";
import { updateUserProfile } from "../lib/auth";
import { useDispatch } from "react-redux";
import { LockIcon } from "../components/svg/LockIcon";
import { AuthInput } from "../components/input/AuthInput";
import { ResetPasswordModal } from "../layouts/auth/ResetPasswordModal";
import { AuthFormLayout } from "../layouts/auth/AuthFormLayout";

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
  const [openModal, setOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    lang: "",
    checkValue: "",
    userStatus: "",
  });

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

  const handleInputChange: InputHTMLAttributes<HTMLInputElement>["onChange"] = useCallback((e) => {
    const target = e.target;
    const value = target.type === "raido" ? target.checked : target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  }, [values]);
  
  // const userData = db.collection("users").add({
  //   username: username,
  //   checkValue: checkValue,
  //   lang: lang,
  //   userstatus: userStatus,
  // });

  const userRegister = async () => {
    // await userData;
    // console.log(userData);
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
              <AuthInput
                placeholder="email"
                value={email}
                onChange={onChangeEmail}
                inputName="email"
                type="email"
                autoComplete="email"
              />
            </div>
            <div>
              <AuthInput
                inputName="password"
                type="password"
                autoComplete="current-password"
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
                    <div>
                      <AuthFormLayout
                        checkValue={checkValue}
                        userStatus={userStatus}
                        lang={lang}
                        username={username}
                        onChangeCheckValue={onChangeCheckValue}
                        onChangeLang={onChangeLang}
                        onChangeCheckStatus={onChangeCheckStatus}
                        onChangeUserName={onChangeUserName}
                      />
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
                        router.push("/");
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
              <LockIcon />
              {isLogin ? "Login" : "Create New User"}
            </button>
          </div>

          <div>
            <button
              onClick={signInGoogle}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Test Login
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
      <ResetPasswordModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        resetEmail={resetEmail}
        setResetEmail={setResetEmail}
        sendResetEmail={sendResetEmail}
      />
    </div>
  );
};

export default Auth;
