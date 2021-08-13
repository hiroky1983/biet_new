import { IconButton, Modal, TextField } from "@material-ui/core";
import { Dispatch, SetStateAction, VFC } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

type PROPS = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  resetEmail: string;
  setResetEmail: Dispatch<SetStateAction<string>>;
  sendResetEmail: (e: React.MouseEvent<HTMLElement>) => Promise<void>;
}

export const ResetPasswordModal: VFC<PROPS> = (props) => {
  const { openModal,setOpenModal,resetEmail,setResetEmail,sendResetEmail} = props;
  return (
    <div>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div
          style={getModalStyle()}
          className="outline-none absolute w-96 h-72 border-r-8 bg-white shadow p-4"
        >
          <div className="text-center item-center mt-12">
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              type="email"
              name="email"
              label="Reset E-mail"
              value={resetEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setResetEmail(e.target.value);
              }}
            />
            <IconButton onClick={sendResetEmail}>
              <RiSendPlane2Fill />
            </IconButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};