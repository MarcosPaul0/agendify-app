export interface IDeleteAlertProps {
  title: string;
  text: string;
  buttonText: string;
  onConfirm: () => void;
  onCancel: () => void;
}
