import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

export default function KeyboardMoney({ props }) {
    if (!props) {
        return null;
    }

    const { label, startValue, ok, close } = props;

    const [value, setValue] = useState(startValue ?? "0,00");

    function handlePressKey(key) {
        let val = parseInt(removeMask(value));
        setValue(addMask(`${val}${key}`));
    }

    function removeMask(val) {
        val = val.replace(/,/g, "");
        val = val.replace(/\./g, "");
        return val;
    }

    function addMask(val) {
        let valStr = val.toString();
        let valFloat = parseFloat(
            `${valStr.substr(0, valStr.length - 2)}.${valStr.substr(
                valStr.length - 2,
                valStr.length
            )}`
        );
        valFloat = valFloat.toFixed(2).split(".");
        valFloat[0] = valFloat[0].split(/(?=(?:...)*$)/).join(".");
        return valFloat.join(",");
    }

    function handlePressDel() {
        let val = removeMask(value);
        val = val.substr(0, val.length - 1);
        setValue(addMask(val));
    }

    function handlePressOk() {
        ok(value);
        close();
    }

    return (
        <View>
            <Modal
                isVisible
                style={styles.modalRoot}
                onBackButtonPress={close}
                onBackdropPress={close}
            >
                <View style={styles.viewRoot}>
                    <View style={styles.viewHeader}>
                        <View style={styles.viewLabelInput}>
                            <Text style={styles.labelInput}>{label}</Text>
                        </View>
                        <View style={styles.viewValueMoney}>
                            <Text style={styles.textValueMoney}>
                                R$ {value}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.viewKeyboard}>
                        <View style={styles.viewLineKeyboard}>
                            <ButtonKey
                                label="7"
                                onPress={() => handlePressKey(7)}
                            />
                            <ButtonKey
                                label="8"
                                onPress={() => handlePressKey(8)}
                            />
                            <ButtonKey
                                label="9"
                                onPress={() => handlePressKey(9)}
                            />
                        </View>
                        <View style={styles.viewLineKeyboard}>
                            <ButtonKey
                                label="4"
                                onPress={() => handlePressKey(4)}
                            />
                            <ButtonKey
                                label="5"
                                onPress={() => handlePressKey(5)}
                            />
                            <ButtonKey
                                label="6"
                                onPress={() => handlePressKey(6)}
                            />
                        </View>
                        <View style={styles.viewLineKeyboard}>
                            <ButtonKey
                                label="1"
                                onPress={() => handlePressKey(1)}
                            />
                            <ButtonKey
                                label="2"
                                onPress={() => handlePressKey(2)}
                            />
                            <ButtonKey
                                label="3"
                                onPress={() => handlePressKey(3)}
                            />
                        </View>
                        <View style={styles.viewLineKeyboard}>
                            <ButtonOption
                                label="DEL"
                                onPress={handlePressDel}
                            />
                            <ButtonKey
                                label="0"
                                onPress={() => handlePressKey(0)}
                            />
                            <ButtonOption label="Ok" onPress={handlePressOk} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

function ButtonKey({ label, onPress }) {
    return (
        <View style={styles.viewKey}>
            <TouchableOpacity style={styles.opKey} onPress={onPress}>
                <Text style={styles.textKey}>{label}</Text>
            </TouchableOpacity>
        </View>
    );
}

function ButtonOption({ label, onPress }) {
    return (
        <View style={styles.viewKey}>
            <TouchableOpacity style={styles.opKey} onPress={onPress}>
                <Text style={styles.textOption}>{label}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    modalRoot: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    viewRoot: {
        backgroundColor: "#DDD",
        height: 460,
        width: 300,
        borderRadius: 8,
        elevation: 8
    },
    viewHeader: {
        backgroundColor: "#FFF",
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        height: 60,
        flexDirection: "row",
        elevation: 5
    },
    viewLabelInput: {
        flex: 1,
        paddingLeft: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    viewValueMoney: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    labelInput: {
        fontSize: 14
    },
    textValueMoney: {
        fontSize: 20
    },
    viewKeyboard: {
        height: "100%"
    },
    viewLineKeyboard: {
        width: "100%",
        flexDirection: "row"
    },
    viewKey: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    opKey: {
        height: 90,
        width: 90,
        backgroundColor: "#FFF",
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        elevation: 3
    },
    textKey: {
        fontSize: 35
    },
    textOption: {
        fontSize: 22,
        color: "#6200ee"
    }
});
