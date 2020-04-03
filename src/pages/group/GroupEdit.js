import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import Modal from "react-native-modal";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { constTypeGroup } from '../../constants/group';

export default function GroupEdit({ route, navigation }) {
    const [name, setName] = useState('');
    const [typeGroup, setTypeGroup] = useState('E');
    const [subGroups, setSubGroups] = useState([]);
    const [itemSubGroup, setItemSubGroup] = useState(null);
    const [group, setGroup] = useState(null);

    useEffect(() => {
        const { params } = route;
        if (params) {
            navigation.setOptions({ title: 'Editar Grupo' });
            setGroup(params);
            setName(params.name);
            setTypeGroup(params.type);
            loadingSubGroup();
        }
    }, []);

    function loadingSubGroup() {
        const id = route.params ? route.params.id : group.id
        setSubGroups(Array.from(global.Database.objects('SubGroup').filtered(`group.id = '${id}'`)));
    }

    async function handleSaveGroup(inBackStack) {
        try {
            if (name === '') {
                global.showSnackbar('Informe o nome do grupo')
                return;
            }

            let groupSaved = null;
            global.Database.write(() => {
                if (!group) {
                    groupSaved = global.Database.create('Group', {
                        id: global.uuid(),
                        type: typeGroup,
                        name
                    });
                } else {
                    global.Database.create('Group', {
                        id: group.id,
                        name,
                        type: typeGroup,
                    }, 'modified');
                }
            });
            global.showSnackbar({ text: 'Grupo salvo!', duration: 1000 });
            if (inBackStack) {
                navigation.goBack();
                return null;
            } else {
                setGroup(groupSaved);
                return (groupSaved);
            }
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
                        global.Database.write(() => {
                            const objSubGroup = global.Database.objects('SubGroup').filtered(`group.id = '${group.id}'`);
                            global.Database.delete(objSubGroup);
                            const objGroup = global.Database.objects('Group').filtered(`id = '${group.id}'`);
                            global.Database.delete(objGroup);
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

    async function handleAddSubGrupo(itemSubGroup) {
        if (!group) {
            const groupSaved = await handleSaveGroup(false);
            if (!groupSaved) {
                return;
            }
            itemSubGroup.group = groupSaved;
        } else {
            itemSubGroup.group = group;
        }
        setItemSubGroup(itemSubGroup);
    }

    function handleTypeGroup(type) {
        if (type === 'E') {

        } else {

        }
    }

    return (
        <>
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
                <View style={styles.viewTypeGroup}>
                    <TouchableOpacity style={{ ...styles.opTypeGroup, ...(typeGroup === 'E' ? styles.opTypeSelected : {}) }} onPress={() => setTypeGroup('E')}>
                        <Text style={{ ...styles.textTypeGroup, ...(typeGroup === 'E' ? styles.textOpTypeSelected : {}) }}>{constTypeGroup['E']}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.opTypeGroup, ...(typeGroup === 'S' ? styles.opTypeSelected : {}) }} onPress={() => setTypeGroup('S')}>
                        <Text style={{ ...styles.textTypeGroup, ...(typeGroup === 'S' ? styles.textOpTypeSelected : {}) }}>{constTypeGroup['S']}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewButton}>
                    <View style={styles.viewButtonSave}>
                        <TouchableOpacity onPress={() => handleSaveGroup(true)} style={styles.buttonSave}>
                            <MaterialIcons name="check" size={22} color="#FFF" />
                            <Text style={styles.textbuttonSave}>SALVAR</Text>
                        </TouchableOpacity>
                    </View>
                    {group && (
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
                    <TouchableOpacity style={styles.buttonAddSubGroup} onPress={() => handleAddSubGrupo({ id: null, name: '' })}>
                        <MaterialIcons name="add" size={22} color="#FFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewSubGroup}>
                    <FlatList
                        data={subGroups}
                        keyExtractor={(item) => item.id}
                        renderItem={props => <ItemSubGroup {...props} navigation={navigation} loadingSubGroup={loadingSubGroup} handleAddSubGrupo={handleAddSubGrupo} />}
                    />
                </View>
            </View>
            <ModalCreateSubGroup item={itemSubGroup} onClose={() => {
                setItemSubGroup(null);
                loadingSubGroup();
            }} />
        </>
    );
}

function ItemSubGroup({ item, navigation, loadingSubGroup, handleAddSubGrupo }) {

    function handleDeleteSubGroup() {
        Alert.alert(null, 'Deseja realmente excluir este sub-grupo?', [
            { text: 'Não', onPress: () => { } },
            {
                text: 'Sim',
                onPress: () => {
                    try {
                        global.Database.write(() => {
                            const obj = global.Database.objects('SubGroup').filtered(`id = '${item.id}'`);
                            global.Database.delete(obj);
                        });
                        global.showSnackbar('Sub-grupo excluído!')
                        loadingSubGroup();
                    } catch (error) {
                        global.showSnackbar(error.message)
                    }
                },
            },
        ]);
    }

    function handleEditSubGroup() {
        handleAddSubGrupo({ ...item });
    }

    return (
        <View
            style={styles.viewItemGroup}
            onPress={() => navigation.push('GroupEdit', { ...item })}>
            <View style={styles.viewItemName}>
                <Text style={styles.textLabel}>Nome</Text>
                <Text style={styles.textName}>{item.name}</Text>
            </View>
            <View style={styles.viewEditSubGroup}>
                <TouchableOpacity style={styles.opEditSubGroup} onPress={handleEditSubGroup}>
                    <MaterialIcons name="edit" size={22} color="#6200ee" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.opEditSubGroup} onPress={handleDeleteSubGroup}>
                    <MaterialIcons name="close" size={22} color="#C30000" />
                </TouchableOpacity>
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
        marginTop: 15,
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
    },
    viewEditSubGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    opEditSubGroup: {
        height: '100%',
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewTypeGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    opTypeGroup: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDD',
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5
    },
    opTypeSelected: {
        backgroundColor: '#105EE4',
        elevation: 5
    },
    textOpTypeSelected: {
        color: '#FFF'
    },
    textTypeGroup: {
        fontSize: 16
    }
});

function ModalCreateSubGroup({ item, onClose }) {

    if (!item) {
        return null;
    }

    const [name, setName] = useState('');

    useEffect(() => {
        if (item) {
            setName(item.name);
        }
    }, [])

    async function handleSaveSuvGroup() {
        try {
            if (name === '') {
                global.showSnackbar('Informe o nome do sub-grupo')
                return;
            }

            global.Database.write(() => {
                if (!item.id) {
                    global.Database.create('SubGroup', {
                        id: global.uuid(),
                        name,
                        group: global.Database.objects('Group').filtered(`id = '${item.group.id}'`)[0]
                    });
                } else {
                    global.Database.create('SubGroup', {
                        id: item.id,
                        name
                    }, 'modified');
                }
            });

            global.showSnackbar({ text: 'Sub-grupo salvo!', duration: 1000 });
            onClose();
        } catch (error) {
            global.showSnackbar(error.message)
        }
    }

    return (
        <View>
            <Modal
                isVisible
                style={styleSubGroup.modalRoot}
                onBackButtonPress={onClose}
                onBackdropPress={onClose}
            >
                <View style={styleSubGroup.viewRoot}>
                    <Text style={styleSubGroup.textTitle}>Criar Sub-Grupo</Text>
                    <View style={styleSubGroup.viewInputName}>
                        <TextInput
                            label='Nome'
                            value={name}
                            onChangeText={setName}
                            mode="outlined"
                            fontSize={19}
                        />
                    </View>
                    <View style={styleSubGroup.viewAction}>
                        <TouchableOpacity style={styleSubGroup.opActionClose} onPress={onClose}>
                            <Text style={styleSubGroup.textClose}>SAIR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleSubGroup.opActionSave} onPress={handleSaveSuvGroup}>
                            <Text style={styleSubGroup.textSave}>SALVAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>

    )
}

const styleSubGroup = StyleSheet.create({
    viewRoot: {
        backgroundColor: '#FFF',
        borderRadius: 6,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        elevation: 15
    },
    textTitle: {
        fontSize: 16,
        marginBottom: 10
    },
    viewAction: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    opActionClose: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 40
    },
    opActionSave: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#6200ee',
        marginVertical: 20,
        borderRadius: 10
    },
    textSave: {
        color: '#FFF'
    },
    textClose: {
        color: '#0B6AC9'
    }
});
