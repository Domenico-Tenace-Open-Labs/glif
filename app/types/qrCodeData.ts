import type { Level, RenderAs, ImageSettings } from "qrcode.vue";
export interface QRCodeData {
  value: string;
  size: number;
  level: Level;
  renderAs: RenderAs;
  background: string;
  foreground: string;
  imageSettings: ImageSettings;
}
