// import React, { Component } from "react";

// export class NewsItem extends Component {  //class base
//   render() {

const NewsItem= (props)=>{


    // let { title, description, imageurl, newsUrl,author,date ,source} = this.props;
    let { title, description, imageurl, newsUrl,author,date ,source} =props;

    return (
      <div className="my-4">
        <div className="card">
          <div style={{
            display:'flex',
            justifyContent:'flex-end',
            position:'absolute',
            right:'0'
          }}>

          <span className=" badge rounded-pill bg-danger">{source}

          </span>
          </div>



          <img src={!imageurl?"https://www.constructionworld.in/assets/uploads/s_bb1a849feb9bece5be9a0c3ee7338a9b.webp":imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>  
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted"> By{!author?"Unknown":author} on {new Date(date).toGMTString()}</small> </p>
            <a
            rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More   
            </a>
          </div>
        </div>
      </div> 
    );}
  // }

// }

export default NewsItem;
