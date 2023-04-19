import { memo } from "react";
import { View, Text } from "react-native";
import words from '../../constants/words.json';
import styles from './movies.styles';

const MoviesEmpty = () => (
    <View style={styles.empty}>
        <Text style={styles.emptyText}>
            {words.noData}
        </Text>
    </View>
);

export default memo(MoviesEmpty);