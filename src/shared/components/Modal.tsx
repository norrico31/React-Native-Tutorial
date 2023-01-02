/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { } from "react";
import { Alert, Modal as RNModal, StyleSheet, Text, Pressable, View } from "react-native";
import { SelectedUser } from "../../../App";

const Modal = ({ isModal, closeModal, selectedUser, deleteUser }: { isModal: boolean; closeModal: () => void; selectedUser: SelectedUser; deleteUser: (id: string) => void }) => {
    console.log(selectedUser, 'aha');
    return (
        <View style={styles.centeredView}>
            <RNModal
                animationType="slide"
                transparent={true}
                visible={isModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    closeModal();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>wanna delete user {selectedUser?.name}!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => closeModal()}
                        >
                            <Text style={styles.textStyle}>Close Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </RNModal>

        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});

export default Modal;