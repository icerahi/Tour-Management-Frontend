import { Button } from "@/components/ui/button";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

// Minimal NFC type allowance
declare global {
  interface Window {
    NDEFReader?: any;
  }
}

const barcodeNFCtest = () => {
  const [barcodeData, setBarcodeData] = useState<string[]>([]);
  const [nfcData, setNfcData] = useState<string>("");
  const [nfcError, setNfcError] = useState<string>("");

  const html5QrcodeScannerRef = useRef<Html5Qrcode | null>(null);
  const [scanning, setScanning] = useState(false);
  const lastScannedRef = useRef<string | null>(null);

  // New state to track torch
  const [torchOn, setTorchOn] = useState(false);

  // NFC reading logic unchanged...
  // NFC reading logic - unchanged from your code
  const readNFC = async () => {
    if (!("NDEFReader" in window)) {
      setNfcError("❌ Web NFC not supported");
      return;
    }
    try {
      const ndef = new window.NDEFReader();
      setNfcData("📡 Waiting for NFC tag...");

      await ndef.scan();
      ndef.onreading = (event: any) => {
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          setNfcData(
            JSON.stringify({
              recordType: record.recordType,
              mediaType: record.mediaType,
              id: record.id,
              data: record.data ? decoder.decode(record.data) : null,
            })
          );
        }
      };
    } catch (error: any) {
      setNfcError(`NFC Read Failed: ${error.message}`);
    }
  };

  // Play beep sound on scan success
  const playBeep = () => {
    const beep = new Audio("/barcode_sound.mp3");
    beep.play();
  };

  // Play beep sound on scan success unchanged...

  const startScanner = async () => {
    if (scanning) return;

    const config = {
      fps: 10,
      qrbox: { width: 300, height: 300 },
      rememberLastUsedCamera: true,
    };

    const html5QrcodeScanner = new Html5Qrcode("reader");
    html5QrcodeScannerRef.current = html5QrcodeScanner;

    try {
      setScanning(true);
      lastScannedRef.current = null;
      setTorchOn(false); // reset torch on start

      const devices = await Html5Qrcode.getCameras();
      if (!devices || devices.length === 0) {
        alert("No cameras found");
        setScanning(false);
        return;
      }
      const cameraId = devices[1].id; // use first camera

      await html5QrcodeScanner.start(
        cameraId,
        config,
        (decodedText: any, decodedResult) => {
          if (decodedText !== lastScannedRef.current) {
            lastScannedRef.current = decodedText;
            setBarcodeData((prev) => [decodedText, ...prev]);
            playBeep();
          }
        },
        (errorMessage) => {
          // Optional: handle decode errors
        }
      );
    } catch (error) {
      alert("Unable to start scanning: " + (error as any).message);
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    if (html5QrcodeScannerRef.current) {
      await html5QrcodeScannerRef.current.stop();
      await html5QrcodeScannerRef.current.clear();
      html5QrcodeScannerRef.current = null;
    }
    setScanning(false);
    setTorchOn(false);
  };

  // Torch toggle function
  const toggleTorch = async () => {
    if (!scanning) {
      alert("Start scanning first to toggle torch");
      return;
    }
    const videoElem = document.querySelector(
      "#reader video"
    ) as HTMLVideoElement;
    if (!videoElem) {
      alert("Video element not found");
      return;
    }
    const stream = videoElem.srcObject as MediaStream | null;
    if (!stream) {
      alert("No camera stream available");
      return;
    }
    const track = stream.getVideoTracks()[0];
    if (!track) {
      alert("No video track found");
      return;
    }
    const capabilities = track.getCapabilities() as any;
    if (!capabilities.torch) {
      alert("Torch not supported on this device");
      return;
    }

    try {
      await track.applyConstraints({
        advanced: [{ torch: !torchOn } as any],
      });
      setTorchOn(!torchOn);
    } catch (e) {
      alert("Torch toggle failed");
    }
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">
        QR/Barcode + NFC Scanner (html5-qrcode)
      </h1>

      {/* Barcode/QR Scanner */}
      <div className="border p-4 rounded shadow-md">
        <h2 className="font-semibold mb-2">Scan QR or Barcode</h2>
        <div
          id="reader"
          style={{
            width: 300,
            height: 300,
            margin: "auto",
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: "#000",
          }}
        ></div>

        <div className="flex justify-center items-center gap-3 mt-2">
          {!scanning && <Button onClick={startScanner}>Start Scan</Button>}
          {scanning && <Button onClick={stopScanner}>Stop</Button>}
          <Button onClick={toggleTorch} disabled={!scanning}>
            {torchOn ? "Turn Torch Off" : "Turn Torch On"}
          </Button>
        </div>

        {barcodeData.map((scanned, i) => (
          <p key={i} className="mt-2">
            Scanned Code: <strong>{scanned}</strong>
          </p>
        ))}
      </div>

      {/* NFC Reader - unchanged */}
      <button
        onClick={readNFC}
        style={{
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          borderRadius: "8px",
        }}
      >
        Start NFC Scan
      </button>
      <div className="border p-4 rounded shadow-md">
        <h2 className="font-semibold mb-2">NFC Scan Result</h2>
        {nfcError && <p className="text-red-500">{nfcError}</p>}
        <p>
          NFC Data: <strong>{nfcData}</strong>
        </p>
      </div>
    </div>
  );
};

export default barcodeNFCtest;
