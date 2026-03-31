import { useRef, useState } from "react";
import AnalyzeActions from "../components/analyze/AnalyzeActions";
import AnalyzeHeader from "../components/analyze/AnalyzeHeader";
import RuleInfoCard from "../components/analyze/RuleInfoCard";
import UploadZone from "../components/analyze/UploadZone";

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg"];

const AnalyzePage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setSelectedFile(null);
      setErrorMessage("Only PNG, JPG, and JPEG files are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setSelectedFile(null);
      setErrorMessage("File size must be 10MB or less.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    setErrorMessage("");
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setErrorMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyzeClick = () => {
    console.log("Analyze file:", selectedFile);
  };

  return (
    <section className="bg-[var(--color-background)] px-6 py-14 md:py-16">
      <div className="mx-auto max-w-7xl">
        <AnalyzeHeader />

        <div className="grid gap-10 xl:grid-cols-[1.55fr_1fr] xl:items-start">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              className="hidden"
              onChange={handleFileChange}
            />

            <UploadZone
              selectedFile={selectedFile}
              errorMessage={errorMessage}
              onRemoveFile={handleRemoveFile}
            />

            <AnalyzeActions
              onUploadClick={handleOpenFilePicker}
              onAnalyzeClick={handleAnalyzeClick}
              isAnalyzeDisabled={!selectedFile}
            />
          </div>

          <RuleInfoCard />
        </div>
      </div>
    </section>
  );
};

export default AnalyzePage;
