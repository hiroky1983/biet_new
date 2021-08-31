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
};

export const ProfileEdit: VFC<Props> = (props) => {
  const {
    open,
    handleClose,
    onChangeProfile,
    profile,
  } = props;
  const classes = useStyles();
  const [lang, setLang] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [userStatus, setUserStatus] = useState("");
  // const [userData, setUserData] = useState(null);
  const user = useSelector(selectUser);
  const docId = user.uid;

  // const onChangeLang: InputHTMLAttributes<HTMLInputElement>["onChange"] =
  //   useCallback(
  //     (e) => {
  //       setLang(e.target.checked);
  //     },
  //     [setLang]
  //   );
  // const onChangeGender: InputHTMLAttributes<HTMLInputElement>["onChange"] =
  //   useCallback(
  //     (e) => {
  //       setGender(e.target.checked);
  //     },
  //     [setGender]
  //   );
  // const onChangeCheckStatus: InputHTMLAttributes<HTMLInputElement>["onChange"] =
  //   useCallback(
  //     (e) => {
  //       setUserStatus(e.target.value);
  //     },
  //     [setUserStatus]
  //   );
  // const onChangeUserName: InputHTMLAttributes<HTMLInputElement>["onChange"] =
  //   useCallback((e) => {
  //     setUsername(e.target.value);
  //   }, []);
  const onClickChangeProfile = useCallback(async (e) => {
    e.preventDefault();
    const userData = {
      lang: lang,
      gender: gender,
      userName: username,
      userStatus: userStatus,
    };
    const newData = db.collection("users").doc(docId);
    await newData.set({ ...userData }, { merge: true });
    handleClose();
  }, [lang, gender, username, userStatus, docId, handleClose]);

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
            onChangeGender={(e) => setGender(e.target.value)}
            onChangeLang={(e) => setLang(e.target.value)}
            onChangeCheckStatus={(e) => setUserStatus(e.target.value)}
            onChangeUserName={(e) => setUsername(e.target.value)}
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
