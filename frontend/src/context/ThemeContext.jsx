import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [adminTheme, setAdminTheme] = useState(
        localStorage.getItem("adminTheme") || "green"
    );

    const [customerTheme, setCustomerTheme] = useState(
        localStorage.getItem("customerTheme") || "green"
    );


    /* Save admin theme */

    useEffect(() => {

        localStorage.setItem(
            "adminTheme",
            adminTheme
        );

    }, [adminTheme]);


    /* Save customer theme */

    useEffect(() => {

        localStorage.setItem(
            "customerTheme",
            customerTheme
        );

    }, [customerTheme]);


    /* Apply theme after refresh */

    useEffect(() => {

        document.documentElement.setAttribute(
            "data-theme",
            adminTheme
        );

    }, [adminTheme]);


    return (
        <ThemeContext.Provider
            value={{
                adminTheme,
                customerTheme,
                setAdminTheme,
                setCustomerTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};


export const useTheme = () =>
    useContext(ThemeContext);