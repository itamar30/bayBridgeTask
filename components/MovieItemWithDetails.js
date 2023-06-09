import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import colorsGuide from "../config/colorsGuide";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavorite,
  clearFavorites,
  removeFavorite,
} from "../store/favoritesSlice";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const MovieItemWithDetails = ({ id, name, poster, desc, raiting }) => {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const starArr = [];
  const raitingFloor = Math.floor(raiting);
  const ids = useSelector((state) => state.favorites.ids);
  const isMovieFavorite = ids.indexOf(id) !== -1;

  for (let i = 0; i < raitingFloor; i++) {
    starArr.push(0);
  }
  const renderFullStars = starArr.map((item) => (
    <Ionicons
      key={Math.random()}
      name="star"
      size={30}
      color={colorsGuide.yellow}
    />
  ));

  useEffect(() => {}, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.desc}>{desc}</Text>
            <View style={styles.startsContainer}>
              {renderFullStars}
              {raiting - raitingFloor > 0 && (
                <View style={{ zIndex: 2 }}>
                  <Ionicons
                    name="star-half"
                    size={30}
                    color={colorsGuide.yellow}
                  />
                </View>
              )}
            </View>
          </View>
          <Image
            style={styles.img}
            source={{
              uri: poster,
            }}
          />
          {!isMovieFavorite ? (
            <TouchableOpacity
              style={styles.favContainer}
              onPress={() => {
                {
                  ids?.length === 0 &&
                    Alert.alert("Press Cart Icon To See Favorites Movies");
                }
                dispatch(addFavorite(id));
              }}
            >
              <Entypo name="plus" size={45} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.favContainer}
              onPress={() => dispatch(removeFavorite(id))}
            >
              <Entypo name="minus" size={45} color="white" />
            </TouchableOpacity>
          )}
          <View style={styles.badgeContainer}>
            <View style={styles.numOfFavoriteCircle}>
              <Text style={styles.favoritesNumber}>
                {`${ids?.length || 0}`}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.shoppingCartBadgeContainer}
              onPress={() => navigate.navigate("Favorites")}
            >
              <FontAwesome5 name="shopping-cart" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieItemWithDetails;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    minHeight: "100%",
    backgroundColor: colorsGuide.black,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    borderColor: colorsGuide.black,
    borderWidth: 1,
    position: "relative",
    height: "90%",
    width: "80%",
    borderRadius: 30,
    overflow: "hidden",
  },
  img: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  startsContainer: {
    flexDirection: "row",
    zIndex: 2,
  },
  raitingText: {
    fontSize: 30,
    zIndex: 2,
  },
  name: {
    zIndex: 2,
    fontSize: 30,
    fontWeight: "bold",
    color: colorsGuide.white,
    textAlign: "center",
    marginBottom: 10,
  },
  desc: {
    zIndex: 2,
    textAlign: "center",
    fontSize: 15,
    color: colorsGuide.white,
    marginBottom: 10,
  },
  infoContainer: {
    alignItems: "center",
    position: "absolute",
    justifyContent: "space-evenly",
    bottom: 0,
    zIndex: 2,
    width: "100%",
    backgroundColor: colorsGuide.blackWithOpacity,
    overflow: "hidden",
    padding: 20,
  },
  favContainer: {
    height: 60,
    width: 60,
    position: "absolute",
    top: 25,
    right: 15,
    backgroundColor: colorsGuide.blackWithOpacity,
    zIndex: 2,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  shoppingCartBadgeContainer: {
    height: 60,
    width: 60,
    position: "absolute",
    top: 25,
    left: 15,
    backgroundColor: colorsGuide.blackWithOpacity,
    zIndex: 2,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeContainer: {
    zIndex: 3,
    height: 100,
    width: 100,
    position: "relative",
  },
  numOfFavoriteCircle: {
    height: 40,
    width: 40,
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: colorsGuide.blackWithOpacity,
    zIndex: 3,
    borderRadius: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  favoritesNumber: {
    fontSize: 25,
    color: colorsGuide.white,
    fontWeight: "bold",
  },
});
