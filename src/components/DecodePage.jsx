import React, { useState } from "react";
import axios from "axios";
import { Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { notify } from "./CustomToaster";
import DecodeCard from "./DecodeCard"; 

function DecodePage() {
    const [file, setFile] = useState(null);
    const [decodedData, setDecodedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState("RawPcapReader");
    const [hasDecoded, setHasDecoded] = useState(false); 

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setDecodedData([]); 
        setHasDecoded(false); 
    };

    const handleMethodChange = (e) => {
        setSelectedMethod(e.target.value);
        setDecodedData([]); 
        setHasDecoded(false);
    };

    const handleUpload = async () => {
        if (!file) {
            notify("Please select a file to upload.");
            setDecodedData([]);
            return;
        }

        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (fileExtension !== "pcap") {
            notify("File must be a pcap file.");
            setDecodedData([]); 
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            let response;
            if (selectedMethod === "RawPcapReader") {
                response = await axios.post("http://localhost:7000/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else if (selectedMethod === "PcapReader") {
                response = await axios.post("http://localhost:7000/upload-and-decode-new", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else if (selectedMethod === "SimplifiedDecode") {
                if (!hasDecoded) {
                    setHasDecoded(true); 
                    response = await axios.post("http://localhost:7000/simplified-decode", formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                }
            }

            setDecodedData(response.data.decoded_data);
        } catch (err) {
            notify("Failed to upload and decode the file. Please try again.");
            setDecodedData([]); 
            setHasDecoded(false); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">

                {/* Upload Section */}
                <div className="col-lg-5 col-md-12 d-flex flex-column align-items-center justify-content-center p-4 pt-5" style={{ height: "80vh" }}>
                    <div className="w-75 mt-5">
                        <label className="form-label fw-bold ms-2 text-secondary">Add a file to decode:</label>
                    </div>
                    <input
                        className="form-control mb-3 w-75 py-3 fw-bold"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <div className="mb-3 w-75">
                        <label className="form-label fw-bold ms-2 text-secondary">Decoding Method:</label>
                        <select
                            className="form-select py-3 fw-bold"
                            value={selectedMethod}
                            onChange={handleMethodChange}
                        >
                            <option value="RawPcapReader">RawPcapReader</option>
                            <option value="PcapReader">PcapReader</option>
                            <option value="SimplifiedDecode">SimplifiedReader</option>
                        </select>
                    </div>
                    <button
                        variant="outlined"
                        color="primary"
                        className="mt-2 btn btn-outline-primary border-2 fw-bold"
                        onClick={handleUpload}
                    >
                        Upload and Decode
                    </button>
                </div>


                {/* Result Section */}
                <div className="col-lg-7 col-md-12 p-4">
                    <Typography variant="h4" className="mb-2 small fw-bold text-primary text-center fs-3">
                        Decoded File:
                    </Typography>
                    <div
                        className="border rounded-4 border-2 border-dark d-flex justify-content-center align-items-center"
                        style={{
                            height: "70vh",
                            overflow: "auto",
                            padding: "10px",
                            backgroundColor: "#f9f9f9",
                        }}
                    >
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <CircularProgress />
                            </div>
                        ) : decodedData.length > 0 ? (
                            selectedMethod === "SimplifiedDecode" ? (
                                <div className="d-flex flex-column gap-0 w-100 align-self-start px-0">
                                    {decodedData.map((packet, index) => (
                                        <DecodeCard
                                            key={index}
                                            index={index + 1}
                                            ToDS={packet.ToDS}
                                            MF={packet.MF}
                                            WEP={packet.WEP}
                                            srcMAC={packet.src_MAC}
                                            destMAC={packet.dest_MAC}
                                            BSSID={packet.BSSID}
                                            durationID={packet.Duration_ID}
                                            sequenceControl={packet.Sequence_Control}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <TableContainer component={Paper} className="mt-0 rounded-3 align-self-start w-100">
                                    <Table className="">
                                        <TableHead className="w-100">
                                            <TableRow className="w-100">
                                                <TableCell className="fw-bold text-dark">Index</TableCell>
                                                <TableCell className="fw-bold text-dark">Details</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {decodedData.map((line, index) => (
                                                <TableRow className="w-100" key={index}>
                                                    <TableCell className="fw-bold text-dark">{index + 1}</TableCell>
                                                    <TableCell className="fw-bold text-dark">{line}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )
                        ) : (
                            <Typography className="text-center text-secondary fw-bold">
                                No Data Decoded,<br />Your Decoded Data Will Appear Here
                            </Typography>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DecodePage;
