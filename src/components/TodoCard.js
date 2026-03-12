import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const TodoCard = ({ title, completed, onToggle, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      
      {/* Checkbox */}
      <TouchableOpacity
        onPress={() => onToggle()}
        style={{
          width: 24,
          height: 24,
          borderRadius: 4,
          borderWidth: 3,
          borderColor: completed ? '#000' : '#E5E7EB',
          backgroundColor: completed ? '#000' : '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        }}
      >
        {completed && <Icon name="check" size={16} color="#FFFFFF" />}
      </TouchableOpacity>

      {/* Title */}
      <Text
        style={[
          styles.title,
          completed && { textDecorationLine: "line-through", opacity: 0.6 },
        ]}
      >
        {title}
      </Text>

      {/* Action buttons */}
      <View style={styles.actions}>
        
        <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
          <Icon name="edit" size={23} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
          <Icon name="delete" size={23} color="#E74C3C" />
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default React.memo(TodoCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 3,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  actions: {
    flexDirection: "row",
    gap:5
  },

  iconBtn: {
    marginLeft: 12,
  },
});