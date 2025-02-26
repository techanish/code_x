import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface AnalysisResult {
  alignedSkills: string[];
  missingSkills: string[];
}

const SkillsAnalysis = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type === 'text/plain')) {
      handleFileSelect(droppedFile);
    }
  }, []);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setIsAnalyzing(true);

    // Simulate file analysis
    setTimeout(() => {
      setAnalysisResult({
        alignedSkills: [
          'Data Structures',
          'Algorithms',
          'Web Development',
          'Database Management',
          'Software Architecture',
        ],
        missingSkills: [
          'Cloud Computing',
          'DevOps',
          'Machine Learning',
          'Blockchain',
          'Cybersecurity',
        ],
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-8"
    >
      <h2 className="text-2xl font-bold mb-6">Skills Analysis</h2>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-primary bg-primary/10'
            : 'border-border hover:border-primary/50'
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-full bg-primary/10">
            {isAnalyzing ? (
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-primary" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {file ? file.name : 'Upload Curriculum'}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {file
                ? `${(file.size / 1024).toFixed(2)} KB`
                : 'Drag and drop your syllabus file or click to browse'}
            </p>
          </div>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.txt"
            onChange={handleFileInput}
          />
          <label
            htmlFor="file-upload"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Choose File
          </label>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 grid md:grid-cols-2 gap-6"
        >
          <div className="glass rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              Aligned Skills
            </h3>
            <ul className="space-y-3">
              {analysisResult.alignedSkills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              Missing Skills
            </h3>
            <ul className="space-y-3">
              {analysisResult.missingSkills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default SkillsAnalysis;