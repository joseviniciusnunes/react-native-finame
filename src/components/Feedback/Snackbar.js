import React, { useState } from 'react';
import { Snackbar } from 'react-native-paper';

const defaultDuration = 3000;

export default function () {
    const [config, setConfig] = useState({ text: '', show: false, duration: defaultDuration });

    function handleShowSnackBar(param) {
        if (typeof param === 'object') {
            setConfig({ text: param.text, show: true, duration: param.duration || defaultDuration });
        } else {
            setConfig({ text: param, show: true, duration: defaultDuration });
        }

    }
    global.showSnackbar = handleShowSnackBar;
    return (
        <Snackbar
            visible={config.show}
            onDismiss={() => setConfig({ text: '', show: false, duration: defaultDuration })}
            action={{
                label: 'Ok',
                onPress: () => { },
            }}
            duration={config.duration || defaultDuration}
        >
            {config.text}
        </Snackbar>
    )
}