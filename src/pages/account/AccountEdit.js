import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

import KeyboardMoney from '../../components/Modal/KeyboardMoney';

import { formatToMoney } from '../../utils/Number';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AccountEdit({ route, navigation }) {
    const [modal, setModal] = useState(null);
    const [name, setName] = useState('');
    const [initialValue, setInitialValue] = useState('0,00');

    useEffect(() => {
        const { params } = route;
        if (params) {
            navigation.setOptions({ title: 'Editar Conta' });
            setName(params.name);
            setInitialValue(formatToMoney(params.initialValue));
        }
    }, []);

    function handleEditInitialValue() {
        setModal({
            label: 'Saldo Inicial',
            startValue: initialValue,
            ok: val => setInitialValue(val),
            close: () => setModal(null),
        });
    }

    async function handleSaveAccount() {
        try {
            const initialValueFormat = parseFloat(
                initialValue
                    .replace(/\./g, '')
                    .replace(/,/g, '.'),
            );
            if (name === '') {
                global.showSnackbar('Informe o nome da conta')
                return;
            }

            global.Database.write(() => {
                if (!route.params) {
                    global.Database.create('Account', {
                        id: global.uuid(),
                        name,
                        initialValue: initialValueFormat,
                    });
                } else {
                    const { id } = route.params;
                    global.Database.create('Account', {
                        id,
                        name,
                        initialValue: initialValueFormat,
                    }, 'modified');
                }
            });

            global.showSnackbar('Conta salva!')
            navigation.goBack();
        } catch (error) {
            global.showSnackbar(error.message)
        }
    }

    function handleDeleteAccount() {
        Alert.alert(null, 'Deseja realmente excluir está conta?', [
            { text: 'Não', onPress: () => { } },
            {
                text: 'Sim',
                onPress: () => {
                    try {
                        const { id } = route.params;
                        global.Database.write(() => {
                            const obj = global.Database.objects('Account').filtered(`id = '${id}'`);
                            global.Database.delete(obj);
                        });
                        global.showSnackbar('Conta excluída!')
                        navigation.goBack();
                    } catch (error) {
                        global.showSnackbar(error.message)
                    }
                },
            },
        ]);
    }

    return (
        <View style={styles.viewRoot}>
            <View style={styles.viewInputName}>
                <TextInput
                    label='Nome'
                    value={name}
                    onChangeText={text => setName(text)}
                    mode="outlined"
                    fontSize={19}
                />
            </View>
            <View style={styles.viewInputInitialValue}>
                <TouchableOpacity onPress={handleEditInitialValue}>
                    <TextInput
                        label='Saldo Inicial (R$)'
                        value={initialValue}
                        onChangeText={text => setInitialValue(text)}
                        mode="outlined"
                        fontSize={19}
                        editable={false}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.viewButton}>
                <View style={styles.viewButtonSave}>
                    <TouchableOpacity onPress={handleSaveAccount} style={styles.buttonSave}>
                        <MaterialIcons name="check" size={22} color="#FFF" />
                        <Text style={styles.textbuttonSave}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
                {route.params && (
                    <View style={styles.viewButtonDelete}>
                        <TouchableOpacity
                            onPress={handleDeleteAccount}
                            style={styles.buttonDelete}>
                            <MaterialIcons name="close" size={22} color="#C30000" />
                            <Text style={styles.textbuttonDelete}>EXCLUIR</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <KeyboardMoney props={modal} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewRoot: {
        backgroundColor: '#FFF',
        height: '100%',
    },
    viewInputName: {
        paddingTop: 10,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 15,
    },
    viewInputInitialValue: {
        padding: 10,
        marginTop: 5,
    },
    viewButton: {
        marginTop: 35,
        flexDirection: 'column',
    },
    viewButtonDelete: {
        padding: 10,
        marginTop: 20
    },
    viewButtonSave: {
        padding: 10
    },
    buttonSave: {
        width: '100%',
        height: 40,
        backgroundColor: '#6200ee',
        elevation: 5,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textbuttonSave: {
        fontSize: 14,
        color: '#FFF',
        marginLeft: 15,
    },
    buttonDelete: {
        width: '100%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textbuttonDelete: {
        fontSize: 14,
        color: '#C30000',
        marginLeft: 15
    }
});
