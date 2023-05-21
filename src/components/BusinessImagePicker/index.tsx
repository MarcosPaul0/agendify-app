import { COLORS } from '@constants/colors.constant';
import { Image, Plus } from 'phosphor-react-native';
import { TouchableOpacity, View } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { IBusinessImagePickerProps } from './interfaces/businessImagePickerProps.interface';

export function BusinessImagePicker({
  onChangeImage,
  imageUrl,
}: IBusinessImagePickerProps) {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  async function handleSetImage() {
    if (status?.status !== ImagePicker.PermissionStatus.GRANTED) {
      await requestPermission();
    }

    if (status?.status === ImagePicker.PermissionStatus.GRANTED) {
      const imageResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!imageResult.canceled) {
        const image = imageResult.assets[0];

        onChangeImage(image.uri);
      }
    }
  }

  return (
    <TouchableOpacity
      className={`
        rounded-full bg-GRAY_100  border border-GRAY_500
        p-5 relative w-28 h-28 items-center justify-center
        self-center mb-4
      `}
      onPress={handleSetImage}
    >
      {imageUrl ? (
        <ExpoImage
          source={imageUrl}
          className={`
            h-32 w-32 rounded-full
            border border-GRAY_500
          `}
        />
      ) : (
        <>
          <View>
            <Image size={60} color={COLORS.GRAY_500} />
          </View>
          <View className="absolute right-5 top-5 bg-GRAY_100">
            <Plus size={32} color={COLORS.GRAY_500} />
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}
