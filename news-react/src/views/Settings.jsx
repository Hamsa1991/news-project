import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from "../axios-client";


const Settings = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const [activeTab, setActiveTab] = useState('categories');
    const [errors, setErrors] = useState();

    const [categorySearchQueries, setCategorySearchQueries] = useState();
    const [sourceSearchQueries, setSourceSearchQueries] = useState();
    const [authorSearchQueries, setAuthorSearchQueries] = useState();

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);

    useEffect(() => {

    }, []);


    const handleSaveSettings = async (clear) => {
        let userPreferences = null;
        if(!clear) {
            userPreferences = {
                categories: selectedCategories,
                sources: selectedSources,
                authors: selectedAuthors,
            };
        }

        const response = axiosClient.post('/user-settings/store', userPreferences)
            .then(({data}) => {
                navigate('/news');
            }).catch((error) => {
                setErrors(error)
                console.log("error" + error);
            });

    };


    const handleSelectChange = (setter, key) => (event) => {
        const value = event.target.value;

        setter((prev) => {
            const newSelection = prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value];

            // Update localStorage
            localStorage.setItem(key, JSON.stringify(newSelection));
            return newSelection;
        });
    };

    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const sources = JSON.parse(localStorage.getItem('sources')) || [];
    const authors = JSON.parse(localStorage.getItem('authors')) || [];

    const filteredAuthorsData = authorSearchQueries ? authors.filter(value =>
        value.name.toLowerCase().includes(authorSearchQueries.toLowerCase())
    ) : authors;
    const filteredCategoriesData = categorySearchQueries ? categories.filter(value =>
        value.name.toLowerCase().includes(categorySearchQueries.toLowerCase())
    ) : categories;
    const filteredSourcesData = sourceSearchQueries ? sources.filter(value =>
        value.name.toLowerCase().includes(sourceSearchQueries.toLowerCase())
    ) : sources;

    return (
        <div className="user-settings">
            <h1>Settings</h1>
            <div className="tabs">
                <button
                    className={(activeTab === 'categories' ? 'active' : '') + ' input-group-text text-secondary form-button'}
                    onClick={() => setActiveTab('categories')}
                >
                    Categories
                </button>
                <button
                    className={(activeTab === 'sources' ? 'active' : '' )+ ' input-group-text text-secondary form-button'}
                    onClick={() => setActiveTab('sources')}
                >
                    Sources
                </button>
                <button
                    className={(activeTab === 'authors' ? 'active' : '') + ' input-group-text text-secondary form-button'}
                    onClick={() => setActiveTab('authors')}
                >
                    Authors
                </button>
            </div>

            {activeTab === 'categories' && (
                <div>
                    <h5>Preferred Categories:</h5>
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={categorySearchQueries}
                        onChange={(e) => setCategorySearchQueries( e.target.value)}
                        className="form-control search-input"
                    />
                    {filteredCategoriesData.map((category) => (
                        <label key={category.id} className="checkbox-label">
                            <input
                                type="checkbox"
                                value={category.id}
                                onChange={handleSelectChange(setSelectedCategories, 'selectedCategories')}
                                // checked={selectedCategories.includes(category.id)}
                                className="checkbox-input"
                            />
                            <span className="checkbox-custom">{category.name}</span>
                        </label>
                    ))}
                </div>
            )}

            {activeTab === 'sources' && (
                <div>
                    <h5>Preferred Sources:</h5>
                    <input
                        type="text"
                        placeholder="Search Sources..."
                        value={sourceSearchQueries}
                        onChange={(e) => setSourceSearchQueries( e.target.value)}
                        className="form-control search-input"
                    />
                    {filteredSourcesData.map((source) => (
                        <label key={source.id} className="checkbox-label">
                            <input
                                type="checkbox"
                                value={source.id}
                                onChange={handleSelectChange(setSelectedSources, 'selectedSources')}
                                // checked={selectedSources.includes(source.id)}
                                className="checkbox-input"
                            />
                            <span className="checkbox-custom">{source.name}</span>
                        </label>
                    ))}
                </div>
            )}

            {activeTab === 'authors' && (
                <div>
                    <h5>Preferred Authors:</h5>
                    <input
                        type="text"
                        placeholder="Search authors..."
                        value={authorSearchQueries}
                        onChange={(e) => setAuthorSearchQueries( e.target.value)}
                        className="form-control search-input"
                    />
                    {filteredAuthorsData.map((author) => (
                        <label key={author.id} className="checkbox-label">
                            <input
                                type="checkbox"
                                value={author.id}
                                onChange={handleSelectChange(setSelectedAuthors, 'selectedAuthors')}
                                // checked={selectedAuthors.includes(author.id)}
                                className="checkbox-input"
                            />
                            <span className="checkbox-custom">{author.name}</span>
                        </label>
                    ))}
                </div>
            )}

            <button onClick={(e) => handleSaveSettings(false)} className="input-group-text text-secondary form-button">Save Settings</button>
            <button onClick={(e) => handleSaveSettings(true)} className="input-group-text text-secondary form-button">clear Settings</button>
        </div>
    );
};

export default Settings;
