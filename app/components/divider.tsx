const Divider = ({ height }: { height: string }) => {
  return (
    <hr className={`w-full border-0 bg-gray-300`} style={{ height: height }} />
  )
}
export default Divider
