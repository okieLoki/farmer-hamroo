const logout = async () => {
    await SecureStore.deleteItemAsync('authenticated');
    setAuthenticated(false);

    navigation.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
    });
};


export { logout }