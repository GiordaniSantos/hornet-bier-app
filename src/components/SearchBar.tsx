import React, { useState } from "react";
import { StyleSheet, TextInput, View, Keyboard } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = ({onChange, onSubmit, onBlur, value, clearFilter, handleSubmit}) => {
    const [clicked, setClicked] = useState(false);
  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 15 }}
          onPress={handleSubmit(onSubmit)}
        />
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          onFocus={() => {
            setClicked(true);
          }}
          onSubmitEditing={() => {
            handleSubmit(onSubmit)();
            Keyboard.dismiss();
          }}
          returnKeyType="search"
        />
        {clicked && (
          <Entypo name="cross" size={24} color="black" style={{ padding: 1 }} onPress={ () => {
            Keyboard.dismiss();
            setClicked(false);
            onChange("");
            clearFilter()
          }}/>
        )}
      </View>
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  searchBar__unclicked: {
    padding: 1,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 1,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "70%",
  },
});