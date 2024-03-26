import { Range, getTrackBackground } from "react-range"

const RangeSlider = ({
  min = 10,
  max = 50,
  minValue = 40,
  maxValue = 70,
  onChange = () => { },
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
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: '36px',
            display: 'flex',
            width: '100%'
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: '5px',
              width: '100%',
              borderRadius: '4px',
              background: getTrackBackground({
                values: [minValue, maxValue],
                colors: ['#ccc', '#353988', '#ccc'],
                min: min,
                max: max,
              }),
              alignSelf: 'center'
            }}
          >
            {children}
          </div>
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
