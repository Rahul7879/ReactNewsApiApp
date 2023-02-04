
import React from 'react'
import './hover.css'
import image1 from './image.png'



const  NewsItem = (props) =>{
 
  let  {title, description , imageUrl,newsUrl,author, date , source} = props;
  
    return (
      <div>
      <div className="hoverclass card my-3" style={{}}>
      
  <img style={{width:"414px", height:"240px"}} src={imageUrl?imageUrl:""} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title.slice(0,70)}</h5> <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:"1"}}>
   {source}
    <span className="visually-hidden">unread messages</span>
  </span>
    <p className="card-text">{description.slice(0,120)}</p>
    <p className="card-text"><small  id='span' className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} className="btn btn-primary">Read More</a>
  </div>
</div>
</div>
    )
  }
export default NewsItem


