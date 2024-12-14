'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, CheckCircle, AlertCircle, RefreshCw, ChevronRight, Zap, BarChart2, Maximize2, Activity, Globe, ZoomIn, Contrast, Image as ImageIcon, Share2 } from 'lucide-react'
import axiosInstance from './services/authService'

const medicalFilters = [
  { name: 'Original', filter: 'none' },
  { name: 'X-Ray', filter: 'saturate(0) contrast(1.75) brightness(1.2) invert(1)' },
  { name: 'Thermal', filter: 'hue-rotate(180deg) saturate(200%) brightness(80%)' }
]

const languages = {
  en: {
    title: 'Advanced Medical Image Analysis System',
    subtitle: 'Upload a medical image for AI-powered diagnosis and insights',
    dropzoneText: 'Drag & drop a medical image here, or click to select',
    supportedFormats: 'Supported formats: DICOM, JPG, PNG',
    analyzeButton: 'Analyze Image',
    analyzingText: 'Analyzing',
    resultsTitle: 'Analysis Results',
    diagnosisLabel: 'Diagnosis',
    tumorSizeLabel: 'Tumor Size',
    confidenceLabel: 'Confidence',
    severityLabel: 'Severity',
    retryButton: 'Analyze Another Image',
    zoomLabel: 'Zoom',
    contrastLabel: 'Adjust Contrast',
    compareLabel: 'Compare Images',
    shareLabel: 'Share Results',
    languageLabel: 'Language',
  },
  es: {
    title: 'Sistema Avanzado de Análisis de Imágenes Médicas',
    subtitle: 'Sube una imagen médica para obtener diagnóstico e información con IA',
    dropzoneText: 'Arrastra y suelta una imagen médica aquí, o haz clic para seleccionar',
    supportedFormats: 'Formatos soportados: DICOM, JPG, PNG',
    analyzeButton: 'Analizar Imagen',
    analyzingText: 'Analizando',
    resultsTitle: 'Resultados del Análisis',
    diagnosisLabel: 'Diagnóstico',
    tumorSizeLabel: 'Tamaño del Tumor',
    confidenceLabel: 'Confianza',
    severityLabel: 'Severidad',
    retryButton: 'Analizar Otra Imagen',
    zoomLabel: 'Zoom',
    contrastLabel: 'Ajustar Contraste',
    compareLabel: 'Comparar Imágenes',
    shareLabel: 'Compartir Resultados',
    languageLabel: 'Idioma',
  }
}

export default function AdvancedMedicalImageAnalysis() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewUrls, setPreviewUrls] = useState([])
  const [language, setLanguage] = useState('en')
  const [zoom, setZoom] = useState(1)
  const [contrast, setContrast] = useState(100)
  const [compareMode, setCompareMode] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState(0)

  const t = languages[language]

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0])
    setResult(null)
    const urls = medicalFilters.map(() => URL.createObjectURL(acceptedFiles[0]))
    setPreviewUrls(urls)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  })

  useEffect(() => {
    return () => previewUrls.forEach(URL.revokeObjectURL)
  }, [previewUrls])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    setUploading(true)
    setUploadProgress(0)

    try {
      const response = await axiosInstance.post('/predict/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(percentCompleted)
        },
      })
      
      const formattedResult = {
        prediction: response.data.prediction,
        confidence: response.data.confidence,
        tumor_characteristics: response.data.tumor_characteristics
      }
      
      setResult(formattedResult)
    } catch (error) {
      console.error("Error uploading image:", error)
      setResult({ 
        error: error.response?.data?.error || "Failed to process image. Please try again later." 
      })
    } finally {
      setUploading(false)
    }
  }

  const handleRetry = () => {
    setFile(null)
    setResult(null)
    setUploadProgress(0)
    setPreviewUrls([])
    setZoom(1)
    setContrast(100)
    setCompareMode(false)
    setSelectedFilter(0)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Medical Image Analysis Results',
        text: 'Check out my medical image analysis results!',
        url: window.location.href,
      })
    } else {
      alert('Sharing is not supported on this device.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-blue-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800">{t.title}</h1>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-blue-100 text-blue-800 rounded-md px-2 py-1"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <p className="text-xl text-blue-600 text-center mb-8">{t.subtitle}</p>
          
          <AnimatePresence mode="wait">
            {!file && (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-blue-400 rounded-2xl p-8 text-center cursor-pointer transition-all hover:bg-blue-50"
                >
                  <input {...getInputProps()} />
                  <Upload className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                  <p className="text-lg font-medium text-blue-800">{t.dropzoneText}</p>
                  <p className="text-sm text-blue-600 mt-2">{t.supportedFormats}</p>
                </div>
              </motion.div>
            )}

            {file && !result && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 relative">
                    <img
                      src={previewUrls[selectedFilter]}
                      alt="Medical image preview"
                      className="w-full h-auto rounded-lg shadow-lg"
                      style={{
                        transform: `scale(${zoom})`,
                        filter: `contrast(${contrast}%) ${medicalFilters[selectedFilter].filter}`,
                        transition: 'transform 0.3s ease-out, filter 0.3s ease-out'
                      }}
                    />
                    {compareMode && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1/2 h-full overflow-hidden">
                          <img
                            src={previewUrls[0]}
                            alt="Original medical image"
                            className="w-full h-full object-cover"
                            style={{
                              transform: `scale(${zoom})`,
                              filter: `contrast(${contrast}%)`,
                              transition: 'transform 0.3s ease-out, filter 0.3s ease-out'
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="zoom" className="text-blue-800 font-medium">{t.zoomLabel}</label>
                      <input
                        type="range"
                        id="zoom"
                        min="1"
                        max="3"
                        step="0.1"
                        value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="w-2/3"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="contrast" className="text-blue-800 font-medium">{t.contrastLabel}</label>
                      <input
                        type="range"
                        id="contrast"
                        min="50"
                        max="150"
                        value={contrast}
                        onChange={(e) => setContrast(parseInt(e.target.value))}
                        className="w-2/3"
                      />
                    </div>
                    <div>
                      <button
                        onClick={() => setCompareMode(!compareMode)}
                        className="w-full px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors flex items-center justify-center"
                      >
                        <ImageIcon className="w-5 h-5 mr-2" />
                        {t.compareLabel}
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {medicalFilters.map((filter, index) => (
                        <button
                          key={filter.name}
                          onClick={() => setSelectedFilter(index)}
                          className={`px-2 py-1 rounded-md text-sm ${
                            selectedFilter === index ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }`}
                        >
                          {filter.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <span className="mr-2">{t.analyzingText}</span>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <RefreshCw className="w-5 h-5" />
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <span className="mr-2">{t.analyzeButton}</span>
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 border border-blue-200">
                  <h3 className="text-2xl font-bold mb-4 text-blue-800">{t.resultsTitle}</h3>
                  {result.error ? (
                    <div className="flex flex-col items-center text-red-500">
                      <AlertCircle className="w-12 h-12 mb-2" />
                      <p className="text-center mb-4">{result.error}</p>
                      <button
                        onClick={handleRetry}
                        className="px-4 py-2 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors flex items-center"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        {t.retryButton}
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
                        <Activity className="w-8 h-8 text-blue-500 mb-2" />
                        <h4 className="text-lg font-semibold mb-1 text-blue-800">{t.diagnosisLabel}</h4>
                        <p className="text-xl font-bold text-blue-600">{result.prediction}</p>
                      </div>
                      
                      {result.tumor_characteristics && (
                        <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
                          <Maximize2 className="w-8 h-8 text-blue-500 mb-2" />
                          <h4 className="text-lg font-semibold mb-1 text-blue-800">{t.tumorSizeLabel}</h4>
                          <p className="text-xl font-bold text-blue-600">
                            {result.tumor_characteristics.size_mm2} mm²
                          </p>
                        </div>
                      )}
                      
                      <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
                        <BarChart2 className="w-8 h-8 text-blue-500 mb-2" />
                        <h4 className="text-lg font-semibold mb-1 text-blue-800">{t.confidenceLabel}</h4>
                        <p className="text-xl font-bold text-blue-600">{result.confidence}</p>
                      </div>
                      
                      {result.tumor_characteristics && (
                        <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
                          <Zap className="w-8 h-8 text-blue-500 mb-2" />
                          <h4 className="text-lg font-semibold mb-1 text-blue-800">Circularity</h4>
                          <p className="text-xl font-bold text-blue-600">
                            {result.tumor_characteristics.circularity}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {result.tumor_characteristics && (
                  <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 border border-blue-200">
                    <h4 className="text-xl font-bold mb-4 text-blue-800">Additional Measurements</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-blue-800">Perimeter: {result.tumor_characteristics.perimeter_mm} mm</p>
                        <p className="text-blue-800">Width: {result.tumor_characteristics.dimensions_mm.width} mm</p>
                        <p className="text-blue-800">Height: {result.tumor_characteristics.dimensions_mm.height} mm</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleRetry}
                    className="px-6 py-3 bg-blue-100 text-blue-800 rounded-full font-medium hover:bg-blue-200 transition-colors"
                  >
                    {t.retryButton}
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-6 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors flex items-center"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    {t.shareLabel}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}