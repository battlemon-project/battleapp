interface LoadMoreProps {
  loadMore?: (...args: any) => any
}

export default function LoadMore({ loadMore }: LoadMoreProps) {

  const handleOnClick = () => {
    loadMore?.()
  }
  
  return (<>
    <button className="btn px-2 btn-default w-100 fs-15 mb-2" onClick={handleOnClick}>
      Load More &nbsp; 
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
      </svg>
    </button>
  </>)
}