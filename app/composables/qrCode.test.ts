import { describe, it, expect, vi, beforeEach } from "vitest";
import { useQRCode } from "./qrCode";
import { Capacitor } from "@capacitor/core";
import { Filesystem } from "@capacitor/filesystem";
import { Media } from "@capacitor-community/media";
import { handlePhotoAlbums } from "../utils/handlePhotoAlbums";

vi.mock("@capacitor/core", () => ({
  Capacitor: {
    isNativePlatform: vi.fn(() => false),
  },
}));

vi.mock("@capacitor/filesystem", () => ({
  Filesystem: {
    writeFile: vi.fn(),
  },
  Directory: {
    Cache: "CACHE",
  },
}));

vi.mock("@capacitor-community/media", () => ({
  Media: {
    savePhoto: vi.fn(),
  },
}));

vi.mock("../utils/handlePhotoAlbums", () => ({
  handlePhotoAlbums: vi.fn(),
}));

describe("useQRCode composable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(Capacitor.isNativePlatform).mockReturnValue(false);
  });

  it("should initialize with default values", () => {
    const { data } = useQRCode();
    expect(data.value).toEqual({
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
  });

  it("should reset QR code data correctly", () => {
    const { data, resetData } = useQRCode();
    const newData = {
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
    };
    resetData();
    expect(data.value).toEqual(newData);
  });

  it("should alert when trying to download QR code with empty value", () => {
    const { downloadQRCode } = useQRCode();
    global.alert = vi.fn();
    downloadQRCode();
    expect(global.alert).toHaveBeenCalledWith(
      "Please insert a value to generate QR Code.",
    );
  });

  it("should create a download link when downloading QR code with valid value (web app)", () => {
    const { data, downloadQRCode } = useQRCode();
    data.value.value = "https://example.com";

    const mockClick = vi.fn();
    const mockToDataURL = vi
      .fn()
      .mockReturnValue("data:image/png;base64,FAKEIMAGE");
    const mockCanvas = {
      toDataURL: mockToDataURL,
    };
    vi.spyOn(document, "createElement").mockReturnValue({
      href: "",
      download: "",
      click: mockClick,
    } as unknown as HTMLAnchorElement);
    vi.spyOn(document, "querySelector").mockReturnValue(
      mockCanvas as unknown as HTMLCanvasElement,
    );

    downloadQRCode();

    expect(mockClick).toHaveBeenCalled();
    expect(mockToDataURL).toHaveBeenCalled();
  });

  it("should save the QR code to gallery when on native platform (Android/iOS)", async () => {
    const { data, downloadQRCode } = useQRCode();
    data.value.value = "native test value";

    vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true);

    const mockToDataURL = vi
      .fn()
      .mockReturnValue("data:image/png;base64,FAKEBASE64NATIVE");
    const mockCanvas = {
      toDataURL: mockToDataURL,
    };
    vi.spyOn(document, "querySelector").mockReturnValue(
      mockCanvas as unknown as HTMLCanvasElement,
    );
    global.alert = vi.fn();

    vi.mocked(handlePhotoAlbums).mockResolvedValue({
      identifier: "ALBUM_ID",
    } as any);
    vi.mocked(Filesystem.writeFile).mockResolvedValue({
      uri: "file://path/to/qr.png",
    });
    vi.mocked(Media.savePhoto).mockResolvedValue(undefined as any);

    await downloadQRCode();

    expect(mockToDataURL).toHaveBeenCalledWith("image/png");
    expect(handlePhotoAlbums).toHaveBeenCalled();
    expect(Filesystem.writeFile).toHaveBeenCalledWith({
      path: expect.stringMatching(/\d+\.png/),
      data: "FAKEBASE64NATIVE",
      directory: "CACHE",
    });
    expect(Media.savePhoto).toHaveBeenCalledWith({
      path: "file://path/to/qr.png",
      albumIdentifier: "ALBUM_ID",
    });
    expect(global.alert).toHaveBeenCalledWith(
      "QR Code has been saved to your gallery.",
    );
  });
});
