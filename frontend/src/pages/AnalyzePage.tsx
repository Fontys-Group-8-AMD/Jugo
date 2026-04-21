import AnalyzeActions from "../components/analyze/AnalyzeActions";
import AnalyzeHeader from "../components/analyze/AnalyzeHeader";
import RuleInfoCard from "../components/analyze/RuleInfoCard";
import UploadZone from "../components/analyze/UploadZone";
import { useAnalyzeUpload } from "../hooks/useAnalyzeUpload";

const AnalyzePage = () => {
  const {
    selectedFile,
    previewUrl,
    errorMessage,
    isDragActive,
    isAnalyzing,
    fileInputRef,
    handleOpenFilePicker,
    handleFileChange,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveFile,
    handleAnalyzeClick,
  } = useAnalyzeUpload();

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
              previewUrl={previewUrl}
              errorMessage={errorMessage}
              isDragActive={isDragActive}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onRemoveFile={handleRemoveFile}
            />

            <AnalyzeActions
              onUploadClick={handleOpenFilePicker}
              onAnalyzeClick={handleAnalyzeClick}
              isAnalyzeDisabled={!selectedFile || isAnalyzing}
              isAnalyzing={isAnalyzing}
            />
          </div>

          <RuleInfoCard />
        </div>
      </div>
    </section>
  );
};

export default AnalyzePage;
