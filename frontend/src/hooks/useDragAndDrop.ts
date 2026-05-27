import { useState } from "react";

type UseDragAndDropOptions = {
  onDropFile: (file: File | null) => void;
};

export const useDragAndDrop = ({ onDropFile }: UseDragAndDropOptions) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const preventDefaultDragBehavior = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLElement>) => {
    preventDefaultDragBehavior(event);
    setIsDragActive(true);
  };

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    preventDefaultDragBehavior(event);
    setIsDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLElement>) => {
    preventDefaultDragBehavior(event);
    setIsDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    preventDefaultDragBehavior(event);
    setIsDragActive(false);

    const file = event.dataTransfer.files?.[0] ?? null;
    onDropFile(file);
  };

  const resetDragState = () => {
    setIsDragActive(false);
  };

  return {
    isDragActive,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    resetDragState,
  };
};
