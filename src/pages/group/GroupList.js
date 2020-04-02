import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function GroupList({ navigation }) {
    const [groups, setGroups] = useState([]);

    async function loadingGroups() {
        try {
            const result = global.Database.objects('Group');
            setGroups(Array.from(result));
        } catch (error) {
            global.showSnackbar(error.message)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadingGroups();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.viewRoot}>
            <TouchableOpacity
                style={styles.buttonFloat}
                onPress={() => navigation.push('GroupEdit')}>
                <Ionicons name="ios-add" size={30} color="white" />
            </TouchableOpacity>
            <FlatList
                data={groups}
                keyExtractor={(item) => item.id}
                renderItem={props => <ItemGroup {...props} navigation={navigation} />}
            />
        </View>
    );
}

function ItemGroup({ item, navigation }) {
    const qtSubGrupos = Array.from(global.Database.objects('SubGroup').filtered(`group.id = '${item.id}'`)).length;
    return (
        <TouchableOpacity
            style={styles.viewItemGroup}
            onPress={() => navigation.push('GroupEdit', { ...item })}>
            <View style={styles.viewItemName}>
                <Text style={styles.textLabel}>Nome</Text>
                <Text style={styles.textName}>{item.name}</Text>
            </View>
            <View style={styles.viewItemName}>
                <Text style={styles.textLabel}>Qt. Sub-Grupos</Text>
                <Text style={styles.textName}>{qtSubGrupos}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    viewRoot: {
        backgroundColor: '#FFF',
        height: '100%',
    },
    viewItemGroup: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
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
    buttonFloat: {
        zIndex: 1,
        position: 'absolute',
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        right: 21,
        bottom: 21,
        backgroundColor: '#6200EE',
        borderRadius: 50,
        elevation: 10,
        borderBottomWidth: 0,
    },
});
