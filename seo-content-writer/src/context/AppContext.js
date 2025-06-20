import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
    currentStep: 0,
    seedKeyword: '',
    keywords: [],
    selectedKeyword: '',
    titles: [],
    selectedTitle: '',
    topics: [],
    selectedTopic: null,
    generatedContent: '',
    seoScore: null,
    loading: false,
    error: null,
    sessionData: {},
    user: null,
    isAuthenticated: false,
};

const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload, error: null };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        case 'SET_STEP':
            return { ...state, currentStep: action.payload };
        case 'SET_SEED_KEYWORD':
            return { ...state, seedKeyword: action.payload };
        case 'SET_KEYWORDS':
            return {
                ...state,
                keywords: action.payload,
                loading: false,
                currentStep: Math.max(state.currentStep, 1)
            };
        case 'SET_SELECTED_KEYWORD':
            return { ...state, selectedKeyword: action.payload };
        case 'SET_TITLES':
            return {
                ...state,
                titles: action.payload,
                loading: false,
                currentStep: Math.max(state.currentStep, 2)
            };
        case 'SET_SELECTED_TITLE':
            return { ...state, selectedTitle: action.payload };
        case 'SET_TOPICS':
            return {
                ...state,
                topics: action.payload,
                loading: false,
                currentStep: Math.max(state.currentStep, 3)
            };
        case 'SET_SELECTED_TOPIC':
            return { ...state, selectedTopic: action.payload };
        case 'SET_CONTENT':
            return {
                ...state,
                generatedContent: action.payload.content,
                seoScore: action.payload.seoScore,
                loading: false,
                currentStep: Math.max(state.currentStep, 4)
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !!action.payload
            };
        case 'LOGOUT':
            return {
                ...initialState,
                // Preserve workflow data on logout
                currentStep: state.currentStep,
                seedKeyword: state.seedKeyword,
                keywords: state.keywords,
                selectedKeyword: state.selectedKeyword,
                titles: state.titles,
                selectedTitle: state.selectedTitle,
                topics: state.topics,
                selectedTopic: state.selectedTopic,
                generatedContent: state.generatedContent,
                seoScore: state.seoScore,
            };
        case 'LOAD_SESSION':
            return { ...state, ...action.payload };
        case 'RESET_WORKFLOW':
            return {
                ...state,
                currentStep: 0,
                seedKeyword: '',
                keywords: [],
                selectedKeyword: '',
                titles: [],
                selectedTitle: '',
                topics: [],
                selectedTopic: null,
                generatedContent: '',
                seoScore: null,
                error: null,
            };
        case 'SET_SEO_SCORE':
            return { ...state, seoScore: action.payload };
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Load from localStorage on init
    useEffect(() => {
        const saved = localStorage.getItem('seo-writer-session');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                dispatch({ type: 'LOAD_SESSION', payload: data });
            } catch (error) {
                console.error('Failed to load session data:', error);
            }
        }
    }, []);

    // Save to localStorage on state changes (excluding user and loading states)
    useEffect(() => {
        const dataToSave = {
            currentStep: state.currentStep,
            seedKeyword: state.seedKeyword,
            keywords: state.keywords,
            selectedKeyword: state.selectedKeyword,
            titles: state.titles,
            selectedTitle: state.selectedTitle,
            topics: state.topics,
            selectedTopic: state.selectedTopic,
            generatedContent: state.generatedContent,
            seoScore: state.seoScore,
        };
        localStorage.setItem('seo-writer-session', JSON.stringify(dataToSave));
    }, [
        state.currentStep,
        state.seedKeyword,
        state.keywords,
        state.selectedKeyword,
        state.titles,
        state.selectedTitle,
        state.topics,
        state.selectedTopic,
        state.generatedContent,
        state.seoScore,
    ]);

    const actions = {
        setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
        setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
        clearError: () => dispatch({ type: 'CLEAR_ERROR' }),
        setStep: (step) => dispatch({ type: 'SET_STEP', payload: step }),
        setSeedKeyword: (keyword) => dispatch({ type: 'SET_SEED_KEYWORD', payload: keyword }),
        setKeywords: (keywords) => dispatch({ type: 'SET_KEYWORDS', payload: keywords }),
        setSelectedKeyword: (keyword) => dispatch({ type: 'SET_SELECTED_KEYWORD', payload: keyword }),
        setTitles: (titles) => dispatch({ type: 'SET_TITLES', payload: titles }),
        setSelectedTitle: (title) => dispatch({ type: 'SET_SELECTED_TITLE', payload: title }),
        setTopics: (topics) => dispatch({ type: 'SET_TOPICS', payload: topics }),
        setSelectedTopic: (topic) => dispatch({ type: 'SET_SELECTED_TOPIC', payload: topic }),
        setContent: (content, seoScore) => dispatch({
            type: 'SET_CONTENT',
            payload: { content, seoScore }
        }),
        setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
        logout: () => dispatch({ type: 'LOGOUT' }),
        resetWorkflow: () => dispatch({ type: 'RESET_WORKFLOW' }),
        setSeoScore: (seoScore) => dispatch({ type: 'SET_SEO_SCORE', payload: seoScore }),
    };

    return (
        <AppContext.Provider value={{ state, dispatch, actions }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
