import * as FileSystem from 'expo-file-system';
import { base64ToBlob } from './base64ToBlob';

export async function transformDocumentToBlob(
  documentUri: string,
  mimeType: string
) {
  const fileInfo = await FileSystem.getInfoAsync(documentUri);
  const fileUri = fileInfo.uri;

  const fileContent = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const blob = base64ToBlob(fileContent, mimeType);

  return blob;
}
