import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/routes';

import * as Model from './src/model';
import Snackbar from './src/components/Feedback/Snackbar';
import LoadingApp from './src/pages/splashScreen/LoadingApp';

export default function App() {
    const [loading, setLoading] = useState(true);

    async function loadingOpenDatabase() {
        await Model.open();
        setLoading(false);
    }

    useEffect(() => {
        loadingOpenDatabase();
        return () => Model.close();
    }, []);


    if (loading) {
        return <LoadingApp />;
    } else {
        return (
            <>
                <StatusBar backgroundColor="#085EB3" />
                <Snackbar />
                <Routes />
            </>
        );
    }

}
