"use client";

import { useState } from "react";

export default function ScanPage() {
  const [qrData, setQrData] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/booking/validate-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "x-scanner-key": process.env.NEXT_PUBLIC_SCANNER_KEY // if you have one
        },
        body: JSON.stringify({ qr_data: qrData, scanner_id: "test-web-scanner" }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error: any) {
      setResult({ status: "ERROR", error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Test Scanner</h1>
        
        <form onSubmit={handleScan} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              QR Data String (ticketCode.signature)
            </label>
            <input
              type="text"
              value={qrData}
              onChange={(e) => setQrData(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Paste QR string here"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Validating..." : "Validate Ticket"}
          </button>
        </form>

        {result && (
           <div className={`mt-6 p-4 rounded-lg font-mono text-sm ${
             result.status === 'VALID' ? 'bg-green-100 text-green-800' : 
             result.status === 'ALREADY_USED' ? 'bg-yellow-100 text-yellow-800' : 
             'bg-red-100 text-red-800'
           }`}>
             <strong>Status:</strong> {result.status}
             <pre className="mt-2 text-xs overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
           </div>
        )}
        
        <p className="mt-6 text-xs text-gray-500 text-center">
          Note: This is a manual test page. A real Camera Scanner UI will be added in the next step.
        </p>
      </div>
    </div>
  );
}
