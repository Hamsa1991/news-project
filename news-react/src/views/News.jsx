import {useState, useEffect, useRef} from 'react';
import axiosClient from "../axios-client";


export default function News() {
    const [articlesData, setArticlesData] = useState([]);
    const [preferredCategories, setPreferredCategories] = useState([]);
    const [preferredAuthors, setPreferredAuthors] = useState([]);
    const [preferredSources, setPreferredSources] = useState([]);

    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [source, setSource] = useState('');
    const [startDate, setStartDate] = useState('2024-09-04');
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [page, setPage] = useState(1);

    // const APIs = [
    //     'https://newsapi.org/v2/top-headlines?country=us&apiKey=9cd080ab99794b019511f8b63dd672c9',//'6be67c49385d4f9ba3ed7d46e930f8a2',
    //     // 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=YOUR_API_KEY_2',
    //     // `${proxyUrl}https://content.guardianapis.com/search?q=debate&tag=politics/politics&from-date=2014-01-01&api-key=8dcfdc3-7b93-455c-8cbb-ea361fcfe4c5`,
    //     'https://newsapi.org/v2/everything?q=keyword&apiKey=9cd080ab99794b019511f8b63dd672c9',//6be67c49385d4f9ba3ed7d46e930f8a2'
    //     `https://api.nytimes.com/svc/archive/v1/2024/1.json?api-key=aQTkp8gKN0sypd6ho7IGXOkmINV2g4om`
    // ];

    const handleSubmit = (e) => {
        e.preventDefault();
        getArticles(page);
    };
    const clearFilters = (e) => {
        e.preventDefault();
        setCategory('');
        setKeyword('');
        setSource('');
        setStartDate('2024-09-04');
        getArticles(page);
    }
    //get categories, sources and authors data
    const fetchData = () => {
        // if(localStorage.getItem('categories') == null) {
        axiosClient.post("/data").then(({data}) => {
            console.log({data});
            localStorage.setItem('categories', JSON.stringify(data.categories));
            localStorage.setItem('authors', JSON.stringify(data.authors));
            localStorage.setItem('sources', JSON.stringify(data.sources));
        }).catch((error) => {
            setErrors(error)
            console.log("error" + error);
        })
        // }
    }

    //get preferences
    const getPreferences = () => {
        axiosClient.get("/user-settings/preferences").then(({data}) => {
            console.log({data});
            setPreferredSources(data.sources);
            setPreferredAuthors(data.authors);
            setPreferredCategories(data.categories);
        }).catch((error) => {
            setErrors(error)
            console.log("error" + error);
        })
    }

    //fetch articles
    const getArticles = async (page) => {
        setLoading(true);
        try {
            const payload = {
                keyword: keyword,
                category: category,
                source: source,
                startDate: startDate,
                page: page
            };
            await axiosClient.post("/news", payload).then(({data}) => {
                console.log({data})
                setArticlesData(data.data);
                console.log(data.next_page_url);

                let nextPage = null
                if (data.next_page_url != null) {
                    const nextUrlObj = new URL(data.next_page_url);
                    nextPage = parseInt(nextUrlObj.searchParams.get('page'), 10);
                }
                setNextPage(nextPage);
                let prevPage = null;
                if (data.prev_page_url != null) {
                    const prevUrlObj = new URL(data.prev_page_url);
                    prevPage = parseInt(prevUrlObj.searchParams.get('page'), 10);
                }
                setPrevPage(prevPage);
                setPage(data.current_page);
            }).catch((error) => {
                setErrors(error)
                console.log("error" + error);
            })

        } catch (err) {
            setErrors(err.message);
        } finally {
            setLoading(false);
        }
    }
    const handleNextPage = () => {
        if (nextPage) {
            getArticles(nextPage);
        }
    };

    const handlePrevPage = () => {
        if (prevPage) {
            getArticles(prevPage);
        }
    };
    useEffect(() => {
        fetchData();
        getPreferences();
        getArticles(1);
    }, []); // Empty dependency array means this effect runs once on mount

    if (loading) return <div className={'loading'}>Loading...</div>;
    // if (errors) return <div>Error: {errors}</div>;

    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const sources = JSON.parse(localStorage.getItem('sources')) || [];

    return (
        <div className="container-fluid py-3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="carousel-item-1 position-relative mb-3 mb-lg-0">
                            {articlesData &&
                            <div className="position-relative overflow-hidden" style={{height: '435px'}}>
                                <img className="img-fluid h-100" src={articlesData[0].urlToImage}
                                     style={{objectFit: 'cover'}}/>
                                <div className="overlay">
                                    <div className="mb-1">
                                        <a className="text-white" href="">{articlesData[0].category?.name}</a>
                                        <span className="px-2 text-white">/</span>
                                        <a className="text-white"
                                           href="">{new Date(articlesData[0].publishedAt).toLocaleDateString()}</a>
                                    </div>
                                    <a className="h2 m-0 text-white font-weight-bold" target={'_blank'}
                                       href={articlesData[0].url}>{articlesData[0].title}</a>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                            <h3 className="m-0">Categories</h3>
                            <a className="text-secondary font-weight-medium text-decoration-none" href="">View All</a>
                        </div>
                        <div className="position-relative overflow-hidden mb-3" style={{height: '80px'}}>
                            <img className="img-fluid w-100 h-100" src="img/cat-500x80-1.jpg"
                                 style={{objectFit: 'cover'}}/>
                            <a href=""
                               className="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none">
                                Business
                            </a>
                        </div>
                        <div className="position-relative overflow-hidden mb-3" style={{height: '80px'}}>
                            <img className="img-fluid w-100 h-100" src="img/cat-500x80-2.jpg"
                                 style={{objectFit: 'cover'}}/>
                            <a href=""
                               className="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none">
                                Technology
                            </a>
                        </div>
                        <div className="position-relative overflow-hidden mb-3" style={{height: '80px'}}>
                            <img className="img-fluid w-100 h-100" src="img/cat-500x80-3.jpg"
                                 style={{objectFit: 'cover'}}/>
                            <a href=""
                               className="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none">
                                Entertainment
                            </a>
                        </div>
                        <div className="position-relative overflow-hidden" style={{height: '80px'}}>
                            <img className="img-fluid w-100 h-100" src="img/cat-500x80-4.jpg"
                                 style={{objectFit: 'cover'}}/>
                            <a href=""
                               className="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none">
                                Sports
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid py-3">
                <div className="container">
                    <div>
                        <form onSubmit={handleSubmit} className="styled-form">
                            <div className="row">
                                <div className="form-group col-xs-1 col-md-3">
                                    <label className="form-label">Keyword:</label>
                                    <input
                                        type="text"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        className="form-control form-input"
                                    />
                                </div>
                                <div className="form-group col-xs-1 col-md-3">
                                    <label className="form-label">Start Date:</label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="form-control form-input"
                                    />
                                </div>
                                <div className="form-group col-xs-1 col-md-3">
                                    <label className="form-label">Source:</label>
                                    <select value={source} onChange={(e) => setSource(e.target.value)}
                                            className="form-control form-select">
                                        <option value="">Select a source</option>
                                        {sources.map((source, index) => (
                                                <option key={index} value={source.id}>{source.name}</option>
                                            )
                                        )}
                                    </select>
                                </div>
                                <div className="form-group col-xs-1 col-md-3">
                                    <label className="form-label">Category:</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)}
                                            className="form-control form-select">
                                        <option value="">Select a category</option>
                                        {categories.map((category, index) => (
                                                <option key={index} value={category.id}>{category.name}</option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className='form-buttons'>
                                <button type="submit" className="input-group-text text-secondary form-button">Search
                                </button>
                                <button type="button" className="input-group-text text-secondary form-button"
                                        onClick={clearFilters}>Clear Filters
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">

                        {prevPage && (
                            <a className="text-secondary font-weight-medium text-decoration-none" href="#"
                               onClick={handlePrevPage}>
                                Previous Page
                            </a>
                        )}
                        <h3 className="m-0">Latest</h3>
                        {nextPage && (
                            <a className="text-secondary font-weight-medium text-decoration-none" href="#"
                               onClick={handleNextPage}>
                                Next Page
                            </a>
                        )}
                    </div>
                    <div className={'row'}>
                        {articlesData.length > 0 ? (
                            articlesData.map((article, index) => (
                                <div key={index} className="col-md-3 col-xs-1 owl-item cloned"
                                     style={{marginBottom: "30px"}}>

                                    <div className="position-relative overflow-hidden" style={{height: "350px"}}>
                                        <div className="position-relative">
                                            <img className="img-fluid w-100" src={article.urlToImage}
                                                 style={{objectFit: 'cover'}}/>
                                            <div className="overlay position-relative bg-light">
                                                <div className="mb-2" style={{fontSize: "13px"}}>
                                                    <a href="">{article.category?.name}</a>
                                                    <span className="px-1">/</span>
                                                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                                                </div>
                                                <a className="h6 m-0" target="_blank"
                                                   href={article.url}>{article.title}</a>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                            ))
                        ) : (
                            <p>No articles available.</p>
                        )}
                    </div>
                    <div className={'row'}>
                        {preferredCategories.length > 0 ? (
                            preferredCategories.map((category, index) => (
                                <div>
                                    <div
                                        className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                                        <h3>{category.name}</h3>
                                    </div>
                                    <div className='row'>
                                    {category.articles.length > 0 ? (
                                        category.articles.slice(0, 4).map((article, index) => (
                                    <div key={index} className="col-md-3 col-xs-1 owl-item cloned"
                                         style={{marginBottom: "30px"}}>

                                        <div className="position-relative overflow-hidden" style={{height: "350px"}}>
                                            <div className="position-relative">
                                                <img className="img-fluid w-100" src={article.urlToImage}
                                                     style={{objectFit: 'cover'}}/>
                                                <div className="overlay position-relative bg-light">
                                                    <div className="mb-2" style={{fontSize: "13px"}}>
                                                        <a href="">{article.category?.name}</a>
                                                        <span className="px-1">/</span>
                                                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                                                    </div>
                                                    <a className="h6 m-0" target="_blank"
                                                       href={article.url}>{article.title}</a>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                        )) ):("")}
                                    </div>
                                </div>
                            ))
                        ) : (
                            ""
                        )}
                    </div>
                    <div className={'row'}>
                        {preferredSources.length > 0 ? (
                            preferredSources.map((source, index) => (
                                <div>
                                    <div
                                        className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                                        <h3>Articles from {source.name}</h3>
                                    </div>
                                    <div className={'row'}>
                                    {source.articles.length > 0 ? (
                                        source.articles.slice(0, 4).map((article, index) => (
                                            <div key={index} className="col-md-3 col-xs-1 owl-item cloned"
                                                 style={{marginBottom: "30px"}}>

                                                <div className="position-relative overflow-hidden" style={{height: "350px"}}>
                                                    <div className="position-relative">
                                                        <img className="img-fluid w-100" src={article.urlToImage}
                                                             style={{objectFit: 'cover'}}/>
                                                        <div className="overlay position-relative bg-light">
                                                            <div className="mb-2" style={{fontSize: "13px"}}>
                                                                <a href="">{article.category?.name}</a>
                                                                <span className="px-1">/</span>
                                                                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                                                            </div>
                                                            <a className="h6 m-0" target="_blank"
                                                               href={article.url}>{article.title}</a>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        )) ):("")}
                                    </div>
                                </div>
                            ))
                        ) : (
                            ""
                        )}
                    </div>
                    <div className={'row'}>
                        {preferredAuthors.length > 0 ? (
                            preferredAuthors.map((author, index) => (
                                <div>
                                    <div
                                        className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                                        <h3>Articles by {author.name}</h3>
                                    </div>
                                    <div className={'row'}>
                                    {author.articles.length > 0 ? (
                                        author.articles.slice(0, 4).map((article, index) => (
                                            <div key={index} className="col-md-3 col-xs-1 owl-item cloned"
                                                 style={{marginBottom: "30px"}}>

                                                <div className="position-relative overflow-hidden" style={{height: "350px"}}>
                                                    <div className="position-relative">
                                                        <img className="img-fluid w-100" src={article.urlToImage}
                                                             style={{objectFit: 'cover'}}/>
                                                        <div className="overlay position-relative bg-light">
                                                            <div className="mb-2" style={{fontSize: "13px"}}>
                                                                <a href="">{article.category?.name}</a>
                                                                <span className="px-1">/</span>
                                                                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                                                            </div>
                                                            <a className="h6 m-0" target="_blank"
                                                               href={article.url}>{article.title}</a>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        )) ):("")}
                                    </div>
                                </div>
                            ))
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>


    );

}
