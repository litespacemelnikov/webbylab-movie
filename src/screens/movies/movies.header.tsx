import { memo } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { COLORS } from "../../constants/colors";
import words from "../../constants/words.json";
import styles from "./movies.styles";
import { getMovies, importMovies } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { selectMovies, setLoader, setMovies } from "../../store/movies";

const MoviesHeader = () => {
  const dispatch = useDispatch();
  const { search } = useSelector(selectMovies);

  const onPressImport = async () => {
    try {
      const getFile = await DocumentPicker.getDocumentAsync({
        type: "text/plain",
      });

      if (getFile.type === "success") {
        dispatch(setLoader(true));

        const data = new FormData();

        data.append("movies", {
          type: getFile.mimeType,
          name: getFile.name,
          uri:
            Platform.OS === "ios"
              ? getFile.uri.replace("file://", "")
              : getFile.uri,
        } as any);

        await importMovies(data);
        const updateMovies = await getMovies({ search });

        dispatch(setMovies(updateMovies.data.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <View style={styles.moviesHeader}>
      <TouchableOpacity
        style={[styles.smallLink, { backgroundColor: COLORS.LIGHT_BLUE }]}
      >
        <Text style={{ color: COLORS.WHITE }}>+ Create movie</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressImport}
        style={[styles.smallLink, { backgroundColor: COLORS.SILVER }]}
      >
        <Text style={{ opacity: 0.5 }}>Import</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(MoviesHeader);
