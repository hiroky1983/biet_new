import { InputHTMLAttributes, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Header } from "../layouts/header/Header";
import { auth, provider } from "../../firebase";
import Head from "next/head";

export default function Auth() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [lang, setLang] = useState("");

  const onChangeUserId: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback((e) => {
      setUsername(e.target.value);
    }, []);
  const onChangePassword: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback((e) => {
      setPassword(e.target.value);
    }, []);
  const onChangeLang: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback((e) => {
      setLang(e.target.value);
    }, []);

  const login = async () => {
    try {
      await auth.signInWithEmailAndPassword(username, password);
      setIsLogin(false);
      router.push("/");
    } catch (err) {
      alert(err);
    }
  };

  const authUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isLogin) {
      login();
    } else {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/register/`, {
          method: "POST",
          body: JSON.stringify({ username: username, password: password }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.status === 400) {
            throw "authentication failed";
          }
        });
        login();
      } catch (err) {
        alert(err);
      }
    }
  };

  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
    router.push("/");
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
      <form className="mt-8 space-y-6" onSubmit={authUser}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder={isLogin ? "Username " : "Email"}
              value={username}
              onChange={onChangeUserId}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
              className="cursor-pointer font-medium text-gray-700 hover:text-indigo-500"
            >
              Create New User
            </span>
            {isLogin ? null : (
              <form action="">
                <div className="space-x-4 mt-4">
                  <span className="text-gray-500 ">性別？</span>
                  <input type="radio" value="男性" name="select sex" />
                  <label>男性</label>
                  <input type="radio" value="女性" name="select sex" />
                  <label>女性</label>
                </div>
                <div className="mt-6">
                  <input
                    className="px-10 py-2 rounded-full"
                    type="text"
                    name="select lang"
                    placeholder="交際相手の国籍は？"
                    onChange={onChangeLang}
                  />
                  <div className="space-x-4 mt-4">
                    <span className="text-gray-500">現在は？</span>
                    <input type="radio" value="交際中" name="select status" />
                    <label>交際中</label>
                    <input type="radio" value="既婚" name="select status" />
                    <label>既婚</label>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
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
