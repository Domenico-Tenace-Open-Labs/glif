//Capacitor
import { Media } from "@capacitor-community/media";
//Data
import photoAlbum from "../data/photoAlbums.json";

export const handlePhotoAlbums = async () => {
  const { albums } = await Media.getAlbums();
  const existingAlbum = albums.find((x) => x.name === photoAlbum.defaultAlbum);

  if (existingAlbum) return existingAlbum;

  await Media.createAlbum({ name: photoAlbum.defaultAlbum });

  const { albums: updatedAlbums } = await Media.getAlbums();
  return updatedAlbums.find((x) => x.name === photoAlbum.defaultAlbum)!;
};
