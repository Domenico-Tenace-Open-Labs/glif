import type { Level, RenderAs, ImageSettings } from "qrcode.vue";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Media } from "@capacitor-community/media";
import * as easyKitUtils from "easy-kit-utils";

interface QRCodeData {
  value: string;
  size: number;
  level: Level;
  renderAs: RenderAs;
  background: string;
  foreground: string;
  imageSettings: ImageSettings;
}
// @ts-ignore
const { isNull, isEmptyString } = easyKitUtils.default || easyKitUtils;
const data = ref<QRCodeData>({
  value: "",
  size: 150,
  level: "M",
  renderAs: "canvas",
  background: "#ffffff",
  foreground: "#000000",
  imageSettings: {
    src: "",
    height: 80,
    width: 80,
    excavate: true,
  },
});

export const useQRCode = () => {
  const resetData = () =>
    (data.value = {
      value: "",
      size: 150,
      level: "M",
      renderAs: "canvas",
      background: "#ffffff",
      foreground: "#000000",
      imageSettings: {
        src: "",
        height: 80,
        width: 80,
        excavate: true,
      },
    } satisfies Readonly<QRCodeData>);

  const downloadQRCode = async () => {
    if (isEmptyString(data.value.value) || isNull(data.value.value)) {
      alert("Please insert a value to generate QR Code.");
      return;
    }

    if (Capacitor.isNativePlatform()) {
      await _downloadNativeQRCode();
    } else {
      _downloadWebQRCode();
    }
    resetData();
  };

  const _downloadWebQRCode = () => {
    const link = document.createElement("a") as HTMLAnchorElement;
    const canvas = document
      .querySelector("canvas")!
      .toDataURL("image/png") as string;

    link.href = canvas;
    link.download = `${new Date().getTime()}.png`;
    link.click();
  };

  const _downloadNativeQRCode = async () => {
    try {
      const base64Data = document
        .querySelector("canvas")!
        .toDataURL("image/png")
        .split(",")[1];

      const fileName = `${new Date().getTime()}.png`;
      const album = await _handlePhotoAlbums();

      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data!,
        directory: Directory.Cache,
      });

      await Media.savePhoto({
        path: savedFile.uri,
        albumIdentifier: album.identifier,
      });

      alert("QR Code is saved in the gallery.");
      return;
    } catch (error) {
      const a = await Media.getAlbums();
      alert("Errore durante il salvataggio: " + a);
    }
  };

  const _handlePhotoAlbums = async () => {
    let albums = await Media.getAlbums();

    if (!albums.albums.find((x) => x.name == "Glif Downloads")) {
      await Media.createAlbum({ name: "Glif Downloads" });
    }

    albums = await Media.getAlbums();
    const album = albums.albums.find((x) => x.name == "Glif Downloads")!;

    return album;
  };

  return { data, resetData, downloadQRCode };
};
