import React, { useState } from "react";
import axios from "axios";
import { Modal, Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { notify } from "./CustomToaster";

function DecodePage() {
    const [file, setFile] = useState(null);
    const [decodedData, setDecodedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openNewMethodModal, setOpenNewMethodModal] = useState(false); // New modal state for the new method

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            notify("Please select a file to upload.");
            return;
        }

        setLoading(true);
        setOpenModal(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:7000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setDecodedData(response.data.decoded_data);
        } catch (err) {
            notify("Failed to upload and decode the file. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleUploadNew = async () => {
        if (!file) {
            notify("Please select a file to upload.");
            return;
        }

        setLoading(true);
        setOpenNewMethodModal(true); // Open the new method modal

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:7000/upload-and-decode-new", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setDecodedData(response.data.decoded_data);
        } catch (err) {
            notify("Failed to upload and decode the file with the new method. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setDecodedData([]);
    };

    const handleCloseNewMethodModal = () => {
        setOpenNewMethodModal(false);
        setDecodedData([]);
    };

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <div
                className="w-100 d-flex justify-content-center align-items-center flex-column gap-2"
                style={{ padding: "20px" }}
            >
                <h3 className="fs-4 fw-bold">Add a PCAP File to Decode</h3>
                <input
                    className="d-block form-control w-25 py-2 fw-bold"
                    type="file"
                    onChange={handleFileChange}
                />
                <button
                    className="btn btn-outline-primary fw-bold border-2 mt-3"
                    onClick={handleUpload}
                >
                    Upload and Decode (RawPcapReader)
                </button>
                {/* Button for the new decoding method */}
                <button
                    className="btn btn-outline-success fw-bold border-2 mt-3"
                    onClick={handleUploadNew}
                >
                    Upload and Decode (PcapReader)
                </button>
            </div>

            {/* Modal for displaying results of the old method */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="upload-modal-title"
                aria-describedby="upload-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        maxHeight: "80vh",
                        overflowY: "auto",
                        width: '70%',
                        bgcolor: "background.paper",
                        backgroundColor: "#1E1E1E",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 7,
                    }}
                >
                    <Typography id="upload-modal-title" variant="h6" component="h1" className="text-center text-warning fs-3 fw-bold mb-3">
                        Decoded File (RawPcapReader)
                    </Typography>
                    {loading ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                mt: 2,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : decodedData.length > 0 ? (
                        <TableContainer component={Paper} className="rounded-4">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="fw-bold text-dark">Index</TableCell>
                                        <TableCell className="fw-bold text-dark">Details</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {decodedData.map((line, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="fw-bold text-dark">{index + 1}</TableCell>
                                            <TableCell className="fw-bold text-dark">{line}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography className="text-light text-center">No data decoded.</Typography>
                    )}
                </Box>
            </Modal>

            {/* Modal for displaying results of the new decoding method */}
            <Modal
                open={openNewMethodModal}
                onClose={handleCloseNewMethodModal}
                aria-labelledby="new-method-modal-title"
                aria-describedby="new-method-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        maxHeight: "80vh",
                        overflowY: "auto",
                        width: '70%',
                        bgcolor: "background.paper",
                        backgroundColor: "#1E1E1E",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 7,
                    }}
                >
                    <Typography id="new-method-modal-title" variant="h6" component="h1" className="text-center text-warning fs-3 fw-bold mb-3">
                        Decoded File (PcapReader)
                    </Typography>
                    {loading ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                mt: 2,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : decodedData.length > 0 ? (
                        <TableContainer component={Paper} className="rounded-4">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="fw-bold text-dark">Index</TableCell>
                                        <TableCell className="fw-bold text-dark">Details</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {decodedData.map((line, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="fw-bold text-dark">{index + 1}</TableCell>
                                            <TableCell className="fw-bold text-dark">{line}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography className="text-light text-center">No data decoded.</Typography>
                    )}
                </Box>
            </Modal>
        </div>
    );
}

export default DecodePage;
