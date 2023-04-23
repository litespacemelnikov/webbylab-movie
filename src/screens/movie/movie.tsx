import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, Image, Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  createMovie,
  deleteMovie,
  getMovieById,
  updateMovie,
} from "../../api/api";
import Button from "../../components/button/button";
import Container from "../../components/container/container";
import GlobalLoader from "../../components/globalLoader/globalLoader";
import Input from "../../components/input/input";
import { StackParamList } from "../../navigation/types";
import {
  selectMovies,
  setActiveMovie,
  setLoader,
  setMovies,
} from "../../store/movies";
import MovieHeader from "./movie.header";
import words from "../../constants/words.json";
import styles from "./movie.styles";
import { COLORS } from "../../constants/colors";
import { movieSchema } from "../../schemas/movieSchema";
import { showAlert } from "../../store/alert";

const Movie = () => {
  const { params } = useRoute<RouteProp<StackParamList, "Movie">>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const dispatch = useDispatch();
  const { activeMovie, movies, loader } = useSelector(selectMovies);
  const [actors, setActors] = useState<Array<string>>([]);

  const isCreateOrEdit = params.isCreate || params.isEdit || false;

  useEffect(() => {
    if (!isCreateOrEdit) getMovie();
  }, []);

  useEffect(() => {
    setActors(activeMovie.actors.map((item) => item.name));
  }, [activeMovie.actors]);

  const getMovie = async () => {
    try {
      dispatch(setLoader(true));
      const resultMovie = await getMovieById(params.movieId);
      dispatch(setActiveMovie(resultMovie.data.data));
    } catch (error) {
    } finally {
      dispatch(setLoader(false));
    }
  };

  const gotoEdit = () =>
    navigation.push("Movie", { movieId: params.movieId, isEdit: true });

  const addNewActor = () => setActors(["", ...actors]);
  const isEmptyActorName =
    actors.findIndex((item) => item.trim() === "") !== -1;

  const onChangeActor = useCallback(
    (value: string, index: number) => {
      setActors([...actors.map((item, i) => (index === i ? value : item))]);
    },
    [actors, activeMovie.actors]
  );

  const removeActor = useCallback(
    (index: number) => {
      setActors([...actors.filter((item, i) => index !== i)]);
    },
    [actors, activeMovie.actors]
  );

  const onSubmit = async () => {
    try {
      dispatch(setLoader(true));

      if (actors.length === 0) {
        return dispatch(showAlert(words.errors.addOneActor));
      }

      if(actors.findIndex(item => item.trim() === "") !== -1) {
        return dispatch(showAlert(words.errors.enterActorName));
      }

      if (params.isCreate) {
        const movieResult = await createMovie({ ...values, actors });
        dispatch(setMovies([movieResult.data.data, ...movies]));
        navigation.navigate("Movies");
      } else {
        const movieResult = await updateMovie(params.movieId, {
          ...values,
          actors,
        });
        dispatch(setActiveMovie(movieResult.data.data));
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const removeMovie = async () => {
    try {
      await deleteMovie(params.movieId);
      dispatch(setMovies(movies.filter((item) => item.id !== params.movieId)));
      navigation.navigate("Movies");
    } catch (error) {
      console.log(error);
    }
  };

  const { handleSubmit, handleChange, handleBlur, errors, values, setValues } =
    useFormik({
      initialValues: {
        title: activeMovie.title || "",
        year: activeMovie.year || "",
        format: activeMovie.format || "",
        actors: [],
      },
      validationSchema: movieSchema,
      onSubmit,
    });

  if (!isCreateOrEdit && loader) return <GlobalLoader />;

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      {!isCreateOrEdit && (
        <MovieHeader onPressEdit={gotoEdit} onPressRemove={removeMovie} />
      )}
      <Container>
        <View style={styles.movie}>
          {!isCreateOrEdit && (
            <View style={styles.fakePoster}>
              <Image
                style={styles.icon}
                source={require("../../../assets/icons/cam.png")}
              />
            </View>
          )}
          <Input
            inputStyles={
              isCreateOrEdit ? [] : [styles.inputReadOnly, styles.title]
            }
            style={{ marginBottom: isCreateOrEdit ? 20 : 0 }}
            placeholder={words.screens.movie.title}
            editable={isCreateOrEdit}
            defaultValue={activeMovie.title}
            error={errors.title}
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
          />
          <Input
            inputStyles={
              isCreateOrEdit ? [] : [styles.inputReadOnly, styles.year]
            }
            style={{ marginBottom: isCreateOrEdit ? 20 : 0 }}
            placeholder={words.screens.movie.year}
            error={errors.year}
            editable={isCreateOrEdit}
            defaultValue={String(activeMovie.year)}
            onChangeText={handleChange("year")}
            onBlur={handleBlur("year")}
          />
          <Input
            inputStyles={
              isCreateOrEdit ? [] : [styles.inputReadOnly, styles.format]
            }
            style={{ marginBottom: isCreateOrEdit ? 20 : 0 }}
            placeholder={words.screens.movie.format}
            error={errors.format}
            editable={isCreateOrEdit}
            defaultValue={activeMovie.format}
            onChangeText={handleChange("format")}
            onBlur={handleBlur("format")}
          />
          <View style={styles.actorsHeader}>
            <Text style={styles.actorsText}>{words.screens.movie.actors}</Text>
            {isCreateOrEdit && (
              <TouchableOpacity
                onPress={isEmptyActorName ? () => {} : addNewActor}
                style={[
                  styles.smallLink,
                  { backgroundColor: COLORS.LIGHT_BLUE },
                ]}
              >
                <Text style={{ color: COLORS.WHITE }}>{words.addActors}</Text>
              </TouchableOpacity>
            )}
          </View>

          {actors.map((item, index) => (
            <View
              key={index}
              style={[
                styles.actorFields,
                isCreateOrEdit && { marginBottom: 20 },
              ]}
            >
              <Input
                inputStyles={
                  isCreateOrEdit ? [] : [styles.inputReadOnly, styles.actor]
                }
                style={{ width: "90%" }}
                onBlur={handleBlur("actors")}
                error={errors.actors}
                placeholder={words.screens.movie.actor}
                onChangeText={(value) => onChangeActor(value, index)}
                editable={isCreateOrEdit}
                value={item}
                defaultValue={item}
              />
              {isCreateOrEdit && (
                <View style={{ width: "10%" }}>
                  <Button
                    style={{
                      width: 30,
                      height: 30,
                      marginLeft: 10,
                      backgroundColor: COLORS.RED,
                    }}
                    onPress={() => removeActor(index)}
                    label="X"
                  />
                </View>
              )}
            </View>
          ))}
          {isCreateOrEdit && (
            <Button
              loader={loader}
              onPress={handleSubmit}
              label={params.isCreate ? words.create : words.edit}
            />
          )}
        </View>
      </Container>
    </ScrollView>
  );
};

export default Movie;
