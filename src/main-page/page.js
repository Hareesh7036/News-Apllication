'use client';
import React,{useEffect,useState} from 'react'
import './main.css'
import Reverse from 'my-sample-react-lib-ntg'

const Content = () => {
    const[clickedDataId,setClickedDataId]=useState(0);
    const[newsData,setNewsData]=useState();
    useEffect(()=>{
        fetch('https://newsapi.org/v2/everything?q=tesla&from=2023-11-08&sortBy=publishedAt&apiKey=4cf547b050224c05aac85694217fe43b')
    .then((res)=>{
        const x=res.json();
        return x;
    })
    .then((res)=>{
        console.log(res);
        setNewsData(res);
    })
    .catch((res)=>{
        console.log(res);
    })
    },[]);

    const handleContent= (eve)=>{
        setClickedDataId(eve?.target.closest('li').id);
    };

  return (
    <div className='row main-container'>
        
        <div className="headlines col-sm-5">
        <h3>Headlines</h3>
        <p>Total results:{newsData?.totalResults}</p>
        <ul className='content-list'>
            {newsData?.articles.map((article,ind)=>{
             return(   <li key={`li_${ind}`} onClick={handleContent} id={ind}>
                    <div>
                        <img src={article.urlToImage} className='headline-img'></img>
                    </div>
                    <div>Content:{article.title}</div>
                    
                    {/* <div>Description:{article.description}</div> */}
                    <div>Published At:{article.publishedAt}</div>
                </li>)
            })}
        </ul>
        </div>
        <div className='col-sm-7 content-container'>
            <div >
                <p>{newsData?.articles[clickedDataId].title}</p>
                <img className='content-img' src={newsData?.articles[clickedDataId].urlToImage}></img>
                <div>
                    <p>{newsData?.articles[clickedDataId].description}</p>
                    <p>{newsData?.articles[clickedDataId].content}</p>
                    </div>
                <p>- {newsData?.articles[clickedDataId].author}</p>
                <a href={newsData?.articles[clickedDataId].url}>click for more detailss</a>
            </div>
            
        </div>
    </div>
  )
  }
export default Content