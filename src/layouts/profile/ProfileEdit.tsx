import React, { TextareaHTMLAttributes, useState, VFC } from "react";
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
};

export const ProfileEdit: VFC<Props> = (props) => {
  const { open, onClickChangeProfile, handleClose, onChangeProfile } = props;
  const classes = useStyles();

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
            <Button autoFocus color="inherit" onClick={handleClose}>
              保存
            </Button>
          </Toolbar>
        </AppBar>
        {/* <AuthFormLayout
          checkValue={}
          userStatus={}
          lang={}
          username={}
          onChangeCheckValue={}
          onChangeLang={}
          onChangeCheckStatus={}
          onChangeUserName={}
        /> */}
        <TextareaAutosize
          minRows={5}
          aria-label="Maximum height"
          onChange={onChangeProfile}
        />
      </Dialog>
    </div>
  );
};
