import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
} from "@mui/material";
import { notify } from "./CustomToaster";
import DecodeCard from "./DecodeCard";

function DecodePage() {
  const [file, setFile] = useState(null);
  const [decodedData, setDecodedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [associationLoading, setAssociationLoading] = useState(false);
  const [associationCount, setAssociationCount] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); 
  const [modalMaxOpen, setModalMaxOpen] = useState(false); 
  const [maxLoading, setMaxLoading] = useState(false);
  const [maxCount, setMaxCount] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("RawPcapReader");
  const [hasDecoded, setHasDecoded] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDecodedData([]);
    setAssociationCount(null);
    setHasDecoded(false);
  };

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
    setDecodedData([]);
    setAssociationCount(null);
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
        response = await axios.post(
          "http://localhost:7000/upload-and-decode-new",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else if (selectedMethod === "SimplifiedDecode") {
        if (!hasDecoded) {
          setHasDecoded(true);
          response = await axios.post(
            "http://localhost:7000/simplified-decode",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
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

  const fetchAssociationCount = async () => {
    if (!file) {
      notify("Please select a file first.");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension !== "pcap") {
      notify("File must be a pcap file.");
      return;
    }

    setAssociationLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:7000/association-count",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setAssociationCount(response.data.association_requests);
      setModalOpen(true); // Open the modal after fetching
    } catch (err) {
      notify("Failed to fetch association count. Please try again.");
    } finally {
      setAssociationLoading(false);
    }
  };

  const fetchMaxCount = async () => {
    if (!file) {
      notify("Please select a file first.");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension !== "pcap") {
      notify("File must be a pcap file.");
      return;
    }

    setMaxLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:7000/max-association-requests",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMaxCount(response.data.max_association_requests);
      setModalMaxOpen(true); 
    } catch (err) {
      notify("Failed to fetch max associations in a second. Please try again.");
    } finally {
      setMaxLoading(false);
    }
  };


  return (
    <div className="container-fluid">
      <div className="row">
        {/* Upload Section */}
        <div
          className="col-lg-5 col-md-12 d-flex flex-column align-items-center justify-content-center p-4 pt-5"
          style={{ height: "80vh" }}
        >
          <div className="w-75">
            <label className="form-label fw-bold ms-2 text-secondary mt-4">
              Add a file to decode:
            </label>
          </div>
          <input
            className="form-control mb-3 w-75 py-3 fw-bold"
            type="file"
            onChange={handleFileChange}
          />
          <div className="mb-3 w-75">
            <label className="form-label fw-bold ms-2 text-secondary">
              Decoding Method:
            </label>
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

          <div className="d-flex flex-column ">
            <button
              variant="outlined"
              color="primary"
              className="mt-2 btn btn-outline-primary border-2 fw-bold"
              onClick={handleUpload}
            >
              Upload and Decode
            </button>

            <button
              variant="outlined"
              color="secondary"
              className="mt-3 btn btn-outline-secondary border-2 fw-bold"
              onClick={fetchAssociationCount}
              disabled={associationLoading}
            >
              {associationLoading ? "Fetching..." : "Get Association Count"}
            </button>

            <button
              variant="outlined"
              color="secondary"
              className="mt-3 btn btn-outline-secondary border-2 fw-bold"
              onClick={fetchMaxCount}
              disabled={maxLoading}
            >
              {maxLoading ? "Fetching..." : "Get max associations"}
            </button>
          </div>
        </div>

        {/* Result Section */}
        <div className="col-lg-7 col-md-12 p-4">
          <Typography
            variant="h4"
            className="mb-2 small fw-bold text-primary text-center fs-3"
          >
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
                <TableContainer
                  component={Paper}
                  className="mt-0 rounded-3 align-self-start w-100"
                >
                  <Table className="">
                    <TableHead className="w-100">
                      <TableRow className="w-100">
                        <TableCell className="fw-bold text-dark">
                          Index
                        </TableCell>
                        <TableCell className="fw-bold text-dark">
                          Details
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {decodedData.map((line, index) => (
                        <TableRow className="w-100" key={index}>
                          <TableCell className="fw-bold text-dark">
                            {index + 1}
                          </TableCell>
                          <TableCell className="fw-bold text-dark">
                            {line}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )
            ) : (
              <Typography className="text-center text-secondary fw-bold">
                No Data Decoded,
                <br />
                Your Decoded Data Will Appear Here
              </Typography>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Association Count */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="association-modal-title"
        aria-describedby="association-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            border: "2px solid #000",
            boxShadow: 24,
            backgroundColor: "#212529",
            p: 4,
            color: "white",
            borderRadius: "20px",
          }}
        >
          <Typography
            id="association-modal-title"
            variant="h6"
            component="h2"
            className="fs-3 fw-bold text-center text-warning"
          >
            Association Count
          </Typography>
            <div className="w-100 d-flex justify-content-center fs-2 mt-4">
              <span className="bg-secondary px-3 py-1 rounded-4 fw-bold">{associationCount ?? "N/A"}</span>
            </div>
        </Box>
      </Modal>


      {/* Modal for max Association Count in a sec*/}
        <Modal
        open={modalMaxOpen}
        onClose={() => setModalMaxOpen(false)}
        aria-labelledby="association-modal-title"
        aria-describedby="association-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            border: "2px solid #000",
            boxShadow: 24,
            backgroundColor: "#212529",
            p: 4,
            color: "white",
            borderRadius: "20px",
          }}
        >
          <Typography
            id="association-modal-title"
            variant="h6"
            component="h2"
            className="fs-3 fw-bold text-center text-warning"
          >
           Max Associations <br/> in one second
          </Typography>
            <div className="w-100 d-flex justify-content-center fs-2 mt-4">
              <span className="bg-secondary px-5 py-1 rounded-4 fw-bold">{maxCount ?? "N/A"}</span>
            </div>
        </Box>
      </Modal>
    </div>
  );
}

export default DecodePage;
