import { useEffect } from "react";
import { FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../api/api";
import GlobalLoader from "../../components/globalLoader/globalLoader";
import MovieItem, {
  IMovieItemProps,
} from "../../components/movieItem/movieItem";
import { selectMovies, setMovies } from "../../store/movies";
import MoviesEmpty from "./movies.empty";
import MoviesHeader from "./movies.header";
import styles from "./movies.styles";

const Movies = () => {
  const dispatch = useDispatch();
  const { loader, movies, search } = useSelector(selectMovies);

  useEffect(() => {
    fetchMovies();
  }, [search]);

  const fetchMovies = async () => {
    try {
      const moviesResult = await getMovies({ search });
      dispatch(setMovies(moviesResult.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  if (movies.length === 0 && loader) return <GlobalLoader />;

  return (
    <FlatList
      contentContainerStyle={styles.moviesList}
      numColumns={2}
      ListHeaderComponent={<MoviesHeader />}
      ListEmptyComponent={<MoviesEmpty />}
      refreshing={movies.length !== 0 && loader}
      onRefresh={fetchMovies}
      renderItem={({ item }: { item: IMovieItemProps }) => (
        <MovieItem
          id={item.id}
          title={item.title}
          format={item.format}
          year={item.year}
        />
      )}
      keyExtractor={(item) => item.id}
      data={movies}
    />
  );
};

export default Movies;
