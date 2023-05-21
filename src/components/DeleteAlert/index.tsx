import { Button } from '@components/Button';
import { COLORS } from '@constants/colors.constant';
import { Trash } from 'phosphor-react-native';
import { Alert } from 'react-native';
import { IDeleteAlertProps } from './interfaces/deleteAlertProps.interface';

export function DeleteAlert({
  title,
  text,
  buttonText,
  onConfirm,
  onCancel,
}: IDeleteAlertProps) {
  function showAlert() {
    Alert.alert(
      title,
      text,
      [
        { text: 'Cancelar', onPress: onCancel },
        { text: 'Confirmar', onPress: onConfirm },
      ],
      { cancelable: true }
    );
  }

  return (
    <Button
      isDanger
      title={buttonText}
      text={buttonText}
      variant="filled"
      icon={<Trash color={COLORS.GRAY_50} />}
      onPress={showAlert}
    />
  );
}
