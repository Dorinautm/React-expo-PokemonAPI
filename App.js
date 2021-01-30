import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import axios from "axios";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [pokemonArr, setPokemonArr] = useState([]);
  let arr = [];
  const axiosApiCall = async () => {
    for (let id = 1; id < 20; id++) {
      await axios({
        method: "GET",
        url: "https://pokeapi.co/api/v2/pokemon/" + id,
      })
        .then((response) => {
          arr.push({
            name: response.data.name,
            height: response.data.height,
            ability: response.data.abilities[0].ability.name,
            weight: response.data.weight,
            sprite: response.data.sprites.front_default,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setPokemonArr(arr);
    setLoading(false);
  };

  useEffect(() => {
    axiosApiCall();
  }, []);

  console.log(pokemonArr);
  return (
    <SafeAreaView>
      <ScrollView style={StyleSheet.create}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="red"
            style={{ paddingTop: 200 }}
          />
        ) : (
          <Text>Pokemons:</Text>
        )}
        {pokemonArr.map((item, index) => (
          <View style={{ padding: 10, backgroundColor: "#5487" }} key={index}>
            <Text style={{ color: "#979700", fontSize: 20 }}>
              Name: {item.name}
            </Text>
            <Text>Height: {item.height}</Text>
            <Text>Ability: {item.ability}</Text>
            <Text>Weight: {item.weight}</Text>
            <Image source={{ uri: item.sprite }}></Image>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
});
