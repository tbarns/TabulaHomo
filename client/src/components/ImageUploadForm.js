const ImageUploadForm = ({ onFileChange }) => {
  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    onFileChange(file); // Pass the file to the parent component
  };

  return (
    <div>
      <label htmlFor="fileInput">Select File:</label>
      <input type="file" id="fileInput" onChange={handleFileInputChange} />
    </div>
  );
};

export default ImageUploadForm;
