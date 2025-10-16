import type { Level, RenderAs, ImageSettings } from "qrcode.vue";

interface QRCodeData {
  value: string;
  size: number;
  level: Level;
  renderAs: RenderAs;
  background: string;
  foreground: string;
  imageSettings: ImageSettings;
}

const defaultData = {
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
} satisfies Readonly<QRCodeData>;

const data = ref<QRCodeData>(defaultData);

export const useQRCode = () => {
  const resetData = () => (data.value = defaultData);

  const downloadQRCode = () => {
    if (data.value.value.trim() == "" || data.value.value == null) {
      alert("Please insert a value to generate QR Code.");
      return;
    }

    const link = document.createElement("a") as HTMLAnchorElement;
    const canvas = document.querySelector("canvas")!.toDataURL("image/png") as string;

    link.href = canvas;
    link.download = `${new Date().getTime()}.png`;
    link.click();
  };

  return { data, resetData, downloadQRCode };
};
