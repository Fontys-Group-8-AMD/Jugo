import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { mockAnalysisResult } from "../data/mockAnalysisResult";
import type {
  AnalysisResult,
  ResultsNavigationState,
} from "../types/analysisResult";
import { analyzeImage } from "../api/analyzeApi";

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg"];

export const useAnalyzeUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const previewUrl = useMemo(() => {
    if (!selectedFile) return "";
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

  const getFileValidationError = (file: File): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return "Only PNG, JPG, and JPEG files are allowed.";
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return "File size must be 10MB or less.";
    }

    return null;
  };

  const validateAndSetFile = (file: File | null) => {
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
    validateAndSetFile(file);
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
    validateAndSetFile(file);
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

      const analysisResult: AnalysisResult = {
        uploadedImageUrl: previewUrl,
        status: predictionResult.label_name,
        score: Math.round(
          (predictionResult.label_name === "compliant"
            ? predictionResult.probability_compliant
            : predictionResult.probability_non_compliant) * 100,
        ),
        scenarioChecks: [],
        issues:
          predictionResult.label_name === "non-compliant"
            ? [
                {
                  message:
                    "The uploaded dashboard appears to be non-compliant.",
                  severity: "high",
                },
              ]
            : [],
        suggestions:
          predictionResult.label_name === "non-compliant"
            ? ["Review the dashboard against the IBCS compliance rules."]
            : [
                "The dashboard appears compliant based on the model prediction.",
              ],
      };

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
