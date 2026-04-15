export type PredictionResponse = {
  prediction: number;
  label_name: "compliant" | "non-compliant";
  probability_compliant: number;
  probability_non_compliant: number;
  filename?: string;
};

export const analyzeImage = async (file: File): Promise<PredictionResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = "Failed to analyze image.";

    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorMessage;
    } catch {
      //
    }

    throw new Error(errorMessage);
  }

  return response.json();
};
