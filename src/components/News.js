// import React  from "react";
import React, { useEffect ,useState} from "react";


import NewsItem from "./NewsItem";
import Spin from "./Spin";
import PropTypes from 'prop-types';
import InfinteScroll from "react-infinite-scroll-component";


const News= (props)=>{
const [articles,setArticles] =useState([])
const [loading,setloading] =useState(true)
const [page,setpage] =useState(1)
const [totalResults,setTotalResults] =useState(0)



 const capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 



    const updateNews=async()=>{
    props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
    props.setProgress(30);

    let parsedData = await data.json();
    props.setProgress(70);

    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setloading(false)

    props.setProgress(100);

  }

 

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category) } - NewsMonkey`;
updateNews();
//eslint-disable-next-line
  },[])

//   const handlePrevClick = async () => {
//     setpage(page-1)

//     updateNews();
//   };

//   const handleNextClick = async () => {
//     setpage(page+1)
// updateNews();
//   };


  const fetchMoreData= async ()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey} &page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    //setArticles(articles.concat(parsedData.articles));
    setArticles(prevArticles => [...prevArticles, ...parsedData.articles]);
   setTotalResults(parsedData.totalResults);
  }

    return (
      <div className="conatiner my-3">
        <h1 className="text-center" style={{ margin: '35px opx ',marginTop:'90px', }}>NewsMonkey - Top  {capitalizeFirstLetter(props.category)} HeadLines</h1>
        {loading && <Spin />}

        <InfinteScroll  
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResults}
          loader={<Spin />}

>
  <div className="container">

        <div className="row">
          {
           articles.map((element) => {
              return (
                <div className="col-md-4 " key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageurl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
  </div>

        </InfinteScroll>

        <div className="conatiner d-flex justify-content-between">
          {/* <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button> */}
        </div>
      </div>
    );
  }
// }



News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: "general"

}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string

}

export default News;
