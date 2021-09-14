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
import { SecondaryButton } from "../components/button/SecondaryButton";
import { Button } from "@chakra-ui/button";
import { useAlert } from "../hooks/useAlert";

const Auth: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState<boolean | null>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const doneSave = useAlert("認証に成功しました", "success");
  const undoneSave = useAlert("認証に失敗しました", "error");

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
    await db.collection("users").doc(authUser.user?.uid).set({
      userId: authUser.user?.uid,
      userName: username,
    });
    router.push({
      pathname: `router.pathname/${authUser.user!.uid}`,
      query: {
        userId: authUser.user?.uid,
      },
    });
  };

  const onClickTestLogin = async () => {
    setIsLoading(true);
    try {
      await auth.signInWithEmailAndPassword("test@sample.com", "12345678");
      console.log("set");
      return login();
    } catch (err) {
      undoneSave();
    }
    setIsLoading(false);
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
          <div className="text-sm mt-2">
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="cursor-pointer font-medium text-gray-700 hover:text-blue-500"
            >
              Create New User
            </span>
          </div>
        </div>
        <div>
          <Button
            disabled={!email || password.length < 6}
            isLoading={isLoading}
            colorScheme="blue"
            my="2"
            width="100%"
            rightIcon={<LockIcon />}
            onClick={
              isLogin
                ? async () => {
                    try {
                      setIsLoading(true);
                      await login();
                      doneSave();
                    } catch (err) {
                      undoneSave();
                    }
                    setIsLoading(false);
                  }
                : async () => {
                    try {
                      setIsLoading(true);
                      await userRegister();
                      doneSave();
                    } catch (error: any) {
                      undoneSave();
                    }
                    setIsLoading(false);
                  }
            }
          >
            {isLogin ? "Login" : "Create New User"}
          </Button>
        </div>
        <div>
          <Button
            onClick={onClickTestLogin}
            isLoading={isLoading}
            colorScheme="blue"
            my="2"
            width="100%"
          >
            Test Login
          </Button>
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
