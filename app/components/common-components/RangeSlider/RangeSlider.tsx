import { Range } from "react-range"

const RangeSlider = ({
  min = 10,
  max = 50,
  minValue = 40,
  maxValue = 70,
  onChange = () => {},
}: any) => {
  const handleChange = (e: any) => {
    onChange(e)
  }

  return (
    <Range
      step={1}
      min={min}
      max={max}
      values={[minValue, maxValue]}
      onChange={handleChange}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
          }}
          className="h-1 w-full bg-gray-300"
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
          }}
        >
          <div className="h-5 w-5 rounded-full bg-primary" />
          <span
            className="absolute text-xs text-gray-500"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {props["aria-valuenow"]}
          </span>
        </div>
      )}
    />
  )
}

export default RangeSlider
