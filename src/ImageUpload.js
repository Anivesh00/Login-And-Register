import { useState } from "react";
import { toast } from "react-toastify";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (file || url) {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      } else {
        formData.append("url", url);
      }
      fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("File uploaded successfully");
          // do something with the response data
        })
        .catch((err) => {
          toast.error("Upload failed due to " + err.message);
        });
    } else {
      toast.warning("Please select a file or enter a URL");
    }
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
        <form onSubmit={handleUpload} className="container">
          <div className="card">
            <div className="card-header">
              <h2>File Upload</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  Upload a file:
                </label>
                <input
                  type="file"
                  className="form-control-file"
                  onChange={handleFileChange}
                />
              </div>
              <div className="form-group">
                <label>
                  or Enter a URL:
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={url}
                  onChange={handleUrlChange}
                />
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Upload
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageUpload;
