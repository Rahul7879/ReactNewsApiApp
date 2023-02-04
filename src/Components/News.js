


import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import  './hover.css'
import InfiniteScroll from "react-infinite-scroll-component";
import image from './image.png'
// import Spinner from "./Spinner"
// import Spinner from 'react-bootstrap/Spinner';
export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 5,

    }
    static propTypes =
        {
            country: PropTypes.string,
            pageSize: PropTypes.number,
            category: PropTypes.string

        }
    capitalizeFitstletter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults : 0
        }
        document.title = `${this.capitalizeFitstletter(this.props.category)} - NewsBird`
    }
    async updateNews(pageNo) {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=579eb063c5bb411ca4f52072dd61c962&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })


    }

    async componentDidMount() {
        this.updateNews();
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=579eb063c5bb411ca4f52072dd61c962&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData); 
        // this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
    }

    handlePrevClick = async () => {
        // console.log("Previous");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=579eb063c5bb411ca4f52072dd61c962&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);  
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles
        // })
        this.setState({ page: this.state.page - 1 })
        this.updateNews();

    }

    handleNextClick = async () => {
        console.log("Next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

            this.setState({ page: this.state.page + 1 })
            this.updateNews();

            // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=579eb063c5bb411ca4f52072dd61c962&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            // let data = await fetch(url);
            // let parsedData = await data.json()
            // console.log(parsedData);  
            // this.setState({
            //     page: this.state.page + 1,
            //     articles: parsedData.articles
            // })
        }
    }
    fetchMoreData = async() => {
      this.setState({page:this.state.page +1 })
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=579eb063c5bb411ca4f52072dd61c962&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults , loading:false})
      };

    render() {
        return (
            <div className="container my-3">
                <h1 className=" heading text-center "  >NewsBird - Top {this.capitalizeFitstletter(this.props.category)} Headlines</h1>
                <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !==this.totalResults}
        loader= {<h1>loading..</h1>}>

       
        
    
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
        <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                </InfiniteScroll>
        
            </div>
        )
    }
}

export default News
