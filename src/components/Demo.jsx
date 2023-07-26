import { useState, useEffect } from "react"

import { linkIcon, copy, tick, loader } from "../assets"
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  
  const [articles, setArticles] = useState({
    url: '',
    summary: '',
  });

  const [allArticles, setAllArticles] = useState([])
  const [copied, setCopied] = useState("")

  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery()

  useEffect(() => {
    
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))
    
    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage)
    }

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {data} = await getSummary({articleUrl: articles.url})

    if(data?.summary){

      const newArticle = {...articles, summary: data.summary}

      const updateAllArticles = [newArticle, ...allArticles]

      setArticles(newArticle)
      setAllArticles(updateAllArticles)
      localStorage.setItem('articles', JSON.stringify(updateAllArticles))
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleKeyDown = (e) => {
    if(e.keyCode === 13){
      handleSubmit(e);
    }
  }
  
  return (
    <section className="w-full mt-16 max-w-xl">
      {/*Search*/}
      <div className="w-full flex flex-col gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img 
            src={linkIcon} 
            alt="link-icon"
            className="left-0 ml-3 my-2 w-5 absolute"
          />

          <input 
            type="url" 
            placeholder="Enter a URL"
            value={articles.url}
            onChange={(e) => setArticles({...articles, url: e.target.value})}
            className="url_input peer"
            onKeyDown={handleKeyDown}
            required
          />
          
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <p>↵</p>
          </button>
        </form>

        {/*Previous Url Summary */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              className="link_card"
              onClick={() => setArticles(item)}
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img 
                  src={copied === item.url ? tick : copy} 
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/*Article Summary*/}
      <div className="flex justify-center items-center my-10 max-w-full">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ): error ? (
          <p className="font-inter font-bold text-black text-center">
            Well that wasn't supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}  
            </span>
          </p>
        ): (
          articles.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-santoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>

              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {articles.summary}
                </p>
              </div>
            </div>
        ))}
      </div>
    </section>
  )
}

export default Demo