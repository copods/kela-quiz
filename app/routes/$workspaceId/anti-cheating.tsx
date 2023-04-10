/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef, useState } from "react"

import {
  detectSingleFace,
  draw,
  loadFaceLandmarkTinyModel,
  loadSsdMobilenetv1Model,
  loadTinyFaceDetectorModel,
  matchDimensions,
  resizeResults,
  TinyFaceDetectorOptions,
} from "face-api.js"

const AntiCheating = () => {
  const [video, setVideo] = useState<any>(null)
  const [canvas, setCanvas] = useState<any>(null)
  const [detected, setDetected] = useState(false)
  const [camera, setCamera] = useState(false)
  const [loading, setLoading] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      setVideo(videoRef.current)
      setCanvas(canvasRef.current)
    }
  }, [])

  const start = async () => {
    await launchCamera()
    const recognition = makeRecognition()
    await recognition.init()
    await recognition.start()
  }

  const getFaceDetectorOptions = () =>
    new TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })

  const makeRecognition = () => {
    let ctx: any

    const init = async () => {
      setLoading(true)
      await loadTinyFaceDetectorModel(
        `/public/models/tiny_face_detector_model-shard1`
      )
      await loadSsdMobilenetv1Model(
        "/public/models/ssd_mobilenetv1_model-shard1"
      )
      await loadFaceLandmarkTinyModel(
        "/public/models/face_landmark_68_tiny_model-shard1"
      )
      ctx = canvas && canvas.getContext("2d")
      console.log("hello ctx")
    }
    const start = async () => {
      console.log("helloooo")
      await wait(0)
      console.log("ready", video)
      if (video.readyState === 4) {
        const faces = await detectSingleFace(
          video,
          getFaceDetectorOptions()
        ).withFaceLandmarks(true)
        setLoading(false)
        console.log("Faces", faces)
        if (faces) {
          setDetected(true)
          const dims = matchDimensions(canvas, video, true)
          const resizedResults = resizeResults(faces, dims)
          if (true) {
            draw.drawDetections(canvas, resizedResults)
          }
          if (true) {
            draw.drawFaceLandmarks(canvas, resizedResults)
          }
        } else {
          setDetected(false)
          ctx.clearRect(0, 0, video.videoWidth, video.videoHeight)
        }
      }
      start()
    }

    return { init, start }
  }
  const wait = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time))

  const launchCamera = () =>
    new Promise((resolve) => {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            width: { max: 320, min: 320 },
            height: { max: 240, min: 240 },
          },
        })
        .then(
          (stream) => {
            video.srcObject = stream
            video?.play()
            setCamera(true)
            resolve(1)
          },
          () => {}
        )
        .catch((error) => {
          console.log(error)
        })
    })

  return (
    <div>
      {!camera && (
        <button
          style={{
            padding: 20,
            fontSize: 14,
          }}
          onClick={() => {
            start()
          }}
        >
          Launch Camera
        </button>
      )}
      <video
        style={{ position: "absolute", top: 70, left: 10 }}
        ref={videoRef}
      ></video>
      <canvas
        style={{ position: "absolute", top: 70, left: 10 }}
        ref={canvasRef}
      />
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 10,
            width: 320,
            height: 240,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading
        </div>
      )}
      {camera && <h2>Face Detected : {detected ? "True" : "False"}</h2>}
    </div>
  )
}

export default AntiCheating
