import  {useState, useEffect} from 'react'
import axios from 'axios'
function useFetch(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  
  useEffect(() => {
    if(!url) return
      axios.get(url)
      .then(res => setData(res.data))
      .catch((e) => setError(e))
      .finally(() => setLoading(false))
  },[url])
  return {data, loading, error}
}

export default useFetch