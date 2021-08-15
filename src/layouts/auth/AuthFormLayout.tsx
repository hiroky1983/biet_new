import { InputHTMLAttributes, VFC } from "react";
import { AuthInput } from "../../components/input/AuthInput";

type PROPS = {
  lang: string;
  username: string;
  gender: string;
  userStatus: string;
  onChangeGender: InputHTMLAttributes<HTMLInputElement>["onChange"];
  onChangeLang: InputHTMLAttributes<HTMLInputElement>["onChange"];
  onChangeCheckStatus: InputHTMLAttributes<HTMLInputElement>["onChange"];
  onChangeUserName: InputHTMLAttributes<HTMLInputElement>["onChange"];
};

const SELECT_GENDERS = [
  {
    value: "男性",
    checked: "男性",
  },
  {
    value: "女性",
    checked: "女性",
  },
  {
    value: "未回答",
    checked: "",
  },
];
const SELECT_STATUS = [
  {
    value: "交際中",
  },
  {
    value: "既婚",
  },
];
export const AuthFormLayout: VFC<PROPS> = (props) => {
  const {
    gender,
    userStatus,
    username,
    lang,
    onChangeGender,
    onChangeLang,
    onChangeCheckStatus,
    onChangeUserName,
  } = props;
  return (
    <>
      <div className="flex  ">
        <span className="text-gray-500">性別？</span>
        {SELECT_GENDERS.map((gender) => {
          return (
            <div key={gender.value} className="space-x-2  text-center">
              <input
                type="radio"
                value={gender.value}
                name="select gender"
                checked={gender === gender}
                onChange={onChangeGender}
              />
              <label>{gender.value}</label>
            </div>
          );
        })}
      </div>
      <AuthInput
        placeholder="交際相手の国籍は？"
        value={lang}
        onChange={onChangeLang}
        type="text"
        inputName="select lang"
      />
      <div className="flex mt-4">
        <span className="text-gray-500">現在は？</span>
        {SELECT_STATUS.map((status) => {
          return (
            <div key={status.value}>
              <input
                type="radio"
                value={status.value}
                name="select status"
                onChange={onChangeCheckStatus}
                checked={userStatus === userStatus}
              />
              <label>{status.value}</label>
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <AuthInput
          placeholder="名前を入力"
          value={username}
          onChange={onChangeUserName}
          type="text"
          inputName="select lang"
        />
      </div>
    </>
  );
};
