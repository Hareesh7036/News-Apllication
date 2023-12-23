'use client';
import React,{useEffect,useState} from 'react'
import './main.css'

const Loader=()=>{
    return(<>
    
    <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading...." className="loader" />
    </>);
    };

const Content = () => {
    const placeholderSample=[1,2,3,4,5,6,7,8,9,10,11];
    const [showLoader,setShowLoader]=useState(false);
    const [category,setCategory]=useState('apple');
    const[clickedDataId,setClickedDataId]=useState(0);
    const[newsData,setNewsData]=useState();
    const todayDate= new Date();
    const date =todayDate.getDate();
    const month=todayDate.getMonth();
    const year =todayDate.getFullYear();
    useEffect(()=>{
        setShowLoader(true);
        fetch(`https://newsapi.org/v2/everything?q=${category}&from=${year}-${month}-${date}&language=en&sortBy=publishedAt&apiKey=4cf547b050224c05aac85694217fe43b`)
    .then((res)=>{
        const x=res.json();
        return x;
    })
    .then((res)=>{
        setNewsData(res);
        setShowLoader(false);
    })
    .catch((res)=>{
        console.log(res);
    })
    },[category]);

    const handleContent= (eve)=>{
        setClickedDataId(eve?.target.closest('li').id);
    };

    const [headlines,setHeadlines]=useState(false);
    const handleClose= ()=>{
        setHeadlines(true);

    };
    const handleContentBtn =()=>{
        setHeadlines(false);
    };

    const handleApple = ()=>{
        setCategory("apple");
    };

    const handleTesla=()=>{
        console.log("oyy")
        setCategory("tesla")
    }

  return (
    
    <div className='row main-container'>
        {showLoader && <Loader/>}
        <div className="headlines col-sm-5 " style={{zIndex:headlines?"0":"2"}} data-testid='headlines-cont'>
        <h3 data-testid="heading">Headlines</h3>
        <button className='headlines-btn ' onClick={handleClose}><span className='bi bi-x-lg'></span></button>
        <p style={{fontSize:"13px"}} data-testid="results">Total results:{newsData?.totalResults}, From {category}</p>
        <ul className='content-list'>
            {newsData?(
            
            newsData?.articles.map((article,ind)=>{
             return(   <li key={`li_${ind}`} onClick={handleContent} id={ind}>
                    <div>
                        <img src={article.urlToImage} className='headline-img'></img>
                    </div>
                    <div >Content:{article.title}</div>
                    
                    {/* <div>Description:{article.description}</div> */}
                    <div>Published At:{article.publishedAt}</div>
                </li>)
            })
        ):(
            placeholderSample.map((val,ind)=>{
                return <li key={`li_${ind}`} className='placeholder-glow '>
                <div>
                    <img className='headline-img placeholder col-12' width={100} height={70}></img>
                </div>
                <div className='placeholder col-6'></div>
                
                {/* <div>Description:{article.description}</div> */}
                <div className='placeholder col-10'></div>
            </li>
            })
        )}
        </ul>
        </div>
        <div className='col-sm-7 content-container' id='content-cont' >
            <div >

                <div className='content-btn-container'>
                    <button className='news' onClick={handleApple}><span className='bi bi-apple'></span>Apple</button>
                    <button className='news' onClick={handleTesla}>Tesla</button>
                <button className='content-btn' onClick={handleContentBtn}>Headlines</button>
                </div>
                {
                    newsData?(
                        <>
                        <p className='title'>{newsData?.articles[clickedDataId].title}</p>
                <img className='content-img' src={newsData?.articles[clickedDataId].urlToImage}></img>
                <div>
                    <p className='description'>{newsData?.articles[clickedDataId].description}</p>
                    <p className='content'>{newsData?.articles[clickedDataId].content}</p>
                    </div>
                {<p className='author'>- {newsData?.articles[clickedDataId].author}</p>}
                {<a href={newsData?.articles[clickedDataId].url}>click for more details...</a>}
                        </>
                    ):(
                        <div className='placeholder-wave'>
                        <p className='title placeholder col-12'></p>
                <img className='content-img placeholder col-6' width={100} height={100}></img>
                <div>
                    <p className='description placeholder col-10'></p>
                    <p className='content placeholder col-12'></p>
                    </div>
                {<p className='author placeholder col-4'></p>}
                {<a href={"#"} className='placeholder col-6'></a>}
                        </div>
                    )
                }
            </div>
            
        </div>
    </div>
  )
  }
export default Content