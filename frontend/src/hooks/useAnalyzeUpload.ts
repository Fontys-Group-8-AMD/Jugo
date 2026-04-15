import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeImage } from "../api/analyzeApi";
import { mapPredictionToAnalysisResult } from "../mappers/analysisResultMapper";
import type { ResultsNavigationState } from "../types/analysisResult";
import { getFileValidationError } from "../utils/fileValidation";

export const useAnalyzeUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const previewUrl = useMemo(() => {
    if (!selectedFile) {
      return "";
    }

    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setValidatedFile(file);
    resetFileInput();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);

    const file = event.dataTransfer.files?.[0] ?? null;
    setValidatedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setErrorMessage("");
    setIsDragActive(false);
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
        error instanceof Error
          ? error.message
          : "Something went wrong during analysis.";

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
