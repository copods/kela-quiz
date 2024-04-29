const Loading = () => {
  return (
    <div className="z-80 bg-grey-200 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-opacity-50">
      <div className="rounded-lg bg-white p-5 shadow-lg">
        <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
      </div>
    </div>
  )
}
export default Loading
