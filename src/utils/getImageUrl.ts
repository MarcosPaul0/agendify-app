import defaultImage from '@assets/images/defaultImage.png';
import { BASE_URL } from '@constants/baseUrl.constant';

export function getImageUrl(imageUrl?: string) {
  if (imageUrl) {
    return `${BASE_URL}/${imageUrl}`;
  }

  return defaultImage;
}
