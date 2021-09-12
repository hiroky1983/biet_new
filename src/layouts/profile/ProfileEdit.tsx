import React, {
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useState,
  VFC,
} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { AuthFormLayout } from "../auth/AuthFormLayout";
import { TextareaAutosize } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../../lib/auth";
import { db } from "../../../firebase";
import { AuthInput } from "../../components/input/AuthInput";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Stack } from "@chakra-ui/layout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

type Props = {
  handleClose: () => void;
  open: boolean;
  onClickChangeProfile: () => void;
  onChangeProfile: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"];
};

export const ProfileEdit: VFC<Props> = (props) => {
  const { open, handleClose, onChangeProfile } = props;
  const classes = useStyles();
  const user = useSelector(selectUser);
  const docId = user.uid;
  const docRef = db.collection("users").doc(docId);
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [lang, setLang] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [profile, setProfile] = useState("");
  const [value, setValue] = useState("1");

  useEffect(() => {
    const getUserData = async () => {
      const dataList = await docRef.get();
      const data = dataList.data();
      setProfile(data?.profile);
      setUserStatus(data?.userStatus);
      setGender(data?.gender);
      setUsername(data?.username);
      setLang(data?.lang);
    };
    getUserData();
  }, [docId, docRef]);

  const onClickChangeProfile = useCallback(
    async (data) => {
      try {
        const newData = db.collection("users").doc(docId);
        await newData.update({ ...data });
        handleClose();
      } catch (error) {
        console.log(error);
      }
    },
    [lang, gender, username, userStatus, profile, docId, handleClose]
  );

  console.log(gender);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              プロフィール編集
            </Typography>
            <Button autoFocus color="inherit" onClick={onClickChangeProfile}>
              保存
            </Button>
          </Toolbar>
        </AppBar>
        <div className="text-center">
          <div className="flex">
            <span className="text-gray-500">性別？</span>
            {SELECT_GENDERS.map((gend) => {
              return (
                <div key={gend.value} className="text-center">
                  <input
                    type="radio"
                    value={gender}
                    name="select gender"
                    checked={gender === gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label>{gend.value}</label>
                  <RadioGroup onChange={setValue} value={value}>
                    <Stack direction="row">
                      <Radio value={gender}>First</Radio>
                    </Stack>
                  </RadioGroup>
                </div>
              );
            })}
          </div>
          <AuthInput
            placeholder="交際相手の国籍は？"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
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
                    onChange={(e) => setUserStatus(e.target.value)}
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
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              inputName="userName"
            />
          </div>
          <TextareaAutosize
            minRows={5}
            aria-label="Maximum height"
            style={{
              height: "100%",
              width: "100%",
              border: "1px solid #ccc",
              marginTop: "10px",
            }}
            onChange={onChangeProfile}
            defaultValue={profile}
          />
        </div>
      </Dialog>
    </div>
  );
};
