import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";

export const useTheme = () => useContext(themeContext);
