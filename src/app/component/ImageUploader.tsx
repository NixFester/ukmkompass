import React, { useRef } from "react";

export interface IImageUploaderProps {
  handleSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
  res: Record<string, any>;
  loading: boolean;
}

function ImageUploader(props: IImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Programmatically trigger the file input click
  };

  return (
    <div className="App">
      <input
        id="file"
        type="file"
        onChange={props.handleSelectFile}
        multiple={false}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      <button
        type="button"
        onClick={handleButtonClick}
        className=" text-white bg-teal-500 p-3 rounded-lg"
      >
        Cari Gambar
      </button>
      {props.file && (
        <div>
          <h3>Detail Gambar:</h3>
          <p>Nama: {props.file.name}</p>
          <p>Tipe: {props.file.type}</p>
          <p>Ukuran: {(props.file.size / 1024).toFixed(2)} KB</p>
          <img src={URL.createObjectURL(props.file)} alt="file" />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
