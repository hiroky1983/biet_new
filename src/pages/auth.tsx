import { InputHTMLAttributes, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Header } from "../layouts/header/Header";
import { auth, provider } from "../../firebase";
import Head from "next/head";
import { NextPage } from "next";
import { updateUserProfile } from "../lib/auth";
import { useDispatch } from "react-redux";
import { LockIcon } from "../components/svg/LockIcon";
import { AuthInput } from "../components/input/AuthInput";
import { ResetPasswordModal } from "../layouts/auth/ResetPasswordModal";
import { SecondaryButton } from "../components/button/SecondaryButton";

const Auth: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState<boolean | null>(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const login = async () => {
    await auth.signInWithEmailAndPassword(email, password);
    router.push("/");
  };

  const onChangeEmail: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback((e) => {
      setEmail(e.target.value);
    }, []);
  const onChangePassword: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback((e) => {
      setPassword(e.target.value);
    }, []);
  const onChangeUserName: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback((e) => {
      setUsername(e.target.value);
    }, []);

  const userRegister = async () => {
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

  const onClickTestLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword("testUser@gmail.com", "aaaaaaaa");
    } catch (err) {
      alert(err);
    }
  };

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
      <div className="mt-8 space-y-6">
        <div>
          <AuthInput
            placeholder="email"
            value={email}
            onChange={onChangeEmail}
            inputName="email"
            type="email"
            autoComplete="email"
          />
          <AuthInput
            inputName="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
          />
          {isLogin ? null : (
            <div className="">
              <AuthInput
                placeholder="名前を入力"
                value={username}
                onChange={onChangeUserName}
                type="text"
                inputName="userName"
              />
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <div className="text-sm">
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="cursor-pointer font-medium text-gray-700 hover:text-blue-500  "
            >
              Create New User
            </span>
          </div>
        </div>
        <div>
          <SecondaryButton
            disabled={!email || password.length < 6}
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
          >
            <LockIcon />
            {isLogin ? "Login" : "Create New User"}
          </SecondaryButton>
        </div>
        <div>
          <SecondaryButton onClick={onClickTestLogin}>
            Test Login
          </SecondaryButton>
          <span
            className="cursor-pointer text-gray-500 block text-center mt-6"
            onClick={() => setOpenModal(true)}
          >
            Forgot password ?
          </span>
        </div>
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