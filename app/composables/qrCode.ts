//Libraries
import * as easyKitUtils from "easy-kit-utils";
//Types
import type { QRCodeData } from "../types/qrCodeData";
//Capacitor
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Media } from "@capacitor-community/media";
//Utils
import { handlePhotoAlbums } from "../utils/handlePhotoAlbums";

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

    const fileName = `${new Date().getTime()}.png`;
    const base64Data = document.querySelector("canvas")!.toDataURL("image/png");

    if (Capacitor.isNativePlatform()) {
      await _downloadNativeQRCode(fileName, base64Data);
    } else {
      _downloadWebQRCode(fileName, base64Data);
    }
    resetData();
  };

  const _downloadWebQRCode = (fileName: string, base64Data: string) => {
    const link = document.createElement("a") as HTMLAnchorElement;

    link.href = base64Data;
    link.download = fileName;
    link.click();
  };

  const _downloadNativeQRCode = async (
    fileName: string,
    base64Data: string,
  ) => {
    try {
      const base64DataSplitted = base64Data.split(",")[1] as string;
      const album = await handlePhotoAlbums();

      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64DataSplitted!,
        directory: Directory.Cache,
      });

      await Media.savePhoto({
        path: savedFile.uri,
        albumIdentifier: album.identifier,
      });

      alert("QR Code has been saved to your gallery.");
      return;
    } catch (error) {
      alert("An error occurred during the saving: " + error);
      return;
    }
  };

  return { data, resetData, downloadQRCode };
};
