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
    
  const login = async () => {
    await auth.signInWithEmailAndPassword(email, password);
    router.push("/");
  };

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
      userName: username,
    });
    router.push("/");
  };

  const handleTryLogin = () => {
    auth
      .signInWithEmailAndPassword("test@example.com", "password")
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        alert("申し訳ございません、エラーが発生しました。");
      });
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
      </Head>
      <Header />
      <div className="mt-8 space-y-6">
        <div>
          <AuthInput
            placeholder="email"
            value={email}
            onChange={onChangeEmail}
            name="email"
            type="email"
            autoComplete="email"
          />
          <AuthInput
            name="password"
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
                name="userName"
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
            onClick={handleTryLogin}
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
