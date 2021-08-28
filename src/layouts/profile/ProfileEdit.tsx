import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useCallback,
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

type Props = {
  handleClose: () => void;
  open: boolean;
  onClickChangeProfile: () => void;
  onChangeProfile: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"];
  profile: string;
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  userStatus: string;
  setUserStatus: React.Dispatch<React.SetStateAction<string>>;
};

export const ProfileEdit: VFC<Props> = (props) => {
  const {
    open,
    handleClose,
    onChangeProfile,
    profile,
    lang,
    setLang,
    gender,
    setGender,
    userStatus,
    setUserStatus,
  } = props;
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const user = useSelector(selectUser);
  const docId = user.uid;

  const onChangeLang: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback(
      (e) => {
        setLang(e.target.checked);
      },
      [setLang]
    );
  const onChangeGender: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback(
      (e) => {
        setGender(e.target.checked);
      },
      [setGender]
    );
  const onChangeCheckStatus: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback(
      (e) => {
        setUserStatus(e.target.value);
      },
      [setUserStatus]
    );
  const onChangeUserName: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback((e) => {
      setUsername(e.target.value);
    }, []);
  const onClickChangeProfile = async () => {
    if (user.uid) {
      await db.collection("users").doc(docId).set(
        {
          //firestoreのdccから値を取得する
          lang: lang,
          gender: gender,
          userName: user.displayName,
          userStatus: userStatus,
          profile: profile,
        },
        { merge: true }
      );
    } else {
      await db.collection("users").doc(docId).set({
        lang: lang,
        gender: gender,
        userName: user.displayName,
        userStatus: userStatus,
      });
    }
    handleClose();
  };

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
          <AuthFormLayout
            gender={gender}
            userStatus={userStatus}
            lang={lang}
            username={username}
            onChangeGender={onChangeGender}
            onChangeLang={onChangeLang}
            onChangeCheckStatus={onChangeCheckStatus}
            onChangeUserName={onChangeUserName}
          />
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
            defaultValue={
              profile === "プロフィールはまだありません" ? "" : profile
            }
          />
        </div>
      </Dialog>
    </div>
  );
};
