import { useRef, useState } from "react";
import AnalyzeActions from "../components/analyze/AnalyzeActions";
import AnalyzeHeader from "../components/analyze/AnalyzeHeader";
import RuleInfoCard from "../components/analyze/RuleInfoCard";
import UploadZone from "../components/analyze/UploadZone";

const AnalyzePage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    setSelectedFile(file);
    setErrorMessage("");
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
