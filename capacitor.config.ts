import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.glifqrcode.app",
  appName: "Glif",
  webDir: ".output/public",
  server: {
    androidScheme: "https",
  },
};

export default config;
