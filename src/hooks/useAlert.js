import { useToast } from "@chakra-ui/react";
/**
 * 実行すると画面にAlertを表示します。
 * @param {string} msg Alertに表示するメッセージ
 * @param {string} status Alertの種類(次のいずれか "info" | "warning" | "success" | "error")
 * @param {boolean} isAutoClose Alertを自動で閉じるかどうか(Default = true)
 */
export const useAlert = (msg, status, isAutoClose = true) => {
  const param = {
    title: msg,
    position: "top",
    status: status,
    isClosable: true,
    // 引数isAutoCloseがtrueの場合は５秒後に勝手に消えます、falseの場合はユーザが×を押さない限り消えません
    duration: isAutoClose ? 5000 : null,
  };
  return useToast(param);
};
