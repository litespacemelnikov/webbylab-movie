import { memo, ReactNode } from "react";
import { View } from "react-native";
import styles from "./container.styles";

interface IContainerProps {
  children: ReactNode;
}

const Container = ({ children }: IContainerProps) => (
  <View style={styles.container}>{children}</View>
);

export default memo(Container);
