import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const ConfirmModal = ({
  title,
  message,
  onConfirm,
  onClose,
  visible,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View
          style={{
            ...styles.modalContainer,
            backgroundColor: '#fff',
          }}
        >
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text style={styles.txt20bold}>{title}</Text>
            <View style={styles.divider} />
            <Text style={styles.txt16}>{message}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <TouchableOpacity style={styles.addButton} onPress={onConfirm}>
              <Text style={styles.addText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={onClose}>
              <Text style={styles.addText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    padding: 20,
  },

  txt20bold: {
    fontSize: 20,
    fontWeight: '700',
  },
  txt16: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 24,
  },
  addButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width:'49%'
  },

  addText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default ConfirmModal;
