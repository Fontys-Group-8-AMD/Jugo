import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeImage } from "../api/analyzeApi";
import { mapPredictionToAnalysisResult } from "../mappers/analysisResultMapper";
import type { ResultsNavigationState } from "../types/analysisResult";
import { getFileValidationError } from "../utils/fileValidation";
import { useDragAndDrop } from "./useDragAndDrop";
import { useFilePreview } from "./useFilePreview";

const DEFAULT_ANALYSIS_ERROR = "Something went wrong during analysis.";

export const useAnalyzeUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const previewUrl = useFilePreview(selectedFile);

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const setValidatedFile = (file: File | null) => {
    if (!file) {
      return;
    }

    const validationError = getFileValidationError(file);

    if (validationError) {
      setSelectedFile(null);
      setErrorMessage(validationError);
      return;
    }

    setSelectedFile(file);
    setErrorMessage("");
  };

  const {
    isDragActive,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    resetDragState,
  } = useDragAndDrop({
    onDropFile: setValidatedFile,
  });

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setValidatedFile(file);
    resetFileInput();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setErrorMessage("");
    resetDragState();
    resetFileInput();
  };

  const handleAnalyzeClick = async () => {
    if (!selectedFile || !previewUrl || isAnalyzing) {
      return;
    }

    try {
      setIsAnalyzing(true);
      setErrorMessage("");

      const predictionResult = await analyzeImage(selectedFile);
      const analysisResult = mapPredictionToAnalysisResult(
        predictionResult,
        previewUrl,
      );

      const navigationState: ResultsNavigationState = {
        uploadedImageUrl: previewUrl,
        analysisResult,
      };

      navigate("/results", { state: navigationState });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : DEFAULT_ANALYSIS_ERROR;

      setErrorMessage(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
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
  };
};
