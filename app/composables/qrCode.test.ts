import { describe, it, expect, vi } from "vitest";
import { useQRCode } from "./qrCode";

describe("useQRCode composable", () => {
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
      "Please insert a value to generate QR Code."
    );
  });

  it("should create a download link when downloading QR code with valid value", () => {
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
      mockCanvas as unknown as HTMLCanvasElement
    );

    downloadQRCode();

    expect(mockClick).toHaveBeenCalled();
    expect(mockToDataURL).toHaveBeenCalled();
  });
});
