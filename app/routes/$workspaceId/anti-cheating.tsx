/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef, useState } from "react"

import {
  detectAllFaces,
  draw,
  loadFaceLandmarkTinyModel,
  loadSsdMobilenetv1Model,
  loadTinyFaceDetectorModel,
  matchDimensions,
  resizeResults,
  TinyFaceDetectorOptions,
  euclideanDistance,
  detectSingleFace,
  loadFaceRecognitionModel,
} from "face-api.js"

const AntiCheating = () => {
  const [video, setVideo] = useState<any>(null)
  const [canvas, setCanvas] = useState<any>(null)
  const [detected, setDetected] = useState(false)
  const [faceNo, setFaceNo] = useState(0)
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
    new TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.2 })

  const makeRecognition = () => {
    let ctx: any

    const init = async () => {
      setLoading(true)
      await loadTinyFaceDetectorModel(`models`)
      await loadSsdMobilenetv1Model(`models`)
      await loadFaceLandmarkTinyModel(`models`)
      await loadFaceRecognitionModel(`models`)
      ctx = canvas && canvas.getContext("2d")
    }
    const start = async () => {
      await wait(0)
      if (video.readyState === 4) {
        const faces = await detectAllFaces(
          video,
          getFaceDetectorOptions()
        ).withFaceLandmarks(true)
        setLoading(false)
        // console.log("Faces", faces)
        if (faces) {
          setFaceNo(faces.length)
          setDetected(true)
          const dims = matchDimensions(canvas, video, true)
          const resizedResults = resizeResults(faces, dims)
          if (true) {
            draw.drawDetections(canvas, resizedResults)
          }
        } else {
          setDetected(false)
          ctx.clearRect(0, 0, video.videoWidth, video.videoHeight)
        }
      }
      start()
    }

    const recognise = async () => {
      // Load the images to be compared
      const img1Element = new Image()
      img1Element.src = img

      // const img1Element = document.getElementById("img1")
      // const img2Element = document.getElementById("img2")
      console.log(1)

      // Detect and extract faces from the images
      const face1 = await detectSingleFace(img1Element)
        .withFaceLandmarks(true)
        .withFaceDescriptor()
      const face2 = await detectSingleFace(video, getFaceDetectorOptions())
        .withFaceLandmarks(true)
        .withFaceDescriptor()
      console.log(2, face1, face2)

      // Compute the face descriptor distances
      const distance =
        face1 && face2
          ? euclideanDistance(face1.descriptor, face2.descriptor)
          : 0
      console.log(3)

      // Check if the faces are similar based on a threshold distance
      const threshold = 0.8
      const isSimilar = distance < threshold
      console.log(isSimilar, threshold)

      setRec(isSimilar ? "similar" : "not similar")
    }

    return { init, start, recognise }
  }
  const wait = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time))

  const launchCamera = () =>
    new Promise((resolve) => {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            width: { max: 120, min: 120 },
            height: { max: 80, min: 80 },
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

  const [img, setImg] = useState("")
  const [rec, setRec] = useState("")

  const getSnapshot = (recg = false) => {
    // Get the canvas context
    const ctx = canvas.getContext("2d")

    // Draw the current frame of the video onto the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Get the data URL of the canvas image
    const dataUrl = canvas.toDataURL()

    // // Create an image element with the captured image
    // const image = new Image()
    // image.src = dataUrl
    // console.log(dataUrl)
    if (!recg) setImg(dataUrl)
    else return dataUrl
  }
  const recgFace = async () => {
    const recognition = makeRecognition()

    await recognition.recognise()
  }

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
      <button
        style={{
          padding: 20,
          fontSize: 14,
        }}
        onClick={() => {
          getSnapshot()
        }}
      >
        Snap
      </button>
      <button
        style={{
          padding: 20,
          fontSize: 14,
        }}
        onClick={() => {
          recgFace()
        }}
      >
        Recg
      </button>
      <div style={{ position: "relative" }}>
        <video
          style={{ position: "absolute", top: 70, left: 10 }}
          ref={videoRef}
        ></video>
        <canvas
          style={{ position: "absolute", top: 70, left: 10 }}
          ref={canvasRef}
        />
      </div>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 10,
            width: 180,
            height: 120,
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
      {<h2>Face No : {faceNo}</h2>}
      {<h2>Recg : {rec}</h2>}
      <img
        src={img}
        style={{ position: "absolute", top: 70, right: 10 }}
        alt="ok"
      />
    </div>
  )
}

export default AntiCheating
