'use client';
import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UploadCloud, X, File, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  label?: string;
}

export function FileUpload({ onUpload, maxFiles = 1, accept = 'image/*', label }: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.slice(0, maxFiles - files.length);
    if (validFiles.length) {
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onUpload(updatedFiles);
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onUpload(updated);
  };

  return (
    <div className="w-full">
      <motion.div
        className={cn(
          'relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer',
          isDragging ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        animate={{ scale: isDragging ? 1.02 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept={accept}
          multiple={maxFiles > 1}
        />
        <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
        <h4 className="text-sm font-semibold mb-1">Click or drag file to this area to upload</h4>
        <p className="text-xs text-muted-foreground">Support for a single or bulk upload. Max {maxFiles} files.</p>
      </motion.div>

      <div className="mt-4 space-y-2">
        <AnimatePresence>
          {files.map((file, i) => (
            <motion.div
              key={`${file.name}-${i}`}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, scale: 0.9 }}
              className="flex items-center justify-between p-3 rounded-lg border bg-card"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <File className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-sm truncate">{file.name}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0" onClick={() => removeFile(i)}>
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
