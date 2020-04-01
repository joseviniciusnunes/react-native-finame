import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function GroupEdit({ route, navigation }) {
    const [name, setName] = useState('');
    const [subGroups, setSubGroups] = useState([]);

    useEffect(() => {
        const { params } = route;
        if (params) {
            navigation.setOptions({ title: 'Editar Grupo' });
            setName(params.name);
            setSubGroups(Array.from(global.Database.objects('SubGroup').filtered(`group.id = '1c9c60f0-73a5-11ea-95cd-0fa95c492d8e'`)));
        }
    }, []);

    async function handleSaveGroup() {
        try {
            if (name === '') {
                global.showSnackbar('Informe o nome do grupo')
                return;
            }

            global.Database.write(() => {
                if (!route.params) {
                    global.Database.create('Group', {
                        id: global.uuid(),
                        name
                    });
                } else {
                    const { id } = route.params;
                    global.Database.create('Group', {
                        id,
                        name
                    }, 'modified');
                }
            });

            global.showSnackbar('Grupo salvo!')
            navigation.goBack();
        } catch (error) {
            global.showSnackbar(error.message)
        }
    }

    function handleDeleteGroup() {
        Alert.alert(null, 'Deseja realmente excluir este grupo?', [
            { text: 'Não', onPress: () => { } },
            {
                text: 'Sim',
                onPress: () => {
                    try {
                        const { id } = route.params;
                        global.Database.write(() => {
                            const obj = global.Database.objects('Group').filtered(`id = '${id}'`);
                            global.Database.delete(obj);
                        });
                        global.showSnackbar('Grupo excluído!')
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
            <View style={styles.viewButton}>
                <View style={styles.viewButtonSave}>
                    <TouchableOpacity onPress={handleSaveGroup} style={styles.buttonSave}>
                        <MaterialIcons name="check" size={22} color="#FFF" />
                        <Text style={styles.textbuttonSave}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
                {route.params && (
                    <View style={styles.viewButtonDelete}>
                        <TouchableOpacity
                            onPress={handleDeleteGroup}
                            style={styles.buttonDelete}>
                            <MaterialIcons name="close" size={22} color="#C30000" />
                            <Text style={styles.textbuttonDelete}>EXCLUIR</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View style={styles.viewDivider} />
            <View style={styles.viewActionSubGroup}>
                <Text style={styles.textSubGroup}>Sub-Grupos</Text>
                <TouchableOpacity style={styles.buttonAddSubGroup}>
                    <MaterialIcons name="add" size={22} color="#FFF" />
                </TouchableOpacity>
            </View>
            <View style={styles.viewSubGroup}>
                <FlatList
                    data={subGroups}
                    keyExtractor={(item) => item.id}
                    renderItem={props => <ItemSubGroup {...props} navigation={navigation} />}
                />
            </View>
        </View>
    );
}

function ItemSubGroup({ item, navigation }) {
    return (
        <View
            style={styles.viewItemGroup}
            onPress={() => navigation.push('GroupEdit', { ...item })}>
            <View style={styles.viewItemName}>
                <Text style={styles.textLabel}>Nome</Text>
                <Text style={styles.textName}>{item.name}</Text>
            </View>
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
    viewButton: {
        marginTop: 35,
        flexDirection: 'column',
    },
    viewButtonDelete: {
        padding: 10
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
        marginLeft: 15,
    },
    viewDivider: {
        height: 1,
        backgroundColor: '#DDD',
        margin: 10
    },
    viewItemGroup: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        margin: 5,
        elevation: 5,
        borderBottomWidth: 0,
        borderRadius: 8,
        backgroundColor: '#FFF',
    },
    viewItemName: {
        flex: 1,
    },
    textName: {
        fontSize: 15,
    },
    textLabel: {
        fontSize: 10,
    },
    viewSubGroup: {
        flex: 1
    },
    viewActionSubGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginVertical: 10
    },
    textSubGroup: {
        fontSize: 14
    },
    buttonAddSubGroup: {
        backgroundColor: '#6200ee',
        width: 35,
        height: 35,
        borderRadius: 17.5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8
    }
});
